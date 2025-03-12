  
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

df = pd.read_csv('/Users/agastyamishra/eda-analysis/backendFlask/__pycache__/US-National-Parks_RecreationVisits_1979-2023.csv')
cat_col = []
types = df.dtypes
columns = list(df.columns)
 
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
    
print(df.head(5))
   








