from flask import Blueprint, request, jsonify
from src.models.models import db, Usuario

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/registro', methods=['POST'])
def registro():
    data = request.get_json()
    rol_solicitado = data.get('rol', 'coach')
    
    nuevo_usuario = Usuario(
        nombre=data.get('nombre'),
        email=data.get('email'),
        password=data.get('password'),
        rol=rol_solicitado,
        autorizado=False if rol_solicitado == 'coach' else True
    )
    db.session.add(nuevo_usuario)
    db.session.commit()
    return jsonify({"message": "Usuario registrado exitosamente"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    usuario = Usuario.query.filter_by(email=data.get('email'), password=data.get('password')).first()
    
    if usuario:
        if not usuario.autorizado:
            return jsonify({"error": "Cuenta pendiente de autorización por el administrador"}), 403
            
        return jsonify({
            "message": "Login exitoso", 
            "usuario": {"id": usuario.id, "nombre": usuario.nombre, "rol": usuario.rol}
        }), 200
    
    return jsonify({"error": "Credenciales inválidas"}), 401

@auth_bp.route('/usuarios/pendientes', methods=['GET'])
def usuarios_pendientes():
    pendientes = Usuario.query.filter_by(autorizado=False).all()
    return jsonify([{"id": u.id, "nombre": u.nombre, "email": u.email, "rol": u.rol} for u in pendientes]), 200

@auth_bp.route('/usuarios/autorizar/<int:user_id>', methods=['PUT'])
def autorizar_usuario(user_id):
    usuario = Usuario.query.get(user_id)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404
        
    usuario.autorizado = True
    db.session.commit()
    return jsonify({"message": "Usuario autorizado"}), 200