from flask import Blueprint, request, jsonify
from src.models.models import db, Equipo

equipos_bp = Blueprint('equipos', __name__, url_prefix='/api/equipos')

@equipos_bp.route('', methods=['GET'])
@equipos_bp.route('/', methods=['GET'])
def get_equipos():
    equipos = Equipo.query.all()
    return jsonify([{"id": e.id, "nombre": e.nombre, "logo_url": e.logo_url} for e in equipos]), 200

@equipos_bp.route('', methods=['POST'])
@equipos_bp.route('/', methods=['POST'])
def create_equipo():
    data = request.get_json()
    nuevo_equipo = Equipo(
        nombre=data.get('nombre'),
        logo_url=data.get('logo_url')
    )
    db.session.add(nuevo_equipo)
    db.session.commit()
    return jsonify({"message": "Equipo creado"}), 201