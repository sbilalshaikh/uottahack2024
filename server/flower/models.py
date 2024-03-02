from django.db import models

# Create your models here.
class FlowerData(models.Model):
    name = models.CharField(max_length=100, default="")
    #picture = models
    f_id = models.AutoField(primary_key=True)

