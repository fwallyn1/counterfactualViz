from flask import Flask, jsonify, render_template,request
import pandas as pd
import numpy as np
import json
app = Flask(__name__)

DATASET_PATH = 'data_churn_probs.json'

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
    return render_template('expert.html',id_indiv = id_indiv)

@app.route('/counterfactual')
def counterfactual():
    """
    ENDPOINT du contrefactuel pour un individu et un threshold
    """
    id_indiv = request.args.get("id_indiv") 
    threshold = request.args.get("threshold")
    return render_template('counterfactual.html',id_indiv = id_indiv,threshold = str(threshold))

@app.route('/get_data')
def get_data():
    with open(DATASET_PATH, 'r') as f:
        fileData = json.load(f)
    return fileData


if __name__ == '__main__':
    app.run(host="localhost",debug=True,port=8000)


