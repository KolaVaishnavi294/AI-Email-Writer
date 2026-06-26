from dotenv import load_dotenv
from google import genai
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv(           #gets gemini api key from my system
        "GEMINI_API_KEY"
    )
)


def generate_email_content(
        purpose,
        recipient,
        details,
        tone,
        length):

    if length == "1":
        email_length = "Short"

    elif length == "2":
        email_length = "Medium"

    else:
        email_length = "Detailed"

    prompt = f"""
You are an expert email writer.

Write a realistic email in simple English.

Purpose:
{purpose}

Recipient:
{recipient}

Details:
{details}

Tone:
{tone}

Email Length:
{email_length}

Rules:

- Use simple and natural English.
- Understand who is sending the email and who is receiving it.
- Write a meaningful subject line.
- Never include sender details in the subject.
- Do not invent names, dates, companies, or organizations.
- Do not use placeholders.
- If information is missing, ignore it.
- Write like a real person.
- Return only the final email.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text