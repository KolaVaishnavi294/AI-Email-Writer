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
        You are an expert email writer.

        Write a realistic email in simple English.

        Purpose:
        {purpose}

        Details:
        {details}

        Tone:
        {tone}

        Rules:

        - Use simple and natural English.
        - Understand who is sending the email and who is receiving it from the details.
        - The subject should only describe the purpose of the email.
        - Never include sender information in the subject.
        - Do not invent names, dates, roles, or organizations.
        - Do not use placeholders.
        - If information is missing, do not mention it.
        - Write like a real person, not like an AI assistant.
        - Return only the email.
        """
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text