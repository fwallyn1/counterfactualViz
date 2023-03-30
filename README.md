# Counterfactual Visualization

## Installation

Install the required packages by running the following command:
```
pip install -r requirements.txt
```
## Running the App

Start the app by executing:
```
python wgsi.py
```
## Input Data as JSON File

To load a dataset, set the DATASET_PATH variable in the app.py file to the path of a .json file.

The .json file should have the following format:
```json
{
  "p1": {
    "col": ["X1", "X2"],
    "X": [[1, 65, 57], [45.6, 72.45, 89.55]],
    "cf": [[1, 65, 57], [40.6, 72.45, 90]],
    "y_x": [1, 1, 0],
    "y_c": [0, 0, 1],
    "proba_x": [0.6000000238418579, 0.51999998688697815, 0.011968736536800861],
    "proba_c": [0.4300000071525574, 0.3099999940395355, 0.5600000023841858],
    "y_true_x": [1, 0, 0]
  },

  "p2": {
    "col": ["X1", "X2"],
    "X": [[1, 65, 57], [45.6, 72.45, 89.55]],
    "cf": [[0, 65, 45], [67, 4, 67]],
    "y_x": [1, 1, 0],
    "y_c": [0, 1, 1],
    "proba_x": [0.6000000238418579, 0.41999998688697815, 0.011968736536800861],
    "proba_c": [0.4300000071525574, 0.6099999940395355, 0.7600000023841858],
    "y_true_x": [1, 0, 0]
  },

 

  "pn": {  }

}
```
Where:
- p_i: is a parameter value for a counterfactual generation method
- col: Column names
- X: An array that contains the examples to be explained
- cf: An array that contains the counterfactual examples that are generated with a parameter value p_i
- y_x: The predicted class for X
- y_c: The predicted class for the counterfactuals that are generated with a parameter value p_i
- proba_x: The predicted probabilities for the examples to be explained
- proba_c: The predicted probabilities for the counterfactuals that are generated with a parameter value p_i
- y_true_x: is the true predicted class for X
## Input description of the dataset used in a JSON file 

The first page of the interface contains a description of the model, and data that are used. 

The app.py contains a DESCRIPTION_PATH variable to the path of a .json file 

The .json file should have the following format:
```json
{
  "X1": "description of X1",
  "X2": "description of X2"
}

```



















