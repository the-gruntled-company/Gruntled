from . import db, create_app, models


if __name__ == '__main__':
  app = create_app()
  db.create_all(app = app)
  app.run(host="localhost",port=8080,debug = True)