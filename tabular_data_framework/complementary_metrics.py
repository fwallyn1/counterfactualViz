#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import numpy as np 
from sklearn.datasets import load_breast_cancer
import multiprocessing
from sklearn.neighbors import NearestNeighbors
from scipy.spatial.distance import pdist



'''# Proximity score by Laugel
def Compute_prox(x_train, x_counter,y_c,y_x,name):
    
    x_train_unique, index = np.unique(x_train,axis=0,return_index=True)
    y_x_unique  = y_x[index]
    
    # y_x -> Predicted class for train set examples 
    # y_c -> Predicted class for counterfactuals 
    
    neigh_0 = NearestNeighbors(n_neighbors=1)
    neigh_0.fit(x_train_unique[y_x_unique==0])
    
    neigh_1 = NearestNeighbors(n_neighbors=1)
    neigh_1.fit(x_train_unique[y_x_unique==1])
    
    # Average distance between two points for predicted class 1 
    dist_1 = np.mean(pdist(x_train_unique[y_x_unique==1]))
    # Average distance between two points for predicted class 0
    dist_0 = np.mean(pdist(x_train_unique[y_x_unique==0]))
    
    n = x_counter.shape[0]
    S = []
    for i in range(n) :
        counterfactual = x_counter[i].reshape(1,-1)
        counterfactuals_predicted_class = y_c[i] 
        if counterfactuals_predicted_class == 0 : 
            neigh = neigh_0
            dist = dist_0
        else : 
            neigh = neigh_1
            dist = dist_1
        # Distance between couterfactual and closest example of the same classe + index of the closest example 
        dist_c,index_a0 = neigh.kneighbors(counterfactual,return_distance=True)
        S.append(dist_c[0][0]/dist) 
    #np.savetxt("metrics/Proximity_laugel_{}".format(name),np.hstack(S))
    return(np.hstack(S))  '''

# Proximity score by Laugel
def Compute_prox(x_train, x_counter,y_c,y_x,name):
    
    x_train_unique, index = np.unique(x_train,axis=0,return_index=True)
    y_x_unique  = y_x[index]
    
    # y_x -> Predicted class for train set examples 
    # y_c -> Predicted class for counterfactuals 
    
    neigh_0 = NearestNeighbors(n_neighbors=1)
    neigh_0.fit(x_train_unique[y_x_unique==0])
    
    neigh_1 = NearestNeighbors(n_neighbors=1)
    neigh_1.fit(x_train_unique[y_x_unique==1])
    
    # Average distance between two points for predicted class 1 
    dist_1 = np.mean(pdist(x_train_unique[y_x_unique==1]))
    # Average distance between two points for predicted class 0
    dist_0 = np.mean(pdist(x_train_unique[y_x_unique==0]))
    
    S = []
    
    index_0 = np.where(y_c==0)
    index_1 = np.where(y_c==1)
    
    dist_c_0,index_a0_0 = neigh_0.kneighbors(x_counter[index_0],return_distance=True)

    S = S = S + list((dist_c_0 / dist_0).flatten())
    
    dist_c_1,index_a0_1 = neigh_1.kneighbors(x_counter[index_1],return_distance=True)
    S = S = S + list((dist_c_1 / dist_1).flatten())

    
    return(np.hstack(S))