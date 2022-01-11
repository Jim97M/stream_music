from django.urls import path
from .views import Auth_Url

urlpatterns = [
    path('get-spotify-auth', Auth_Url.as_view()),
]
