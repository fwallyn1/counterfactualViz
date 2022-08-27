#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Jun 27 15:10:31 2022

@author: nwgl2572
"""

import pandas as pd 
import numpy as np 


# Preprocessing for telco dataset 




data = pd.read_csv("data/telco_churn.csv")


data["Churn"] = data['Churn'].map({'Yes': 1, 'No': 0})


data.TotalCharges = pd.to_numeric(data.TotalCharges, errors='coerce')

data.loc[data['TotalCharges'].isnull() == True]

data.drop(columns=["customerID"],inplace=True)

data.dropna(how = 'any', inplace = True)




data.to_csv("data/telco_new.csv")