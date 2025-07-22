from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection, DatabaseError
from django.contrib.auth.hashers import make_password

class UpdateAPIView(APIView):
    def put(self, request):
        current_email = request.data.get('current_email')  # Email to identify the user
        new_username = request.data.get('username')
        new_email = request.data.get('email')
        new_password = request.data.get('password')

        if not current_email or not new_username or not new_email or not new_password:
            return Response({'error': 'Current email, username, email, and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        hashed_password = make_password(new_password)

        try:
            with connection.cursor() as cursor:
                # Check if the new email is already used by another user
                cursor.execute("SELECT email FROM login WHERE email = %s AND email != %s", [new_email, current_email])
                if cursor.fetchone() is not None:
                    return Response({'error': 'Email already in use by another account'}, status=status.HTTP_400_BAD_REQUEST)

                # Update user info
                cursor.execute(
                    "UPDATE login SET username = %s, email = %s, password = %s WHERE email = %s",
                    [new_username, new_email, hashed_password, current_email]
                )
                if cursor.rowcount == 0:
                    return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except DatabaseError as e:
            return Response({'error': 'Database error', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'message': 'Account updated successfully'}, status=status.HTTP_200_OK)