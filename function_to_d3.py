def result_to_d3(result:Dict):
    data = {}
    data["col"] = result["X"].columns.tolist()
    data["X"] = result["X"].values.transpose().tolist()
    data["cf"] = result["cf"].values.transpose().tolist()
    data["y_x"] = result["y_x"].cpu().tolist()
    data["y_c"] = result["y_c"].cpu().tolist()
    data["proba_x"] = result["proba_x"].cpu().tolist()
    data["proba_c"] = result["proba_c"].cpu().tolist()
    return data


def proba_results_to_d3():
    data_prob = {}
    for p in [x * 0.1 for x in range(0, 11)]:
        proba = torch.tensor([[p for i in range(X.shape[0])]]).T
        # Compute counterfactuals 
        results = training.compute_counterfactuals_custom_proba(X.to(training.cuda_device), y.to(training.cuda_device),proba=proba,laugel_metric=False)
        predicted_example_class = results["y_x"].cpu().numpy()
        predicted_counterfactual_class = results["y_c"].cpu().numpy()

        # Round counterfactuals 
        eps = 0.1
        results = training.round_counterfactuals(results,eps,X)

        # Round numerical values and check if counterfactuals are still valid 
        from utils import check_min_max_scaler,int_round_dataset,round_counterfactuals
        # dico of columns we want as rounded variables (here rounded is done to obtain int)
        dico_round = {"tenure" : None, "MonthlyCharges" : 2, "TotalCharges" : 2 }
        results_rounded = round_counterfactuals(X,results,dataset,training,dico_round)
        data_prob[f"{round(p,1)}"] = result_to_d3(results_rounded)
    return data_prob

import json
with open('data_churn_probs.json', 'w') as fp:
    data = proba_results_to_d3()
    json.dump(data, fp)
    

