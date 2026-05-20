from flask import Blueprint, request, jsonify
from src.models.models import db, Usuario

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/registro', methods=['POST'])
def registro():
    data = request.get_json()
    nuevo_usuario = Usuario(
        nombre=data.get('nombre'),
        email=data.get('email'),
        password=data.get('password'), # Text plano temporal por ruta de Frontend
        rol=data.get('rol', 'usuario')
    )
    db.session.add(nuevo_usuario)
    db.session.commit()
    return jsonify({"message": "Usuario creado"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    usuario = Usuario.query.filter_by(email=data.get('email'), password=data.get('password')).first()
    
    if usuario:
        return jsonify({
            "message": "Login exitoso", 
            "usuario": {"nombre": usuario.nombre, "rol": usuario.rol}
        }), 200
    
    return jsonify({"error": "Credenciales inválidas"}), 401