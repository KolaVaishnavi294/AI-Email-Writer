import os
from dotenv import load_dotenv
from google import genai

# Load environment variables from your .env file
load_dotenv() 
# Ensure your key in .env is named GEMINI_API_KEY
# The client automatically picks it up from the environment

client = genai.Client()

topic = input("Enter the topic: ")
tone = input("Enter tone: ")

# Correct Google GenAI SDK syntax
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=f"Write a {tone} email for this topic: {topic}"
)

print("\nGenerated Email:\n")
# Correct way to print the response text
print(response.text)