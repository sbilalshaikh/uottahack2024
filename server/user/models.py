from django.db import models

class UserData(models.Model):
    f_name = models.CharField(max_length=100, default="")
    l_name = models.CharField(max_length=100, default="")
    
    password = models.CharField(max_length=100, default="****")
    
    email = models.CharField(max_length=10000, default="", unique=True)
    
    address = models.CharField(max_length=1000, default="")
    
    u_id = models.AutoField(primary_key=True)
    
    def __str__(self):
        return f"{self.f_name} {self.l_name}: {self.email}"