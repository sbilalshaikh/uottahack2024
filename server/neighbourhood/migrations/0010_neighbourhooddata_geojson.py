# Generated by Django 5.0.2 on 2024-03-03 03:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('neighbourhood', '0009_remove_neighbourhooddata_geojson'),
    ]

    operations = [
        migrations.AddField(
            model_name='neighbourhooddata',
            name='geoJSON',
            field=models.JSONField(default='', verbose_name='geoJSON'),
            preserve_default=False,
        ),
    ]