from django.shortcuts import render, redirect
from requests.models import Response

# Create your views here.
from .credentials import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from http import HTTPStatus
from .utils import update_create_user_tokens, is_spotify_authenticated
from django.views.decorators.csrf import csrf_protect

# Request authorization of the user via the application 
class AuthURL(APIView):
    def get(self, request, format=None):
      scope = 'user-read-playback-stack, user-modify-playback-state, user-read-currently-playing, playlist-read-collaborative',
      uri = Request('GET', 'https://accounts.spotify.com/authorize', params={
          'scope':scope,
          'response_type': 'code',
          'redirect_url':REDIRECT_URI,
          'client_id':CLIENT_ID,
          'client_secret': CLIENT_SECRET
      }).prepare().url;

      return Response({'uri': uri}, status=HTTPStatus.OK)

    #   Callback to process response from the authorization request

def spotify_callback(request, format=None):
    code = Request.GET.get('code'),
    error = Request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
    'grant_type': 'authorization_url',
    'code': code,
    'redirect_uri': REDIRECT_URI,
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET
      }).json()

    access_token = response.get('access_token')
    refresh_token = response.get('refresh_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    error = response.get('error')
 
    if not request.session.exists(request.session.session_key):
        request.session.create()
    
    update_create_user_tokens(request.session.session_key, access_token, refresh_token, token_type, expires_in)
    return redirect('frontend:')

class IsAuthenticated(APIView):
   def get(self, request, formart=None):
     is_authenticated = is_spotify_authenticated(self.request.session.session_key)
     return Response({"Status": is_authenticated}, status=status.HTTP_200_OK)

