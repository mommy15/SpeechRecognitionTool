import csv
import os

# Get absolute path of current file directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_DIR = os.path.join(BASE_DIR, 'backend')
CSV_FILE = os.path.join(CSV_DIR, 'users.csv')
CSV_HEADER = ['email', 'password']

# Ensure the CSV directory and file with headers exist
def ensure_csv_file():
    """Ensure the CSV directory and file with headers exist."""
    os.makedirs(CSV_DIR, exist_ok=True)
    try:
        print(f"[INFO] Checking CSV file at: {CSV_FILE}")
        if not os.path.exists(CSV_FILE) or os.stat(CSV_FILE).st_size == 0:
            with open(CSV_FILE, 'w', newline='') as f:
                writer = csv.writer(f)
                writer.writerow(CSV_HEADER)
                print("[INFO] users.csv created with headers.")
    except Exception as e:
        print("[ERROR] Could not create users.csv:", e)

# Function to register a new user
def register_user(email, password):
    ensure_csv_file()

    try:
        with open(CSV_FILE, 'r', newline='') as f:
            reader = csv.reader(f)
            next(reader, None)  # Skip header
            for row in reader:
                if row[0].strip() == email.strip():
                    return {'success': False, 'message': 'User already exists'}
    except Exception as e:
        return {'success': False, 'message': f'Error reading user file: {str(e)}'}

    try:
        with open(CSV_FILE, 'a', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([email.strip(), password.strip()])
        return {'success': True, 'message': 'User registered successfully'}
    except Exception as e:
        return {'success': False, 'message': f'Error saving user: {str(e)}'}

# Function to Login a user 
def login_user(email, password):
    ensure_csv_file()

    try:
        with open(CSV_FILE, 'r', newline='') as f:
            reader = csv.reader(f)
            next(reader, None)  # Skip header
            for row in reader:
                if row[0].strip() == email.strip() and row[1].strip() == password.strip():
                    return {'success': True, 'message': 'Login successful'}
        return {'success': False, 'message': 'Invalid credentials'}
    except Exception as e:
        return {'success': False, 'message': f'Error reading user file: {str(e)}'}




