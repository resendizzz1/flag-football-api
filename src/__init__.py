from flask import Flask
from src.config import Config
from src.models.models import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    from src.routes.team_routes import team_bp
    from src.routes.stats_routes import stats_bp
    from src.routes.auth_routes import auth_bp
    
    app.register_blueprint(team_bp, url_prefix='/api')
    app.register_blueprint(stats_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    with app.app_context():
        db.create_all()

    from src.routes.videos import videos_bp
    app.register_blueprint(videos_bp)
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000)