from django.db import models
from django.utils import timezone;
from api.models import Room
class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=500, null=True)
    access_token = models.CharField(max_length=500)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50, null=True)

class Votes(models.Model):
    user = models.CharField(max_length=50, unique=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    song_id = models.CharField(max_length=50, unique=True, null=True) 
    room = models.ForeignKey(Room, on_delete=models.CASCADE, )