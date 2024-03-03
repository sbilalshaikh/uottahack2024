from django.db import models
import datetime
# Create your models here.
class EventData(models.Model):
    description = models.TextField(default="")
    e_id = models.AutoField(primary_key=True)
    event_name = models.CharField(default="")
    pics = models.ImageField(upload_to="events")
    event_location = models.CharField(default="")
    date = models.DateField(default=datetime.date.today)
    
    def __str__(self):
        return f"{self.event_name}"
    