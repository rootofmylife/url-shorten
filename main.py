from flask import Flask, jsonify

from src.constants.env import Env
from src.settings import settings

app = Flask(__name__)

@app.route('/ping', methods=['GET'])
def ping():
    """Simple ping endpoint that returns pong"""
    return jsonify({"response": "pong"})

if __name__ == "__main__":
    app.run(debug=settings.environment == Env.dev, host=settings.host, port=settings.port)
