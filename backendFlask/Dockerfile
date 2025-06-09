FROM python:3.11-slim-bullseye

# Set the working directory
WORKDIR /Users/agastyamishra/eda-analysis/backendFlask

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy your code
COPY . .

# Run the app
CMD ["python", "server.py"]
