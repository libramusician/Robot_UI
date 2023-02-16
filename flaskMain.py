from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def index():
  # We can grab the values from firebase using python, and insert them into the html pretty easily
  # Still need to decide how to update regularly
  return render_template('index.html')
  
@app.route("/data")
def data():
  return render_template('data.html')

@app.route("/signin")
def signin():
  # Login logic here
  return render_template('signin.html')

@app.route("/control")
def control():
  # video logic here
  return render_template('control.html')

@app.route("/more")
def more():
  return render_template('permission.html')

@app.route("/monitor")
def monitor():
  return render_template('monitor.html')



@app.route("/faq")
def faq():
  return render_template('faq.html')



if __name__ == "__main__":
  # initializing_network()
  app.run(debug=True, host='0.0.0.0',port=8081)
