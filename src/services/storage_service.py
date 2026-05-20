import boto3
import os
import uuid
from werkzeug.utils import secure_filename

def get_s3_client():
    return boto3.client(
        's3',
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        region_name=os.getenv('AWS_REGION')
    )

def upload_file_to_s3(file):
    bucket_name = os.getenv('S3_BUCKET_NAME')
    filename = secure_filename(file.filename)
    unique_filename = f"{uuid.uuid4()}_{filename}"
    
    s3_client = get_s3_client()
    s3_client.upload_fileobj(
        file,
        bucket_name,
        unique_filename,
        ExtraArgs={"ContentType": file.content_type}
    )
    
    region = os.getenv('AWS_REGION')
    return f"https://{bucket_name}.s3.{region}.amazonaws.com/{unique_filename}"