from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Equipment

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///smartmine.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

CORS(app, resources={r"/api/*": {"origins": "*"}})


# =========================
# HEALTH CHECK
# =========================
@app.route("/")
def home():
    return "SmartMine backend is running"


# =========================
# EQUIPMENT
# =========================
@app.route("/api/equipment", methods=["GET"])
def get_equipment():
    equipment_list = Equipment.query.all()

    result = []
    for eq in equipment_list:
        result.append({
            "id": eq.id,
            "code": eq.code,
            "name": eq.name,
            "type": eq.type,
            "usage_hours": eq.usage_hours,
            "maintenance_limit": eq.maintenance_limit,
            "status": eq.calculate_status()
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
        maintenance_limit=data["maintenance_limit"]
    )

    db.session.add(new_equipment)
    db.session.commit()

    return jsonify({"message": "Equipment added successfully"}), 201


# =========================
# ALERTS (AUTO-GENERATED)
# =========================
@app.route("/api/alerts", methods=["GET"])
def get_alerts():
    equipment_list = Equipment.query.all()
    alerts = []

    for eq in equipment_list:
        status = eq.calculate_status()

        if status in ["Warning", "Critical"]:
            alerts.append({
                "equipment_id": eq.id,
                "code": eq.code,
                "name": eq.name,
                "status": status,
                "usage_hours": eq.usage_hours,
                "maintenance_limit": eq.maintenance_limit
            })

    return jsonify(alerts)


# =========================
# START SERVER (LAST LINE)
# =========================
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
