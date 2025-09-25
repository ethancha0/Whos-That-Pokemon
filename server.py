from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

# Configure CORS to allow specific origins and handle preflight requests
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000"], 
     allow_headers=["Content-Type"], 
     methods=["GET", "POST", "OPTIONS"])

# database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# model
class UserScore(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    score = db.Column(db.Integer, nullable=False)

    def __init__(self, username, score):
        self.username = username
        self.score = score

@app.route('/submit_scores', methods=['POST', 'OPTIONS'])
def submit_scores():
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        response = jsonify({"message": "OK"})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response
    
    data = request.get_json()
    print("Received:", data) 
    
    if not data or 'username' not in data or 'score' not in data:
        return jsonify({"error": "Missing username or score"}), 400
    
    username = data['username']
    score = data['score']
    
    user = UserScore.query.filter_by(username=username).first()
    if user:
        user.score = score
        print(f"Updated existing user {username} with score {score}")
    else:
        db.session.add(UserScore(username, score))
        print(f"Added new user {username} with score {score}")
    
    db.session.commit()
    response = jsonify({"message": "Scores saved successfully!"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    users = UserScore.query.order_by(UserScore.score.desc()).all()
    results = [{"username": u.username, "score": u.score} for u in users]
    return jsonify(results)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
