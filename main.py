from gruntled_backend import db, create_app, models

# create actual backend object
app = create_app()
# create the db's
db.create_all(app = app)
if __name__ == '__main__':
  # runs the app
  app.run(host="localhost",port=8080,debug = True)