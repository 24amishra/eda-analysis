import pandas as pd
import numpy as np
from flask_cors import CORS
import torch
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
from PIL import Image
import torch.nn.functional as nff
from io import BytesIO
from flask_cors import CORS
from alter import DataDig
from flask import Flask, render_template, url_for, request, jsonify,session,Response
import json
import seaborn as sns
import matplotlib
import matplotlib.pyplot as plt
import io
import base64



app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"], supports_credentials=True,
  allow_headers=["Content-Type", "Authorization"], methods=["GET", "POST", "OPTIONS"])
file_storage = {}

app.secret_key = 'i2jwfi'  
matplotlib.use('Agg')

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
    

    

    try:
        columns = list(df.columns)
        shape = df.shape
        missing = df.isnull().sum()
        describe = df.describe()
        missing = missing.to_frame().T  
        missing.index = ["missing_values"]  

        

        describe = pd.concat([describe, missing], ignore_index=True)
        describe = describe.to_json(orient = 'records')
    
        sum = missing.sum()
        overview = df.head(1)

        
        
        summary = df.describe()


    
        missing = df.isnull().sum()
        sum = missing.sum()
        missing = missing.to_json()
        cat_col = []
        types = df.dtypes
        columns = list(df.columns)
        num_col = []

    
        
        for index,type in enumerate(types):
            if type != 'int64' and type != 'float':
                cat_col.append(index) 
            
        num_dict = {}

        for column in range(0,len(columns)):
            if column in cat_col:
                num_dict[columns[column]] = 'Categorical'
            else:
                num_col.append(columns[column])
        num_dictJSON = json.dumps(num_dict,indent = 4)
        corr_matrix = df.corr(numeric_only=True)
        #top_5 = (corr.abs().unstack().sort_values(ascending=False).drop_duplicates())
        
        #topCorr= top_5[top_5 < 1].head(5)
        #topCorr = topCorr.index


        
    
        overview = overview.to_json(orient='records')
        
        ##cat_col = cat_col.to_json(orient = 'records')
        top_corr = (
        corr_matrix
    .where(~np.eye(corr_matrix.shape[0], dtype=bool))  # remove self-correlation
    .abs()
    .unstack()
    .dropna()
    .sort_values(ascending=False)
    .drop_duplicates()
)
        top_corr_pairs =top_corr.index.tolist()
        top_corr_pairs =  top_corr_pairs[0:4]
        top_corr_pairs = [f"{a} & {b} : {c:.3f}" for (a, b), c in top_corr.items()]


        response = jsonify({
            'columns': columns,
            'shape': shape,
            'missing':missing,
            'cat':cat_col,
            'num': num_dictJSON,
            'overview': overview,
            'describe': describe,
            'numerical': num_col,
            'pairs':top_corr_pairs,

           # 'topCor': topCorr,


        ## 'missing': sum,
            
        

        })
        response.headers["Content-Type"] = "application/json"



        return response,200
    except UnicodeEncodeError: 
       
        return {"error": "Encoding error: Please upload a valid CSV file."}
    except Exception as e:
            return {"success": False, "error": f"An error occurred: {str(e)}"},400


    
@app.route('/image', methods=['POST','GET'])

def image():
    
    file_data = file_storage.get('file')
    try:
        df = pd.read_csv(BytesIO(file_data))
   
        corr_matrix = df.corr(numeric_only=True)
        plt.figure(figsize=(8, 6))  # Adjust figure size
        sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', fmt=".2f", linewidths=0.5)
       

# Show the plot
        plt.title("Correlation Heatmap")
        img_buf = BytesIO()
   
        plt.savefig(img_buf, format='png')
        img_buf.seek(0)
        plt.close()
        return Response(img_buf,mimetype='image/png')
    except:
        return({"Error": "error in CSV file encoding. Please check and try again."})
    ## return response object of type png
   

    



@app.route('/chart',methods = ['POST','GET'])
def generate_chart():
    try:
        file_data = file_storage.get('file')
        df = pd.read_csv(BytesIO(file_data))
        result = {}
        for col in df.select_dtypes(include='number').columns:
            counts, bin_edges = np.histogram(df[col].dropna(), bins=10)
            bins = [f"{round(bin_edges[i], 2)} - {round(bin_edges[i+1], 2)}" for i in range(len(counts))]
            result[col] = [{"bin": b, "count": int(c)} for b, c in zip(bins, counts)]
        return jsonify(result)

    
    
    except Exception as e:
        print(f'Error occured')













@app.route('/clean',methods =['POST','GET'])


def holes():


    try:
        file_data = file_storage.get('file')
        df = pd.read_csv(BytesIO(file_data))

        missing = df.isnull().mean()
        missing = missing[missing > 0.4]
        missing = list(missing.index)
    except:
        return({"Error": "error in CSV file encoding. Please check and try again."})

    response = jsonify({
'missing': missing,


    })
    return response,200

@app.route('/file',methods= ['POST','GET'])
def download():
    try:
        file_data = file_storage.get('file')
        df = pd.read_csv(BytesIO(file_data))

        missing = df.isnull().mean()
        df = df.loc[:, df.isnull().mean() < 0.4]

        csv = df.to_csv(index=False)

        return Response(
csv,mimetype='text/csv',    headers={"Content-Disposition": "attachment;filename=cleaned_data.csv"}


 
        )
       
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "An error occurred while processing the file."}), 500


@app.route('/bar',methods = ['GET','POST'])
def graph():
    try:
        file_data = file_storage.get('file')
        df = pd.read_csv(BytesIO(file_data))

        
        df = df.loc[:, df.isnull().mean() < 0.4]
        
        return jsonify(df.to_dict(orient='records'))
    except:
         
        print(f"Error: {str()}")
        return jsonify({"error": "An error occurred while processing the file."}), 500





    
   


    



if __name__ == '__main__':

    app.run(port=8000, debug=True)


