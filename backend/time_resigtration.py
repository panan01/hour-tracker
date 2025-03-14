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
@app.route('/time_registration', methods=['PUT'])
def time_registration():
    data = request.json
    #write to the database
    cur = conn.cursor()
    cur.execute('INSERT INTO work_hour_log (work_date, start_time, end_time, worked_hour) VALUES (%s, %s, %s, %s)', (data['date'], data['startTime'], data['endTime'], data['workedTime']))
    conn.commit()
    return ('', 204)

@app.route('/time_registration', methods=['POST'])
def get_time_registration():
    body = request.get_json()
    start_date = body.get('startDate')
    end_date = body.get('endDate')
    cur = conn.cursor()
    cur.execute('SELECT * FROM work_hour_log WHERE work_date >= %s AND work_date <= %s', (start_date, end_date))
    rows = cur.fetchall()
    serialized = []
    for r in rows:
        serialized.append({
            'id': r[4],
            'work_date': r[0].isoformat(),
            'start_time': r[1].strftime('%H:%M:%S'),
            'end_time': r[2].strftime('%H:%M:%S'),
            'worked_hour': r[3]
        })
    return jsonify(serialized), 200

@app.route('/time_registration', methods=['DELETE'])
def delete_time_registration():
    pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
