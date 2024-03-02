from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import User_Data_Serializer
from .models import UserData
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password
from . auth import get_access_token
from django.contrib.auth.hashers import check_password

# Create your views here.

@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world'})


@api_view(['POST'])
def login(request):
    email = request.data.get('email', None)
    password = request.data.get('password', None)

    if not email or not password:
        return Response({'error': 'Both email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = UserData.objects.get(email=email)
    except UserData.DoesNotExist:
        return Response({'error': 'No user found with the provided email.'}, status=status.HTTP_404_NOT_FOUND)
    
    if not check_password(password, user.password):
        return Response({'error': 'No user found with the provided email.'}, status=status.HTTP_404_NOT_FOUND)
    
    access_token = get_access_token(user.email)
    
    response_data = {
                'access_token': access_token,
                'message': 'Successfully Logged In!',
    }
    
    return Response(response_data, status=status.HTTP_201_CREATED)

    


@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        serializer = User_Data_Serializer(data=request.data)
        if serializer.is_valid():
            # Hash the password before saving
            hashed_password = make_password(serializer.validated_data['password'])

            user = UserData(
                f_name=serializer.validated_data['f_name'],
                l_name=serializer.validated_data['l_name'],
                address=serializer.validated_data['address'],
                email=serializer.validated_data['email'],
                password=hashed_password
            )
            user.save()
            
            # Generate access token
            access_token = get_access_token(user.email)

            # Customize the response data as needed
            response_data = {
                'access_token': access_token,
                'message': 'User registered successfully.',
            }
        
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

         
