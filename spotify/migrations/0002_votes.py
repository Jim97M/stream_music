# Generated by Django 3.2.9 on 2022-02-06 17:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_room_current_song'),
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Votes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=50, null=True, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('song_id', models.CharField(max_length=50, null=True, unique=True)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.room')),
            ],
        ),
    ]
