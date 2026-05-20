from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    rol = db.Column(db.String(50), default='usuario')

class Equipo(db.Model):
    __tablename__ = 'equipos'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    logo_url = db.Column(db.String(255))
    
class Reel(db.Model):
    __tablename__ = 'reels'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100))
    video_url = db.Column(db.String(255), nullable=False)
    fecha_subida = db.Column(db.DateTime, default=datetime.utcnow)