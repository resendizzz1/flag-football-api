from flask import Blueprint, request, jsonify
from src.models.models import db, EstadisticasPartido

stats_bp = Blueprint('stats_bp', __name__)

@stats_bp.route('/estadisticas', methods=['POST'])
def add_stats():
    data = request.get_json()
    nueva_estadistica = EstadisticasPartido(
        id_partido=data['id_partido'],
        id_jugador=data['id_jugador'],
        pass_touchdowns=data.get('pass_touchdowns', 0),
        rec_touchdowns=data.get('rec_touchdowns', 0),
        intercepciones=data.get('intercepciones', 0),
        tackles_flag=data.get('tackles_flag', 0),
        sacks=data.get('sacks', 0)
    )
    db.session.add(nueva_estadistica)
    db.session.commit()
    return jsonify({"message": "Estadística registrada", "id": nueva_estadistica.id}), 201

@stats_bp.route('/estadisticas/<int:id_jugador>', methods=['GET'])
def get_stats(id_jugador):
    estadisticas = EstadisticasPartido.query.filter_by(id_jugador=id_jugador).all()
    resultado = [{
        "id_partido": e.id_partido,
        "pass_touchdowns": e.pass_touchdowns,
        "rec_touchdowns": e.rec_touchdowns,
        "intercepciones": e.intercepciones,
        "tackles_flag": e.tackles_flag,
        "sacks": e.sacks
    } for e in estadisticas]
    return jsonify(resultado), 200