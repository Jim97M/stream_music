# Generated by Django 3.2.9 on 2022-01-29 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0002_auto_20220129_0006'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='access_token',
            field=models.CharField(max_length=150),
        ),
    ]
