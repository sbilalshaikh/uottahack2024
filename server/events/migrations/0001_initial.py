# Generated by Django 5.0.2 on 2024-03-03 08:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EventData',
            fields=[
                ('description', models.TextField(default='')),
                ('e_id', models.AutoField(primary_key=True, serialize=False)),
                ('event_name', models.CharField(default='')),
            ],
        ),
    ]