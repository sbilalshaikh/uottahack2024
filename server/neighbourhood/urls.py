from django.urls import path
from . import views


urlpatterns = [
    path('process_geoJSON/', views.process_geoJSON, name='process_geoJSON'),
]