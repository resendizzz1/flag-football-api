from flask import Blueprint, request, jsonify
from src.models.models import db, Equipo
from src.services.storage_service import upload_file_to_s3

team_bp = Blueprint('team_bp', __name__)

@team_bp.route('/equipos', methods=['POST'])
def create_equipo():
    data = request.get_json()
    nuevo_equipo = Equipo(nombre=data['nombre'], logo_url=data.get('logo_url'))
    db.session.add(nuevo_equipo)
    db.session.commit()
    return jsonify({"message": "Equipo creado", "id": nuevo_equipo.id}), 201

@team_bp.route('/equipos', methods=['GET'])
def get_equipos():
    equipos = Equipo.query.all()
    resultado = [{"id": e.id, "nombre": e.nombre, "logo_url": e.logo_url} for e in equipos]
    return jsonify(resultado), 200

@team_bp.route('/equipos/<int:id>/logo', methods=['POST'])
def upload_logo(id):
    equipo = Equipo.query.get_or_404(id)
    
    if 'logo' not in request.files:
        return jsonify({"error": "No se encontró el archivo"}), 400
        
    file = request.files['logo']
    if file.filename == '':
        return jsonify({"error": "Archivo vacío"}), 400

    try:
        url = upload_file_to_s3(file)
        equipo.logo_url = url
        db.session.commit()
        return jsonify({"message": "Logo actualizado", "logo_url": url}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500