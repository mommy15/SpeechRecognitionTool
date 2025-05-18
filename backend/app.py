from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from transcriber import transcribe_audio
from werkzeug.utils import secure_filename
from auth import register_user, login_user
# Set upload folder path relative to backend directory
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'static', 'uploads')

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Get absolute path of currect file directory 
app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Set the maximum file size to 16 MB
@app.route('/upload', methods=['POST'])
def upload_audio():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    # Check if the file is empty
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    # Check if the file is allowed
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    try:
        file.save(filepath)
        print(f"✅ File saved at: {filepath}")

        transcription = transcribe_audio(filepath)
        print(f"✅ Transcription: {transcription}")

        return jsonify({'transcription': transcription})

    except Exception as e:
        print(f"❌ Error during transcription: {e}")
        return jsonify({'error': str(e)}), 500

# Endpoint for user registration  
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    result = register_user(data['email'], data['password'])
    return jsonify(result)

# Endpoint for user Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    result = login_user(data['email'], data['password'])
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)

