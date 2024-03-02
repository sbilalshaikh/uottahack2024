from rest_framework import serializers
from .models import UserData

class User_Data_Serializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        # Add any additional validation or customization if needed
        fields = ['f_name', 'l_name', 'email', 'address', 'password']
    
    def validate_email(self, value):
        """
        Validate that the email is unique.
        """
        if UserData.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email address is already in use.")
        return value

