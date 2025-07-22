from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection, DatabaseError
from django.contrib.auth.hashers import check_password

class LoginAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT password FROM login WHERE email = %s", [email])
                row = cursor.fetchone()
                if row is None:
                    return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
                hashed_password = row[0]
                if not check_password(password, hashed_password):
                    return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
        except DatabaseError as e:
            return Response({'error': 'Database error', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)