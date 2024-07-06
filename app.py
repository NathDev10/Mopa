from flask import Flask, request, jsonify, send_file, url_for
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
import os
from flask_cors import CORS
from openai import OpenAI
from pathlib import Path
import io
import time

app = Flask(__name__)
CORS(app)

# Remplacez YOUR_API_KEY par votre propre clé API Mistral et OpenAI
mistral_api_key = os.getenv("YOUR_MISTRAL_API_KEY")
openai_api_key = os.getenv("YOUR_OPENAI_API_KEY")
model = "mistral-large-latest"

@app.route("/")
def home():
    return "Bienvenue sur l'API de génération d'histoires ! Les endpoints disponibles sont /generate et /generate_audio."

password_secret = 'os.getenv("PASSWORD_SECRET")'

@app.route("/check_password", methods=["POST"])
def check_password():
    print("je bouffe")
    data = request.get_json()
    print(data)
    
    password = data.get('password')  # Assurez-vous que le mot de passe est envoyé sous la clé 'password'

    if password == password_secret:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})


@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    print('Données reçues:', data)
    nom = data["nom"]
    description = data["description"]
    lieu = data["lieu"]
    prompt = f"Fais une histoire courte de 100 mots"
    mistral_client = MistralClient(api_key=mistral_api_key)
    messages = [ChatMessage(role="user", content=prompt)]
    response = mistral_client.chat(model=model, messages=messages)
    texte = response.choices[0].message.content
    print('Réponse générée:', texte)
    return jsonify({"texte": texte})

@app.route("/generate_audio", methods=["POST"])
def generate_audio():
    data = request.get_json()
    texte = data.get('texte')
    print('Texte reçu pour génération audio:', texte)

    openai_client = OpenAI(api_key=openai_api_key)
    # Augmentez le timeout pour la requête de génération d'audio
    response = openai_client.audio.speech.create(
        model="tts-1-hd",
        voice="onyx",
        input=texte,
        timeout=300  # Timeout de 5 minutes
    )

    # Supposons que le contenu audio soit retourné dans response.content
    audio_content = response.content

    audio_file = io.BytesIO(audio_content)
    audio_file.seek(0)

    return send_file(audio_file, mimetype='audio/mpeg', as_attachment=True, download_name='generated_audio.mp3')

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)