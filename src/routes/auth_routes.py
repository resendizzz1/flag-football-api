from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os
from src.models.models import db, Usuario

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/registro', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    
    nuevo_usuario = Usuario(
        nombre=data['nombre'],
        email=data['email'],
        password_hash=hashed_password,
        rol=data.get('rol', 'capitan')
    )
    db.session.add(nuevo_usuario)
    db.session.commit()
    return jsonify({"message": "Usuario registrado exitosamente"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    usuario = Usuario.query.filter_by(email=data['email']).first()
    
    if not usuario or not check_password_hash(usuario.password_hash, data['password']):
        return jsonify({"message": "Credenciales inválidas"}), 401
        
    token = jwt.encode({
        'id': usuario.id,
        'rol': usuario.rol,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, os.getenv('SECRET_KEY', 'super-secret-key'), algorithm='HS256')
    
    return jsonify({'token': token}), 200