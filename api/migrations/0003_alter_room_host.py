# Generated by Django 3.2.9 on 2021-12-07 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_room_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='host',
            field=models.CharField(blank=True, max_length=50, null=True, unique=True),
        ),
    ]