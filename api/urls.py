from django.urls import path
from .views import RoomView, CreateRoomView, RetrieveRoomDetails, JoinRoom, CheckInRoom
  
urlpatterns = [
      path('room',RoomView.as_view()),
      path('create-room', CreateRoomView.as_view()),
      path('get-room', RetrieveRoomDetails.as_view()),
      path('join-room', JoinRoom.as_view()),
      path('check-in-room', CheckInRoom.as_view())
]
