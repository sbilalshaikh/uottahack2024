from rest_framework import serializers
from .models import EventData

class EventDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventData
        fields = '__all__'