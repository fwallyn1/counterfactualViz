#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jul 21 10:39:54 2022

@author: nwgl2572
"""

from import_essentials import *
from utils import *
from utils import fix_seed
from load_data import Load_dataset_base,load_data_dict
from vcnet_tabular_data_v0.load_config import Load_config,load_config_dict
from vcnet_tabular_data_v0.join_training_network import CVAE_join
from vcnet_tabular_data_v0.train_network import Train_CVAE 
import torch 

from sklearn.metrics import pairwise_distances 
import pathlib 
import seaborn as sns 
from metrics import *
from plot_distributions import numpy_to_dataframe,plot_distributions
from IPython.display import Image
main_path =  str(pathlib.Path().resolve()) + '/'
main_path = main_path +  "/vcnet_tabular_data_v0/"

Names = ['adult', 'student', 'home', 'student_performance', 'titanic', 'breast_cancer']
Seed = [42,12,34,56,3,67,98,4,23]

# Train a vcnetv0 model based on config files 
def train_vcnet_0(name,cuda_name) : 
    
    # Load the model parameters in a dict 
    model_config_dict = load_config_dict(name)
    model_config = Load_config(model_config_dict)
    
    # Load the dataset parameters in a dict 
    dataset_config_dict = load_data_dict(name)
    # Create a load dataset object 
    dataset = Load_dataset_base(dataset_config_dict,model_config_dict,subsample=False)
    
    # Prepare dataset and return dataloaders + ohe index 
    loaders,cat_arrays,cont_shape = dataset.prepare_data()
    
    fix_seed()

    
    ### Prepare training 
    training = Train_CVAE(dataset_config_dict,model_config_dict,cat_arrays,cont_shape,loaders,dataset,ablation='remove_enc',condition="change_dec_only",cuda_name=cuda_name,shared_layers=False)
    
    training.train_and_valid_cvae(tensorboard=True)
    
    return("Training for {} dataset successfuly".format(name))


#train_vcnet_0(sys.argv[1],sys.argv[2])

# Train vcnetv0 on all dataset and compute metrics (to run ablation study for BCE + sigmoid)
def train_vcnet_0_all(save_name,cuda_name) : 
    df = pd.DataFrame(index = ["adult","student","heloc","student_performance","titanic","breast_cancer"],columns=["Accuracy","Validity","Proximity","Prediction_gain","Proximity_score","Sparsity","Diversity"])
    for seed in Seed : 
        for name in Names : 
            # Load the model parameters in a dict 
            model_config_dict = load_config_dict(name)
            model_config = Load_config(model_config_dict)
            
            # Load the dataset parameters in a dict 
            dataset_config_dict = load_data_dict(name)
            # Create a load dataset object 
            dataset = Load_dataset_base(dataset_config_dict,model_config_dict,subsample=False)
            
            # Prepare dataset and return dataloaders + ohe index 
            loaders,cat_arrays,cont_shape = dataset.prepare_data()
            
            fix_seed()
    
            
            ### Prepare training 
            training = Train_CVAE(dataset_config_dict,model_config_dict,cat_arrays,cont_shape,loaders,dataset,ablation='remove_enc',condition="change_dec_only",cuda_name=cuda_name,shared_layers=False)
            
            training.train_and_valid_cvae(tensorboard=False)
            
            #training.load_weights(dataset.name,seed=seed)
            
            # Compute results and save as a dataframe 
            training.test(df,save_dataframe=True)
        
    
            # Compute laugel proximity metric and diversity
            X,y = dataset.test_dataset[:]
            results = training.compute_counterfactuals(X.to(training.cuda_device), y.to(training.cuda_device),laugel_metric=True)
            Proximity_laugel = compute_others_metrics(results,name,from_numpy=False)
           
            mean_prox_laugel, std_prox_laugel = np.mean(Proximity_laugel),np.std(Proximity_laugel)
         
            df["Proximity_score"].loc[dataset.name] = str(round(mean_prox_laugel,3)) + "+/-" + str(round(std_prox_laugel,3))
             
            # Diversity
            diversity_mean = torch.from_numpy(np.array([pdist(results["cf"].cpu()).mean()]))
            diversity_std = torch.from_numpy(np.array([pdist(results["cf"].cpu()).std()]))
            df["Diversity"].loc[dataset.name] = str(round(float(diversity_mean),3)) + "+/-"  + str(round(float(diversity_std),3))

        df.to_csv(main_path + "save_metrics/"  + save_name + "_seed=" + str(seed) )









