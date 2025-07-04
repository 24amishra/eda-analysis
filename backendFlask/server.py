import pandas as pd
import numpy as np
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
import numpy as np
from sklearn.model_selection import cross_val_score
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
from flask import session
from langchain.agents.agent_types import AgentType
from langchain.chat_models import init_chat_model

from langchain_openai import OpenAI
from google import genai
from pandasai import SmartDataframe
import scipy as sp
import getpass
import os
import pandas as pd
from langchain.agents.agent_types import AgentType
from langchain.chat_models import init_chat_model
from langchain_openai import OpenAI
from langchain_experimental.agents.agent_toolkits import create_pandas_dataframe_agent

from dotenv import load_dotenv
import os






app = Flask(__name__)
app.secret_key = 'i2jwfi'  
MAX_BYTES = 200000000

CORS(app, origins=["http://localhost:3000"], supports_credentials=True,
  allow_headers=["Content-Type", "Authorization"], methods=["GET", "POST", "OPTIONS"])
file_storage = {}
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = True  # Only if using HTTPS

matplotlib.use('Agg')

@app.route('/server', methods=['POST'])

def get_data():
   # Get the file from the request
    
    file = request.files.get('file')


    
 
    # Load and use the model for prediction
  

 
    


    
    
    if (file):
        file_storage['file'] = file.read()
        
        file_size = len(file_storage['file'])
        print("Check")
        print(file_size)
        if file_size < MAX_BYTES:
       
            response = jsonify({"message": "File received successfully!", "filename": file.filename})
            response.headers["Content-Type"] = "application/json"
            return response, 200
        else:
            response = jsonify({"message": "Error. File must be under 200 MB","filename": file.filename})
            return response,400
    
        
    
    
       
    
       
    
    else:
        return jsonify({
        'message': 'File upload failed',
       
    }), 200

@app.route('/corr', methods=['POST'])



def corr():
    file_data = file_storage.get('file')
    
    df = pd.read_csv(BytesIO(file_data))

    try: 
        data =  request.get_json()
        corr_matrix = df.corr(numeric_only=True)

        var1 = data.get("var1")
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
        var1_corrs = {
         corr
        for (a, b), corr in top_corr.items()
        if var1 in (a, b)
    }
        var1_corrs = list(var1_corrs)

    


        
        





    except:
        print("error")
    return jsonify({"correlations": var1_corrs})

















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
        outliers = []


        for column in df.select_dtypes(include=['number']).columns:
            q1 = df[column].quantile(0.25)
            q3 = df[column].quantile(0.75)
            iqr = q3 - q1
    
            for value in df[column].dropna().values:
                if value > q3 + 1.5 * iqr or value < q1 - 1.5 * iqr:
                    outliers.append((column, value))

        print("Outliers:")

        num = len(outliers)




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
            'outliers': num
        

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
        mask = np.triu(np.ones_like(corr_matrix, dtype=bool))
   

        sns.heatmap(corr_matrix, mask=mask,annot=False, cmap='coolwarm', fmt=".2f", linewidths=0.5)
       

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

@app.route('/chatbot',methods = ['GET','POST'])
def chat():

    file_data = file_storage.get('file')

    try:
        data =  request.get_json()

        text = data.get("query")
        df = pd.read_csv(BytesIO(file_data))
        load_dotenv()  
        openai_key = os.getenv("OPENAI_API_KEY")
        #agent = create_pandas_dataframe_agent(OpenAI(api_key=openai_key,temperature=0), df, verbose=True,allow_dangerous_code=True)
        llm = OpenAI(api_key=openai_key,temperature=0)

        sdf = SmartDataframe(df, config={"llm": llm ,
                                         
        "use_error_correction_framework": True,  
        "enable_cache": False,
        "save_charts": False,})
        response = sdf.chat("Using Python code," + text+ "Format in such a way that it is easily readable for users.",output_type='string')

        

        return jsonify({'response':response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500        





    


@app.route('/net',methods = ['POST','GET'])
def net():
    file_data = file_storage.get('file')


    df = pd.read_csv(BytesIO(file_data))
  

    df = df.loc[:, df.isnull().mean() < 0.4]
    data =  request.get_json()
    var1 = data.get("var1")
    depth = data.get('depth')
    sample = data.get('sample')

    remove = data.get('remove')
    if depth != None and depth != 'None':
        depth = int(depth)
    if sample != 2:
        sample = float(sample)
    if depth == 'None':
        depth = None
    
    
 
    
    split_ratio_str = data.get("split")
    y = df[var1]
    X = df.drop(columns=[var1])
    
    for col in df.columns:
        if df[col].dtype != 'int64' and df[col].dtype != 'float':
            df = df.drop(columns=col)
    regressor = DecisionTreeRegressor(max_depth = depth,random_state = 0,min_samples_split=sample)
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=1 - 0 ,random_state=42)

    regressor.fit(X_train, y_train)
    scores = cross_val_score(regressor, X, y, cv=10)
    y1 = regressor.predict(X_test)
    print(y1)
    y1 =  y1.tolist()
    y_test = y_test.tolist() 

    prediction = [{'x': y1[val],'y' : y_test[val]} for val in range(0,len(y1))]





    
@app.route('/columns',methods = ['POST','GET'])
def drop():
    file_data = file_storage.get('file')


    df = pd.read_csv(BytesIO(file_data))
  

    df = df.loc[:, df.isnull().mean() < 0.4]
    data =  request.get_json()
    var1 = data.get("var1")
    depth = data.get('depth')
    sample = data.get('sample')
    outlier = data.get('outlier')
    param = data.get('param')

    remove = data.get('remove')
    if depth != None and depth != 'None':
        depth = int(depth)
    if sample != 2:
        sample = float(sample)
    if depth == 'None':
        depth = None
    
    
 
    
    split_ratio_str = data.get("split")
    
    if not var1 or not split_ratio_str:
        return jsonify({"error": "Missing 'var1' or 'split'"}), 400
    
    split_ratio = int(split_ratio_str.split('-')[0]) / 100.0
    session['target'] = var1
    session['split_ratio'] = split_ratio
    print("THIS IS TARGET")
    print(var1)
    
    if var1 not in df.columns:
        return jsonify({"error": f"Target '{var1}' not found in dataset"}), 400
        file_data = file_storage.get('file')


    df = pd.read_csv(BytesIO(file_data))






    # Read file and form data
    target = session.get('target')
    print("WHAT IS TARGET")
    variance = df[target].var()
    
    if target is None:
        return jsonify({"error": "Target variable is not set. Please select a target variable first."}), 400

    split_ratio = session.get('split_ratio')
    if split_ratio is None:
        return jsonify({"error": "Split ratio is not set. Please provide a split ratio."}), 400
    
    for col in df.columns:
        if df[col].dtype != 'int64' and df[col].dtype != 'float':
            df = df.drop(columns=col)

    
   
   
   
    y = df[target]
    X = df.drop(columns=[target])
    X = df[param]
    print(X)
    if outlier:
        q1 = df[target].quantile(0.25)
        q3 = df[target].quantile(0.75)
        iqr = q3 - q1
    
        mask = (df[target] >=  q1 - 1.5 * iqr) & (df[target] <=  q3 + 1.5 * iqr)


        y = df[target][mask]
        X = df.drop(columns=[target])[mask]

    ## remove all columns under 0.2 correlation to remove noise
    if remove:
        correlations = X.apply(lambda col: col.corr(y))
        threshold = 0.2
        correlated_features = correlations[correlations.abs() >= threshold].index
        X = X[correlated_features]
   

       
    regressor = DecisionTreeRegressor(max_depth = depth,random_state = 0,min_samples_split=sample)
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=1 - split_ratio, random_state=42)

    regressor.fit(X_train, y_train)
    scores = cross_val_score(regressor, X, y, cv=10)
    y1 = regressor.predict(X_test)
    print(y1)
    y1 =  y1.tolist()
    y_test = y_test.tolist() 

    prediction = [{'x': y1[val],'y' : y_test[val]} for val in range(0,len(y1))]
   

    return jsonify({
        "cross_val_scores": scores.tolist(),
        "mean_score": scores.mean(),
        "prediction": prediction,
        "variance": variance
        
    })
   




    
@app.route('/regress', methods=['POST','GET'])
def regressor():
    pass



if __name__ == '__main__':

    app.run(port=8000, debug=True)


