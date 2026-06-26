from flask import Blueprint
from flask import request
from flask import jsonify

from utils import generate_email_content

email_bp = Blueprint(
    "email_bp",
    __name__
)


@email_bp.route(
    "/generate-email",
    methods=["POST"]
)
def generate_email():

    try:

        data = request.get_json()

        purpose = data.get(
            "purpose"
        )

        recipient = data.get(
            "recipient"
        )

        details = data.get(
            "details"
        )

        tone = data.get(
            "tone"
        )

        length = data.get(
            "length"
        )

        email_text = (
            generate_email_content(
                purpose,
                recipient,
                details,
                tone,
                length
            )
        )

        return jsonify({
            "email":
            email_text
        })

    except Exception as e:

        print(
            "FULL ERROR =",
            e
        )

        return jsonify({
            "error":
            str(e)
        }), 500