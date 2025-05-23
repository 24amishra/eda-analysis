from google import genai

import getpass
import os
import pandas as pd
from langchain.agents.agent_types import AgentType
from langchain.chat_models import init_chat_model
from langchain_openai import OpenAI
from langchain_experimental.agents.agent_toolkits import create_pandas_dataframe_agent
from pandasai import SmartDataframe

from dotenv import load_dotenv
import os

load_dotenv()  


openai_key = os.getenv("OPENAI_API_KEY")

df = pd.read_csv('/Users/agastyamishra/Desktop/OSUHackathon2025_TeamGameData.csv')


openai_key = os.getenv("OPENAI_API_KEY")
llm = OpenAI(api_key=openai_key,temperature=0)
sdf = SmartDataframe(df, config={"llm": llm})
response = sdf.chat("Can you list all the teams present in the csv file?",output_type='string')
print(response)