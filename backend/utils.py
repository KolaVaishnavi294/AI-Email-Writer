from dotenv import load_dotenv
from google import genai
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def generate_email_content(
        purpose,
        details,
        tone):

    prompt = f"""
Write a professional email.

Purpose:
{purpose}

Details:
{details}

Tone:
{tone}

Generate:
Subject:
Body:
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text