# AI-Powered Email Writer

## Project Overview

AI-Powered Email Writer is a Generative AI-based web application that helps users create professional emails based on their purpose, key details, and preferred tone.

The application generates a complete email including a subject line and email body, making communication faster, easier, and more professional.

---

## Objective

The main objectives of this project are:

* Understand Generative AI applications in communication.
* Learn prompt engineering techniques.
* Build a full-stack AI application.
* Generate emails with different tones and purposes.
* Gain practical experience with AI API integration.

---

## Architecture
```text
User
 ↓
Frontend (HTML/CSS/JS)
 ↓
Fetch API
 ↓
Flask Backend
 ↓
Gemini API
 ↓
Generated Email
 ↓
Frontend Display
```

---

## Features

### Input Handling

* Enter email purpose.
* Enter key details.
* Select email tone.

### AI Email Generation

* Generate professional email subject.
* Generate complete email body.
* Customize output based on selected tone.

### Output Handling

* Display generated email.
* Copy generated email to clipboard.
* Download generated email as a text file.
* Clear form inputs.
* Character counter for user input.

---

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Python
* Flask

### AI Integration

* Google Gemini API

### Version Control

* Git
* GitHub

---

## Project Structure

```text
ai-email-writer/

├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
│
├── backend/
│   ├── app.py
│   ├── routes.py
│   └── utils.py
│
├── requirements.txt
├── .env
├── .gitignore
└── README.md
```

---

## Application Flow

1. User enters email purpose, details and selects email tone.
3. Frontend sends data to backend using Fetch API.
4. Backend processes the request using Flask.
5. Backend sends a prompt to Google Gemini API.
6. Gemini generates email content.
7. Generated email is returned to the frontend.
8. User can copy or download the generated email.

---

## Future Enhancements

* Email templates
* Multi-language support
* Email history
* PDF export functionality
* Email draft management

---

## Developer

Vaishnavi Kola

AI-Powered Email Writer using HTML, CSS, JavaScript, Flask, Python, and Google Gemini API.
