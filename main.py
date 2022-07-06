from gruntled_backend import db, create_app, models

app = create_app()
db.create_all(app = app)

if __name__ == '__main__':
  # create actual backend object
  app = create_app()
  # create the db's
  db.create_all(app = app)
  # runs the app
  app.run(host="localhost",port=5000,debug = True)