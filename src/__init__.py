from flask import Flask
from src.models.models import db
from src.routes.videos import videos_bp
from src.routes.auth import auth_bp
from src.routes.equipos import equipos_bp
import os

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///flag_football.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()

    app.register_blueprint(videos_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(equipos_bp)

    return app