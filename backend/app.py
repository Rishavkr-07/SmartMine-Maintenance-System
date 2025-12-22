from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# VERY IMPORTANT: explicit CORS config
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/")
def home():
    return "SmartMine backend is running"

@app.route("/api/equipment")
def get_equipment():
    equipment = [
        {
            "id": "EQ-101",
            "name": "Atlas Copco ST18",
            "status": "Good",
            "usage_hours": 3400,
            "maintenance_limit": 4000
        },
        {
            "id": "EQ-102",
            "name": "Epiroc Boomer M2",
            "status": "Warning",
            "usage_hours": 2900,
            "maintenance_limit": 3000
        },
        {
            "id": "EQ-103",
            "name": "Bell B60E",
            "status": "Critical",
            "usage_hours": 6100,
            "maintenance_limit": 5000
        }
    ]
    return jsonify(equipment)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
