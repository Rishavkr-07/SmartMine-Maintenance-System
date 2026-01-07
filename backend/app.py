from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Equipment

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///smartmine.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# VERY IMPORTANT: explicit CORS config
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/")                                         # ROOT health check
def home():
    return "SmartMine backend is running"

@app.route("/api/equipment", methods=["GET"])
def get_equipment():
    equipment_list = Equipment.query.all()

    result = []
    for eq in equipment_list:
        result.append({
            "id": eq.code,
            "name": eq.name,
            "status": eq.status,
            "usage_hours": eq.usage_hours,
            "maintenance_limit": eq.maintenance_limit
        })

    return jsonify(result)


@app.route("/api/equipment", methods=["POST"])
def add_equipment():
    data = request.json

    new_equipment = Equipment(
        name=data["name"],
        code=data["code"],
        type=data["type"],
        usage_hours=data.get("usage_hours", 0),
        maintenance_limit=data["maintenance_limit"],
        status=data["status"]
    )

    db.session.add(new_equipment)
    db.session.commit()

    return jsonify({"message": "Equipment added successfully"}), 201



if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)

