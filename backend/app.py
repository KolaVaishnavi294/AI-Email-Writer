from flask import Flask
from flask_cors import CORS
from flask import request
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)

model = genai.GenerativeModel(
    "gemini-1.5-flash"
)

app = Flask(__name__)

CORS(app)

@app.route("/generate",
methods=["POST"])

def generate():

    data = request.json

    purpose = data["purpose"]
    details = data["details"]

    prompt = f"""
    Write an email.

    Purpose:
    {purpose}

    Details:
    {details}
    """

    response = model.generate_content(
        prompt
    )

    return {
        "email":
        response.text
    }

if __name__ == "__main__":

    app.run(debug=True)