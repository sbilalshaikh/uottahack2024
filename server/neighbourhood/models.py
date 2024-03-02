from django.db import models
from flower.models import FlowerData
from user.models import UserData

class NeighbourhoodData(models.Model):
    greenScore = models.IntegerField(default=0)
    name = models.CharField(default="")
    n_id = models.AutoField(primary_key=True)

class CommunityMember(models.Model):
    member_to_neighbourhood_fk = models.ForeignKey(UserData, max_length=1000, to_field='u_id', on_delete=models.CASCADE)
    neighbourhood_to_member_fk = models.ForeignKey(NeighbourhoodData, to_field='n_id', on_delete=models.CASCADE)

class FlowerInNeighbourhood(models.Model):
    flower_to_neighbourhood_fk = models.ForeignKey(FlowerData, max_length=1000, to_field='f_id', on_delete=models.CASCADE)
    neighbourhood_to_flower_fk = models.ForeignKey(NeighbourhoodData, max_length=1000, to_field='n_id', on_delete=models.CASCADE)



