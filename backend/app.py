from flask import Flask, jsonify

app = Flask(__name__)

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
            "name": "Bell B60E",
            "status": "Critical",
            "usage_hours": 6100,
            "maintenance_limit": 5000
        }
    ]
    return jsonify(equipment)

if __name__ == "__main__":
    app.run(debug=True)
