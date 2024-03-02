import jwt, os, datetime
def get_access_token(email):
        return jwt.encode({
                'user_id': email,
                'exp': datetime.datetime.now() + datetime.timedelta(minutes=2),
                'iat': datetime.datetime.now()
            }, os.getenv('SECRET_KEY'), algorithm='HS256')   