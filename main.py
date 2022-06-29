from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret-key-goes-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
db.init_app(app)

# blueprint for auth routes in our app
from hello import auth as auth_blueprint
app.register_blueprint(auth_blueprint)

# blueprint for non-auth parts of app
from hello import main as main_blueprint
app.register_blueprint(main_blueprint)

if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug = True)

