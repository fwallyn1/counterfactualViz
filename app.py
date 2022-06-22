from flask import Flask, jsonify, render_template
import pandas as pd
import numpy as np
import json
app = Flask(__name__)

DATASET_PATH = 'data_churn.json'
@app.route('/')
def index():
    return render_template('index.html')



@app.route('/get_data')
def get_data():
    with open(DATASET_PATH, 'r') as f:
        fileData = json.load(f)
    return fileData
    
if __name__ == '__main__':
    app.run(debug=True,port=3000)
                   