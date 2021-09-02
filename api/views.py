from django.db import models
from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.
class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    def post(self, request, format=None):
        #get access to the session id if the user is in the system
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
    #Assign host to a session key
            host = self.request.session.session_key
            #check if the room being created ha s an existing host
            queryset = Room.objects.filter(host=host)
    #check if host session key is available
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                #update field not create a new room, if room exists
                room.save(update_fields=['guest_can_pause','votes_to_skip'])
            else:
                #create a new room
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
            #return response if room was created successfully
            
            return Response(RoomSerializer(room).date, status=status.HTTP_201_CREATED)
