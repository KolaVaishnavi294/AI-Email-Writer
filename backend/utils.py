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
        You are a professional corporate email writer.

        Generate a complete email.

        Purpose:
        {purpose}

        Details:
        {details}

        Tone:
        {tone}

        Requirements:

        - Create a professional subject line.
        - Create a proper greeting.
        - Write a clear and professional email body.
        - Add a suitable closing.
        - Do not use placeholders.
        - Return only the final email.
        """
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text