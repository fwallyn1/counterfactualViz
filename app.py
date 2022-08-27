from flask import Flask, render_template,request
import pandas as pd
import numpy as np
import json
import ast
from tabular_data_framework.utils import fix_seed
from tabular_data_framework.vcnet_tabular_data_v0.train_network import Train_CVAE 
from tabular_data_framework.load_data import Load_dataset_base,load_data_dict
from tabular_data_framework.vcnet_tabular_data_v0.load_config import Load_config,load_config_dict
from tabular_data_framework.import_essentials import *
from tabular_data_framework.utils import *

app = Flask(__name__)

DATASET_PATH = 'data_churn_probs.json'
DESCRIPTION_PATH = "description.json"

def result_to_d3(result:Dict):
    data = {}
    data["col"] = result["X_original_space"].columns.tolist()
    data["X"] = result["X_original_space"].values.transpose().tolist()
    data["cf"] = result["cf_original_space"].values.transpose().tolist()
    data["y_x"] = result["y_x"].cpu().tolist()
    data["y_c"] = result["y_c"].cpu().tolist()
    data["proba_x"] = result["proba_x"].cpu().tolist()
    data["proba_c"] = result["proba_c"].cpu().tolist()
    return data

def prepare_new_data(dataset:Load_dataset_base,newdata:pd.DataFrame):
    
        def split_x_and_y(data):
            X = data[data.columns[:-1]]
            y = data[data.columns[-1]]
            return X, y
        X, y = split_x_and_y(newdata)
        # preprocessing 
        normalizer = dataset.normalizer
        encoder = dataset.encoder
        X_cont = normalizer.transform(X[dataset.continous_cols]) if dataset.continous_cols else np.array([[] for _ in range(len(X))])
        
        X_cat = encoder.transform(X[dataset.discret_cols]) if dataset.discret_cols else np.array([[] for _ in range(len(X))])
        X = np.concatenate((X_cont, X_cat), axis=1)        
        # Number of continious variables 
        newdata_np = NumpyDataset(X, y.to_numpy())                
        return newdata_np

def compute_counterfactuals(X):
    fix_seed()
    name = "churn"
    # Load the model parameters in a dict 
    model_config_dict = load_config_dict(name)
    model_config = Load_config(model_config_dict)

    # Load the dataset parameters in a dict 
    dataset_config_dict = load_data_dict(name)
    # Create a load dataset object 
    dataset = Load_dataset_base(dataset_config_dict,model_config_dict,subsample=False)

    # Prepare dataset and return dataloaders + ohe index 
    loaders,cat_arrays,cont_shape = dataset.prepare_data()
    debug_enc = False 
    training = Train_CVAE(dataset_config_dict,model_config_dict,cat_arrays,cont_shape,loaders,dataset,ablation=None,condition="change_dec_only",cuda_name="cpu",shared_layers=True,debug_enc=debug_enc)
    #training.train_and_valid_cvae(tensorboard=True)
    training.load_weights(dataset.name)
    X_np,y_np = prepare_new_data(dataset,X)[:]
    data_prob = {}
    for p in [x * 0.1 for x in range(0, 11)]:
        proba = torch.tensor([[p for i in range(X_np.shape[0])]]).T
        # Compute counterfactuals 
        results = training.compute_counterfactuals_custom_proba(X_np.to(training.cuda_device), y_np.to(training.cuda_device),proba=proba,laugel_metric=False)
        eps = 0.01
        results = training.round_counterfactuals(results,eps,X_np)[0]
        # Round numerical values and check if counterfactuals are still valid 
        from tabular_data_framework.utils import check_min_max_scaler,int_round_dataset,round_counterfactuals
        # dico of columns we want as rounded variables (here rounded is done to obtain int)
        dico_round = {"tenure" : None, "MonthlyCharges" : 2, "TotalCharges" : 2 }
        results_rounded = round_counterfactuals(X_np,results,dataset,training,dico_round)
        data_prob[f"{round(p,1)}"] = result_to_d3(results_rounded)
        data_prob[f"{round(p,1)}"]["y_true_x"] = data_prob[f"{round(p,1)}"]["y_x"]
    return data_prob      

@app.route('/')
def index():
    """
    first page to choose individual and threshold to visualize
    """
    return render_template('index.html')

@app.route('/expert')
def expert():
    """
    first page to choose individual and threshold to visualize
    """
    id_indiv = request.args.get("id_indiv")
    data = request.args.get("data")
    if data :
        data_dict = ast.literal_eval(data)
        data = json.dumps(data_dict)
    return render_template('expert.html',id_indiv = id_indiv,data = data)

@app.route('/counterfactual')
def counterfactual():
    """
    ENDPOINT du contrefactuel pour un individu et un threshold
    """
    with open(DESCRIPTION_PATH, 'r') as f:
        fileData = json.load(f)
    description = json.dumps(fileData)
    id_indiv = request.args.get("id_indiv") 
    threshold = request.args.get("threshold")
    return render_template('counterfactual.html',id_indiv = id_indiv,threshold = str(threshold),description = description)

@app.route('/get_data')
def get_data():
    with open(DATASET_PATH, 'r') as f:
        fileData = json.load(f)
    return fileData

@app.route('/custom_counterfactual', methods=['POST', 'GET'])
def custom_counterfactual():
    with open(DESCRIPTION_PATH, 'r') as f:
        fileData = json.load(f)
    description = json.dumps(fileData)
    threshold = request.args.get("threshold")
    data = request.args.get("data")
    if data :
            data_dict = ast.literal_eval(data)
            print("DATA_DICT",data_dict)
            data = json.dumps(data_dict)
    if request.method == "POST":
        example = request.form.to_dict()
        example = {k: [v] for k, v in example.items()}
        print(example)
        X = pd.DataFrame.from_dict(example)
        X['Churn'] = 1
        X = X.astype({'SeniorCitizen': 'int64','tenure':'int64','MonthlyCharges':"float64",'TotalCharges':'float64'})
        counterfactuals = compute_counterfactuals(X)
        print("CF",counterfactuals)
        return render_template('custom.html',counterfactuals = json.dumps(counterfactuals),description = description,threshold = str(threshold),data=data)
    if request.method == "GET":
        return render_template('custom.html',description = description,data=data,threshold = str(threshold))



if __name__ == '__main__':
    app.run(host="localhost",debug=True,port=8000)


