import pytest
from src import create_app
from src.models.models import db

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.session.remove()
            db.drop_all()
        
def test_get_equipos_empty(client):
    rv = client.get('/api/equipos')
    assert rv.status_code == 200
    assert rv.get_json() == []

def test_registro_usuario(client):
    rv = client.post('/api/auth/registro', json={
        "nombre": "Test User",
        "email": "test@correo.com",
        "password": "password123",
        "rol": "admin"
    })
    assert rv.status_code == 201