import pandas as pd
import numpy as np




class DataDig():
    def __init__(self,file):
        self.df = pd.read_csv(file)

        
    
    
    def __shape__(self):
        return self.df.shape()
    def __columns__(self):
        return self.df.columns
