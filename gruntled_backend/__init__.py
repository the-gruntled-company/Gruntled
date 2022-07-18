# init.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager 
from flask_migrate import Migrate
import subprocess

# init SQLAlchemy so we can use it later in our models
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = '9OLWxND4o83j4K4iuopO'
        
    #Get Database URI
    #app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ikxphdxdmysghq:8cef93eacb6830b8095c8e5d1b33ecacfaba8231ea400e0c62ca2ea1df5b1a7d@ec2-3-223-169-166.compute-1.amazonaws.com:5432/de9h18disn317r'

    heroku_app_name = "gruntled-api-dev"
    url = subprocess.run(["heroku", "config:get", "DATABASE_URL", "--app", heroku_app_name], capture_output=True).stdout 
    url = str(url).replace("b'postgres", "postgresql", 1)
    url = str(url).replace("\\n'", "", 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = url

    db.init_app(app)
    migrate.init_app(app, db)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    from .models import User

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return User.query.get(int(user_id))

    # blueprint for auth routes in our app
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    # blueprint for non-auth parts of app
    from .index import index as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
