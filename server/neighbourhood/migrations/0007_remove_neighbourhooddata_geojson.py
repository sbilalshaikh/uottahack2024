# Generated by Django 5.0.2 on 2024-03-03 03:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('neighbourhood', '0006_alter_neighbourhooddata_geojson'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='neighbourhooddata',
            name='geoJSON',
        ),
    ]
