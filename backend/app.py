from flask import Flask
from flask_cors import CORS       #Cross Origin Resource Sharing
from dotenv import load_dotenv     #dotenv reads: .env file

from routes import email_bp

load_dotenv()                # Load values from .env file.

app = Flask(__name__)        # Creates a Flask application=server.

CORS(app)                    #Allow frontend and backend to talk even their ports or paths are different.

app.register_blueprint(      #Connect routes.py to app.py.
    email_bp
)

if __name__ == "__main__":

    app.run(                      #Start the server.
        debug=True
    )