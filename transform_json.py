import json

with open('data.json', 'r') as f:
        fileData = json.load(f)

new_data = {}

new_data["col"] = fileData["col"]
new_data["y_x"] = fileData["y_x"]
new_data["y_c"] = fileData["y_c"]
new_data["proba_x"] = fileData["proba_x"]
new_data["proba_c"] = fileData["proba_c"]

l1 = fileData["X"]
l2 = fileData["cf"]
new_data["X"] = [list(i) for i in zip(*l1)]
new_data["cf"] = [list(i) for i in zip(*l2)]

with open('data_transpose.json', 'w') as f:
        json.dump(new_data,f)