from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..user.models import UserData
from rest_framework import status

@api_view(['POST'])
def add_flower():
    #add a flower
    
    #make API call to the flower key 