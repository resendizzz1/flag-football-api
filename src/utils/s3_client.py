import boto3
import os

def upload_video_to_s3(file_obj, object_name):
    s3_client = boto3.client(
        's3',
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        region_name=os.getenv('AWS_REGION', 'us-east-1')
    )
    
    bucket_name = os.getenv('S3_BUCKET_NAME')
    
    try:
        s3_client.upload_fileobj(
            file_obj,
            bucket_name,
            object_name,
            ExtraArgs={'ContentType': 'video/mp4'}
        )
        return f"https://{bucket_name}.s3.{os.getenv('AWS_REGION', 'us-east-1')}.amazonaws.com/{object_name}"
    except Exception as e:
        print(f"S3 Upload Error: {e}")
        return None