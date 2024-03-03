# Generated by Django 5.0.2 on 2024-03-03 02:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('neighbourhood', '0004_rename_name_neighbourhooddata_neighbourhood_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='neighbourhooddata',
            old_name='greenScore',
            new_name='ndvi',
        ),
        migrations.AddField(
            model_name='neighbourhooddata',
            name='color',
            field=models.CharField(default='#FFFFFF'),
        ),
        migrations.AddField(
            model_name='neighbourhooddata',
            name='geoJSON',
            field=models.JSONField(default=''),
            preserve_default=False,
        ),
    ]
