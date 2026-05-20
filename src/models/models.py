from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    rol = db.Column(db.Enum('admin', 'capitan'), default='capitan')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Equipo(db.Model):
    __tablename__ = 'equipos'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), unique=True, nullable=False)
    logo_url = db.Column(db.String(255))
    id_capitan = db.Column(db.Integer, db.ForeignKey('usuarios.id', ondelete='SET NULL'))

class Jugador(db.Model):
    __tablename__ = 'jugadores'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    numero_jersey = db.Column(db.Integer, nullable=False)
    id_equipo = db.Column(db.Integer, db.ForeignKey('equipos.id', ondelete='CASCADE'))

class Partido(db.Model):
    __tablename__ = 'partidos'
    id = db.Column(db.Integer, primary_key=True)
    id_equipo_local = db.Column(db.Integer, db.ForeignKey('equipos.id'))
    id_equipo_visitante = db.Column(db.Integer, db.ForeignKey('equipos.id'))
    puntos_local = db.Column(db.Integer, default=0)
    puntos_visitante = db.Column(db.Integer, default=0)
    fecha_partido = db.Column(db.DateTime, nullable=False)
    estatus = db.Column(db.Enum('programado', 'en_curso', 'finalizado'), default='programado')

class EstadisticasPartido(db.Model):
    __tablename__ = 'estadisticas_partido'
    id = db.Column(db.Integer, primary_key=True)
    id_partido = db.Column(db.Integer, db.ForeignKey('partidos.id', ondelete='CASCADE'))
    id_jugador = db.Column(db.Integer, db.ForeignKey('jugadores.id', ondelete='CASCADE'))
    pass_touchdowns = db.Column(db.Integer, default=0)
    rec_touchdowns = db.Column(db.Integer, default=0)
    intercepciones = db.Column(db.Integer, default=0)
    tackles_flag = db.Column(db.Integer, default=0)
    sacks = db.Column(db.Integer, default=0)