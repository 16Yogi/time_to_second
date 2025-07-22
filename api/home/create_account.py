from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection, DatabaseError
from django.contrib.auth.hashers import make_password

class RegisterAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        # print(f"username:{username} : email : {email} : password {password}")  # Remove in production
        if not username or not email or not password:
            return Response({'error': 'Username, email, and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        hashed_password = make_password(password)

        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT email FROM login WHERE email = %s", [email])
                if cursor.fetchone() is not None:
                    return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

                cursor.execute(
                    "INSERT INTO login (username, email, password) VALUES (%s, %s, %s)",
                    [username, email, hashed_password]
                )
        except DatabaseError as e:
            return Response({'error': 'Database error', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'message': 'Account created successfully'}, status=status.HTTP_201_CREATED)