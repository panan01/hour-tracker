from flask import Flask
from flask import request, jsonify
import psycopg2 as pg
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv(override=True)

# Create a connection to the database
conn = pg.connect(
    host='an-pan.me',
    database='postgres',
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD'),
)

app = Flask(__name__)
CORS(app)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    # hash the password with the salt
    
    # Check if the user exists in the database
    cur = conn.cursor()
    cur.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, password))
    user = cur.fetchone()
    
    if user:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401