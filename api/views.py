from django.db import models
from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

# Create your views here.
class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RetrieveRoomDetails(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
      code = request.GET.get(self.lookup_url_kwarg)
      if code != None:
         room = Room.objects.filter(code=code)
         if len(room) > 0:
            data = RoomSerializer(room[0]).data
            data['is_host'] = self.request.session.session_key == room[0].host
            return Response(data)
         return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)
      return Response({'Bad Request': 'Code paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)
class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    @csrf_exempt
    def post(self, request, format=None):
        # get access to the session id if the user is in the system
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
    # Assign host to a session key
            host = self.request.session.session_key
            # check if the room being created ha s an existing host
            queryset = Room.objects.filter(host=host)
    # check if host session key is available
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                # update field not create a new room, if room exists
                self.request.session['room_code'] = room.code
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            else:
                # create a new room
                room = Room(host=host, guest_can_pause=guest_can_pause,
                            votes_to_skip=votes_to_skip)
                self.request.session['room_code'] = room.code
                room.save()
            # return response if room was created successfully

            return Response(RoomSerializer(room).date, status=status.HTTP_201_CREATED)

class JoinRoom(APIView):
    lookup_url_kwarg = 'code'
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
           self.request.session.create()
        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
          room_result = Room.objects.filter(code=code)
          if len(room_result) > 0:
              room = room_result[0]
              self.request.session['room_code'] = code
              return Response({'message': 'Room Joined'})
          return Response({'message': 'Invalid room code'})
        return Response({'message': 'Invalid romm code key'})

              
class CheckInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
           self.request.session.create()
        data = {
               'code': self.request.session.get('room_code')
           }
        return JsonResponse(data)