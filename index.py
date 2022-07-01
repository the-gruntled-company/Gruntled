from flask import Blueprint, render_template
from flask_login import login_required, current_user

index = Blueprint('index', __name__)

@index.route('/')
def home():
    return render_template('home.html')

@index.route('/profile')
@login_required
def profile():
    return render_template('profile.html', name=current_user.name)