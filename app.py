from flask import Flask, jsonify, render_template,request
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

@app.route('/form-example', methods=['GET', 'POST'])
def form_example():
    # handle the POST request
    if request.method == 'POST':
        language = request.form.get('language')
        framework = request.form.get('framework')
        return '''
                  <h1>The language value is: {}</h1>
                  <h1>The framework value is: {}</h1>'''.format(language, framework)

    # otherwise handle the GET request
    return '''
           <form method="POST">
               <div><label>Language: <input type="text" name="language"></label></div>
               <div><label>Framework: <input type="text" name="framework"></label></div>
               <input type="submit" value="Submit">
           </form>'''




