import pandas as pd
import numpy as np
import matplotlib as plt
from flask_cors import CORS
import torch
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
from PIL import Image
import torch.nn.functional as nff
from io import BytesIO
from flask_cors import CORS
from alter import DataDig
from flask import Flask, render_template, url_for, request, jsonify,session
import json


app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"], supports_credentials=True,
  allow_headers=["Content-Type", "Authorization"], methods=["GET", "POST", "OPTIONS"])
file_storage = {}

app.secret_key = 'i2jwfi'  


@app.route('/server', methods=['POST'])

def get_data():
   # Get the file from the request
    
    file = request.files.get('file')
    
 
    # Load and use the model for prediction
  

 
    


    
    
    if (file):
        file_storage['file'] = file.read()

        response = jsonify({"message": "File received", "filename": file.filename})
        response.headers["Content-Type"] = "application/json"
        return response, 200
        
    
    
       
    
       
    
    else:
        return jsonify({
        'message': 'File upload failed',
       
    }), 200



@app.route('/data', methods=['POST'])

def check():
    file_data = file_storage.get('file')
    df = pd.read_csv(BytesIO(file_data))
    columns = list(df.columns)
    shape = df.shape
    missing = df.isnull().sum()
    sum = missing.sum()
    overview = df.head(5)

    
    
    summary = df.describe()


   
    missing = df.isnull().sum()
    sum = missing.sum()
    missing = missing.to_json()
    cat_col = []
    types = df.dtypes
    columns = list(df.columns)

    for index,type in enumerate(types):
        if type != 'int64' and type != 'float':
            print(type)
            cat_col.append(index) 
    num_dict = {}

    for column in range(0,len(columns)):
        if column in cat_col:
            num_dict[columns[column]] = 'Categorical'
    else:
            num_dict[columns[column]] = 'Numerical'
    num_dictJSON = json.dumps(num_dict,indent = 4)


    
   
    overview = overview.to_json(orient='records')

   

    
    

    
    
    response = jsonify({
        'columns': columns,
        'shape': shape,
        'missing':missing,
        'num': num_dictJSON,
        'overview': overview,
       ## 'missing': sum,
        
       

    })
    response.headers["Content-Type"] = "application/json"



    return response,200

    
  

def holes():
    file_data = file_storage.get('file')
    df = pd.read_csv(BytesIO(file_data))
   


    



if __name__ == '__main__':

    app.run(port=8000, debug=True)


