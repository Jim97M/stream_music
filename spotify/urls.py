from django.urls import path
from .views import Auth_Url, spotify_callback, IsAuthenticated

urlpatterns = [
    path('get-spotify-auth', Auth_Url.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
]
