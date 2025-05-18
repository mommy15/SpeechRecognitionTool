import speech_recognition as sr
import os

# Function to transcribe audio using  Speech Recognition model
def transcribe_audio(file_path):
    recognizer = sr.Recognizer()

    # Check if the file exists
    if not os.path.exists(file_path):
        return "Error: The audio file was not found."

    try:
        # Attempt to load and transcribe the audio file
        with sr.AudioFile(file_path) as source:
            audio = recognizer.record(source)  # Capture the audio data

        # Attempt to recognize the speech using Google API
        try:
            text = recognizer.recognize_google(audio)
            return text
        except sr.UnknownValueError:
            return "Speech was unclear."
        except sr.RequestError as e:
            return f"API unavailable: {e}"
    # Handle specific exceptions for audio processing
    except Exception as e:
        # Log general errors with full exception details
        print(f"❌ Unexpected error while processing {file_path}: {e}")
        return f"An unexpected error occurred while processing the audio file: {e}"
