from flask import Blueprint, request, jsonify
from src.utils.s3_client import upload_video_to_s3
from werkzeug.utils import secure_filename
import uuid

videos_bp = Blueprint('videos', __name__, url_prefix='/api/videos')

@videos_bp.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return jsonify({"error": "No video file provided"}), 400
        
    file = request.files['video']
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    filename = secure_filename(file.filename)
    unique_filename = f"flag-football-reels/{uuid.uuid4().hex}_{filename}"
    
    s3_url = upload_video_to_s3(file, unique_filename)
    
    if s3_url:
        return jsonify({"message": "Upload successful", "url": s3_url}), 201
    
    return jsonify({"error": "S3 upload failed"}), 500