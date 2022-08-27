#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Aug  4 13:52:01 2022

@author: nwgl2572
"""
# -*- coding: utf-8 -*-

import torch.nn as nn
import torch 
from vcnet_tabular_data_v0.join_training_network import CVAE_join,Predictor
from carla import Data, MLModel
import pandas as pd 
import numpy as np 
from typing import Union
from carla import RecourseMethod
# Transform sigmoid output vector into a softmax format probability vector 
class sigmoid_to_ohe(nn.Module) : 
    def __init__(self):
        super().__init__()
    
    def forward(self,input) : 
        return(torch.hstack([1-input,input]))


# Load classif_model_part of VCnet as a pytorch model
def load_classif_model(training) : 
    # Predictor part of Vcnet as pytorch model 
    prediction_model = Predictor(**training.model.kwargs)
    # Load weights from Vcnet architecture 
    state_dict = prediction_model.state_dict().copy()
    with torch.no_grad():
        for layer in training.model.state_dict():
            if layer in state_dict : 
                state_dict[layer] = training.model.state_dict()[layer]

    prediction_model.load_state_dict(state_dict)
    
    # Change sigmoid output to softmax output 
    layers = [] 
    layers.append(prediction_model)
    layers.append(sigmoid_to_ohe())

    classif_model = nn.Sequential(*layers)
    return(classif_model)

# Vcnet predictor object for carla framework 
class Vcnet_predictor(MLModel):
    def __init__(self, data,classif_model,dataset): 
        super().__init__(data)
        # the constructor can be used to load or build an arbitrary black-box-model
        self._mymodel = classif_model
        # Dataset from VCnet load data 
        self.dataset = dataset 
        # Classif model part of Vcnet network 
        self.classif_model = classif_model
        # this property contains a fitted scaler to normalize input data
        # MinMaxScaler from sklearn is predefined, but can be redefined by every other sklearn scaler
        self.scaler = self.dataset.normalizer

        # the same is possible for data encoding
        # OneHotEncoder from sklearn with dropped first column for binary data is predefined, but can be
        # changed into any other sklearn encoder.
        self.encoder = self.dataset.encoder
        
    @property
    def feature_input_order(self):
        # this property contains a list of the correct input order of features for the ml model
        #test = self.dataset.test.drop(columns=[self.dataset.target])
        test = self.data.df_test.drop(columns=[self.dataset.target])
        self._feature_input_order = list(test)
        return self._feature_input_order
    
    
    @property
    def backend(self):
        # this property contains a string with the used backend of the model
        return "pytorch"

    @property
    def raw_model(self):
        # this property contains the fitted/ loaded black-box-model
        return self._mymodel

    """ def predict(self, x: Union[np.ndarray, pd.DataFrame]):
        x = self.data.one_hot_no_drop_transform(x)
        # the predict function outputs the continuous prediction of the model, similar to sklearn.
        return torch.argmax(self.classif_model.forward(torch.from_numpy(x.to_numpy()).float()),axis=1).detach().numpy() """
    def predict(self, x: Union[np.ndarray, pd.DataFrame]):
        # the predict function outputs the continuous prediction of the model, similar to sklearn.
        return torch.argmax(self.classif_model.forward(torch.from_numpy(x.to_numpy()).float()),axis=1).detach().numpy()
    
    '''def predict_proba(self, x: Union[np.ndarray, pd.DataFrame],return_tensor=False):
        """ print("x REVISE \n",x)
        print("===============================") """
        if type(x)==torch.Tensor:
            x = x.detach().numpy()
        if type(x) == np.ndarray : 
            x = pd.DataFrame(x,columns=self.feature_input_order)
        """ if x.shape[1] != self.data.df.shape[1] - 1 :
            x = self.data.transform(x)
            x = x.astype("float")  """
        x = self.data.one_hot_no_drop_transform(x)
        x = torch.from_numpy(x.to_numpy()).float()
        # the predict_proba method outputs the prediction as class probabilities, similar to sklearn
        #pred_proba = prediction_model.forward(torch.from_numpy(x).float()).detach().numpy()
        if return_tensor : 
            return self.classif_model.forward(x)
        else : 
            return self.classif_model.forward(x).detach().numpy()'''

    def predict_proba(self, x: Union[np.ndarray, pd.DataFrame],return_tensor=False):
        if type(x) == pd.core.frame.DataFrame: 
            x = torch.from_numpy(x.to_numpy()).float()
        elif type(x) == np.ndarray : 
            x = torch.from_numpy(x).float()
        # the predict_proba method outputs the prediction as class probabilities, similar to sklearn
        #pred_proba = prediction_model.forward(torch.from_numpy(x).float()).detach().numpy()
        if return_tensor : 
            return self.classif_model.forward(x)
        else : 
            return self.classif_model.forward(x).detach().numpy()



# Custom recourse implementations need to
# inherit from the RecourseMethod interface
class MyRecourseMethod (RecourseMethod) :
    def __init__ (self , mlmodel,training) :
        super(). __init__ (mlmodel)
        self.feature_input_order = mlmodel.feature_input_order
        # Training object from VCnet 
        self.training = training
    # Generate and return encoded and
    # scaled counterfactual examples
    def get_counterfactuals (self , factuals : pd.DataFrame,eps=0.1) :
        data = torch.from_numpy(factuals.to_numpy()).float()
        labels = None
        results = self.training.compute_counterfactuals(data,labels)
        counterfactuals = self.training.round_counterfactuals(results,eps,data)[0]["cf"]
        #print(f"PROBA X : {self.training.round_counterfactuals(results,eps,data)['proba_x']} \n  ======================================= \n PROBA_C :{self.training.round_counterfactuals(results,eps,data)['proba_c']} ")
        return pd.DataFrame(counterfactuals.numpy(),columns=self.feature_input_order)