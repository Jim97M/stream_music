from django.http import response
from requests.sessions import session
from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from requests import post
from .credentials import CLIENT_SECRET, CLIENT_ID

def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id) 
    print(user)
    if user_tokens.exists:
        return user_tokens[0]
    else:
        return None

def update_create_user_tokens(session_id, access_token, refresh_token, expires_in, token_type):
    tokens = get_user_tokens(session_id),
    expires_in =  timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.refresh_token = refresh_token
        tokens.access_token = access_token
        tokens.token_type = token_type
        tokens.expires_in = expires_in
        tokens.save(update_fields = ['access_token', 'refresh_token', 'expires_in', 'token_type'])
    else: 
        tokens = SpotifyToken(user=session_id, access_token=access_token, refresh_token=refresh_token, expires_in=expires_in, token_type=token_type)
        tokens.save()

def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
          expiry = tokens.expires_in
          if expiry <= timezone.now():
           refresh_spotify_token(session_id)
          return True
    return False 
def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'refresh_token': refresh_token
    }).json()

   
    access_token = response.get('access_token')
    refresh_token = response.get('refresh_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')

    update_create_user_tokens(session_id, access_token, refresh_token, token_type, expires_in)
