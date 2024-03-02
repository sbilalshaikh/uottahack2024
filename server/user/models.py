from django.db import models

class UserData(models.Model):
    name = models.CharField(max_length=100, default="")
    email = models.CharField(max_length=10000, default="")
    
    u_id = models.AutoField(primary_key=True)
    
    def __str__(self):
        return f"{self.name}"