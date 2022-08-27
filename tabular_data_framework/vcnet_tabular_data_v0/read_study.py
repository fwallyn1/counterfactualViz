#!/usr/bin/env python3

# -*- coding: utf-8 -*-

import joblib 
import optuna
import numpy as np 

study = joblib.load("studies/study_breast_cancerused_carlaFalse.pkl")



T = study.trials


pareto_front = study.best_trials

pareto_values = np.array([pareto_front[i].values for i in range(len(pareto_front))])

