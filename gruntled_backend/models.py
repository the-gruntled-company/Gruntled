# models.py

from flask_login import UserMixin
from datetime import datetime
from . import db

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    name = db.Column(db.String(1000), nullable=False, unique=True,)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    date_create= db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    date_access= db.Column(db.DateTime)

class Youtube(db.Model):
    id= db.Column(db.Integer, primary_key=True) #primary keys are required by SQLAlchemy
    title= db.Column(db.String(100), nullable=False)
    link= db.Column(db.String(100), unique=True, nullable=False)
    description= db.Column(db.Text)
    like_count= db.Column(db.Integer, nullable=False)
    view_count= db.Column(db.Integer, nullable=False)
    date_updated= db.Column(db.DateTime, nullable=False)

class Reaction(db.Model):
    id= db.Column(db.Integer, primary_key=True) #primary keys are required by SQLAlchemy
    title= db.Column(db.String(100), nullable=False)
    link= db.Column(db.String(100), unique=True, nullable=False)
    uploader= db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) #user that uploads reaction
    public= db.Column(db.Boolean(), nullable=False, default=False)
    view_count= db.Column(db.Integer, nullable=False, default=0)
    date_create= db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    date_access= db.Column(db.DateTime, nullable=False)
    num_access= db.Column(db.Integer, nullable=False)

class Merge(db.Model):
    id= db.Column(db.Integer, primary_key=True) #primary keys are required by SQLAlchemy
    title= db.Column(db.String(100), nullable=False)
    link= db.Column(db.String(100), unique=True, nullable=False)
    uploader= db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) #user that uploads reaction
    public= db.Column(db.Boolean(), nullable=False, default=False)
    view_count= db.Column(db.Integer, nullable=False, default=0)
    date_create= db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    date_access= db.Column(db.DateTime, nullable=False)
    num_access= db.Column(db.Integer, nullable=False)