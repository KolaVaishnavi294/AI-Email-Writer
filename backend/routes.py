from flask import Blueprint
from flask import request
from flask import jsonify

from utils import generate_email

email_bp = Blueprint(
    "email_bp",
    __name__
)

@email_bp.route(
    "/generate",
    methods=["POST"]
)

def generate():

    try:

        data = request.get_json()

        purpose = data.get(
            "purpose",
            ""
        ).strip()

        details = data.get(
            "details",
            ""
        ).strip()

        tone = data.get(
            "tone",
            "Professional"
        )

        if not purpose:

            return jsonify({
                "error":
                "Purpose is required"
            }),400

        if not details:

            return jsonify({
                "error":
                "Details are required"
            }),400

        email = generate_email(
            purpose,
            details,
            tone
        )

        return jsonify({
            "email":email
        })

    except Exception as e:

        return jsonify({
            "error":str(e)
        }),500