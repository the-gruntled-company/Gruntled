# models.py

from flask_login import UserMixin
from . import db
from datetime import datetime

class User(UserMixin, db.Model):
    id= db.Column(db.Integer, primary_key=True) #primary keys are required by SQLAlchemy
    username= db.Column(db.String(100), unique=True, nullable=False)
    email= db.Column(db.String(100), unique=True, nullable=False)
    password= db.Column(db.String(100), nullable=False)
    date_create= db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    date_access= db.Column(db.DateTime, nullable=False)

class Youtube(db.Model):
    id= db.Column(db.Integer, primary_key=True) #primary keys are required by SQLAlchemy
    title= db.Column(db.String(100), nullable=False)
    link= db.Column(db.String(100), unique=True, nullable=False)
    # user_id= db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) #user that watches YT
    description= db.Column(db.Text)
    like_count= db.Column(db.Integer, nullable=False)
    view_count= db.Column(db.Integer, nullable=False)
    date_last_updated= db.Column(db.DateTime, nullable=False)
    # date_access= db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class Reaction(db.Model):
    id= db.Column(db.Integer, primary_key=True) #primary keys are required by SQLAlchemy
    title= db.Column(db.String(100), nullable=False)
    link= db.Column(db.String(100), unique=True, nullable=False)
    user_id= db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) #user that uploads reaction
    public= db.Column(db.Boolean(), nullable=False, default=False)
    view_count= db.Column(db.Integer, nullable=False, default=0)
    date_create= db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    date_access= db.Column(db.DateTime, nullable=False)
    num_access= db.Column(db.Integer, nullable=False)

class Merge(db.Model):
    id= db.Column(db.Integer, primary_key=True) #primary keys are required by SQLAlchemy
    title= db.Column(db.String(100), nullable=False)
    link= db.Column(db.String(100), unique=True, nullable=False)
    user_id= db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) #user that uploads reaction
    public= db.Column(db.Boolean(), nullable=False, default=False)
    view_count= db.Column(db.Integer, nullable=False, default=0)
    date_create= db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    date_access= db.Column(db.DateTime, nullable=False)
    num_access= db.Column(db.Integer, nullable=False)

class User_Makes_Reaction(db.Model):
    user_id= db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reaction_id= db.Column(db.Integer, db.ForeignKey('reaction.id'), nullable=False)
    youtube_id= db.Column(db.Integer, db.ForeignKey('youtube.id'), nullable=False)

class YT_Video_Paused_During_Reaction(db.Model):
    user_id= db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reaction_id= db.Column(db.Integer, db.ForeignKey('reaction.id'), nullable=False)
    youtube_id= db.Column(db.Integer, db.ForeignKey('youtube.id'), nullable=False)
    start_pause= db.Column(db.Integer)
    end_pause= db.Column(db.Integer)

class User_Watches_YT_Video(db.Model):
    user_id= db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    youtube_id= db.Column(db.Integer, db.ForeignKey('youtube.id'), nullable=False)
    date_view= db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class Combine_Reaction_And_YT(db.Model):
    merged_id= db.Column(db.Integer, db.ForeignKey('merged.id'), nullable=False)
    reaction_id= db.Column(db.Integer, db.ForeignKey('reaction.id'), nullable=False)
    youtube_id= db.Column(db.Integer, db.ForeignKey('youtube.id'), nullable=False)

class Users_With_Access_to_Reaction(db.Model):
    user_id= db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reaction_id= db.Column(db.Integer, db.ForeignKey('reaction.id'), nullable=False)
    date_updated= db.Column(db.DateTime)

class Users_With_Access_to_Merge(db.Model):
    user_id= db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    merged_id= db.Column(db.Integer, db.ForeignKey('merged.id'), nullable=False)
    date_updated= db.Column(db.DateTime)