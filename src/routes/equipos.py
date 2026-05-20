from flask import Blueprint, jsonify
from src.models.models import Equipo

equipos_bp = Blueprint('equipos', __name__, url_prefix='/api/equipos')

@equipos_bp.route('', methods=['GET'])
@equipos_bp.route('/', methods=['GET'])
def get_equipos():
    equipos = Equipo.query.all()
    return jsonify([{"id": e.id, "nombre": e.nombre, "logo_url": e.logo_url} for e in equipos]), 200