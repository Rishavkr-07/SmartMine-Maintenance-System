from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()                                   # “I want to use a database.”

class Equipment(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(50), unique=True, nullable=False)
    type = db.Column(db.String(50), nullable=False)

    usage_hours = db.Column(db.Integer, default=0)
    maintenance_limit = db.Column(db.Integer, nullable=False)

    last_service_date = db.Column(db.Date, nullable=True)
    status = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f"<Equipment {self.name}>"
