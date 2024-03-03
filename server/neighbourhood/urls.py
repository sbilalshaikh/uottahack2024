from django.urls import path
from . import views


urlpatterns = [
    path('process_geoJSON/', views.process_geoJSON, name='process_geoJSON'),
    path('hello-world/', views.hello_world, name='hello_world'),
    path('get-community-info/', views.get_community_info, name='get-community-info')
]