from flask import Flask
from flask import request, jsonify
import psycopg2 as pg
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv(override=True)

print(os.getenv('DB_PASSWORD'))

# Create a connection to the database
conn = pg.connect(
    host='an-pan.me',
    database='postgres',
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD'),
)

app = Flask(__name__)
CORS(app)
@app.route('/time_registration', methods=['POST'])
def time_registration():
    data = request.json
    #write to the database
    cur = conn.cursor()
    cur.execute('INSERT INTO work_hour_log (work_date, start_time, end_time, worked_hour) VALUES (%s, %s, %s, %s)', (data['date'], data['startTime'], data['endTime'], data['workedTime']))
    conn.commit()
    return ('', 204)

@app.route('/time_registration', methods=['GET'])
def get_time_registration():
    cur = conn.cursor()
    cur.execute('SELECT * FROM work_hour_log')
    result = cur.fetchall()
    return jsonify(result)

@app.route('/time_registration', methods=['DELETE'])
def delete_time_registration():
    pass
if __name__ == '__main__':
    app.run(port=5000)