from django.shortcuts import render
from requests.models import Response

# Create your views here.
from .credentials import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from http import HTTPStatus

class Auth_Url(APIView):
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
