import numpy as np 
import matplotlib.pyplot as plt 
import seaborn as sns 
import pandas as pd 



'''df = pd.read_csv("save_metrics/plot/metrics_ablation_shared_layers.csv") 

fig, axs = plt.subplots(4, 2, figsize=(40, 30),constrained_layout=True)
Metrics = ["Accuracy","Validity","Proximity","Prediction_gain","Proximity_score","Sparsity","Diversity"]
c = 0
axs[-1, -1].axis('off')
for i in range(axs.shape[0]) :
        for j in range(axs.shape[1]) :
            if (i == axs.shape[0]-1 and j == axs.shape[1]-1) : 
                pass
            else : 
                ax = sns.barplot(x="Ablation", y=Metrics[c], hue="Dataset", data=df,ax=axs[i,j])
                ax.set_xticklabels(ax.get_xticklabels(), rotation=40, ha="right")
                ax.legend(bbox_to_anchor=(1.05, 1), loc=2, borderaxespad=0.)
            c+=1 

'''

import seaborn as sns
dataset_name  = "adult"
df = pd.read_csv("save_metrics/results_rounding_threshold/" + "results_rounding_for{}_dataset.csv".format(dataset_name))
sns.pairplot(data=df,y_vars=["Validity","Proximity","Proximity_score","Sparsity","Diversity"],x_vars="Eps")