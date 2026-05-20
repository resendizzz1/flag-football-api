from flask import Blueprint, request, jsonify
from src.models.models import db, Usuario

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/registro', methods=['POST'])
def registro():
    data = request.get_json()
    nuevo_usuario = Usuario(
        nombre=data.get('nombre'),
        email=data.get('email'),
        password=data.get('password'),  # Nota: En producción usar hashing (ej. werkzeug.security)
        rol=data.get('rol', 'usuario')
    )
    db.session.add(nuevo_usuario)
    db.session.commit()
    return jsonify({"message": "Usuario creado"}), 201