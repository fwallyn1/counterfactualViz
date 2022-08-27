#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr 21 09:53:40 2022

@author: nwgl2572
"""
import pandas as pd 
import matplotlib.pyplot as plt 
import seaborn as sns 
# Dico that contains params for plot for each dataset 
dico = {"adult" : [4,2,False],"student" : [4,8,True],"home" : [4,6,True],"student_performance" : [4,4,False],"telco" : [4,5,True],"churn" : [4,5,True], "credit" : [4,5,True]}  

# Convert a set of counterfactuals or examples back to the original space + dataframe format with same order of categorical variable
def numpy_to_dataframe(X,counterfactuals,dataset) :
    # Back to the original space 
    original_examples = dataset.inverse_transform(X,return_tensor=False)
    original_counterfactuals = dataset.inverse_transform(counterfactuals,return_tensor=False)
    # Transform do dataframe
    df_example = pd.DataFrame(data=original_examples,columns=dataset.continous_cols + dataset.discret_cols)
    df_counterfactuals = pd.DataFrame(data=original_counterfactuals,columns=dataset.continous_cols + dataset.discret_cols)
    # Select same order for categorical variable (for counterfactuals and examples)
    for col in dataset.discret_cols : 
        df_example[col] = pd.Categorical(df_example[col],pd.unique(df_example[col]))
        df_counterfactuals[col] = pd.Categorical(df_counterfactuals[col],pd.unique(df_counterfactuals[col]))
    return(df_example,df_counterfactuals)
    
        
    
# Plot distribution of features for counterfactuals and examples 
def plot_distributions(name,dataframe,counterfactual=True,hue=False,condition="Target") : 
    fig, axs = plt.subplots(dico[name][0], dico[name][1], figsize=(40, 30),constrained_layout=True)
    odd = dico[name][2]
    # If odd number of features disabled last subplot 
    if odd : 
        axs[-1, -1].axis('off')
    features = list(dataframe)
    if counterfactual : 
        plt.suptitle("Distribution of counterfactuals for {} dataset" .format(name))
    else :
        plt.suptitle("Distribution of examples for {} dataset" .format(name))
    c=0
    for i in range(axs.shape[0]) :
        for j in range(axs.shape[1]) : 
            if (i == axs.shape[0]-1 and j == axs.shape[1]-1) and odd : 
                pass
            else : 
                if hue : 
                    sns.histplot(data=dataframe,y=features[c],ax=axs[i,j],hue=condition)
                else : 
                    sns.histplot(data=dataframe,y=features[c],ax=axs[i,j])
            c+=1
