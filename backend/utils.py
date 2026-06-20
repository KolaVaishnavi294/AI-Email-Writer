import os

import google.generativeai as genai

from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv(
    "GEMINI_API_KEY"
)

genai.configure(
    api_key=API_KEY
)

model = genai.GenerativeModel(
    "gemini-1.5-flash"
)

def generate_email(
    purpose,
    details,
    tone
):

    prompt = f"""
You are a professional email writer.

Generate a complete email.

Purpose:
{purpose}

Details:
{details}

Tone:
{tone}

Requirements:

1. Generate subject line.

2. Generate proper greeting.

3. Generate professional body.

4. Generate closing statement.

5. Keep formatting clean.

6. Return only email content.

Example:

Subject: Example Subject

Dear Sir/Madam,

Body...

Regards,
Name
"""

    response = model.generate_content(
        prompt
    )

    return response.text