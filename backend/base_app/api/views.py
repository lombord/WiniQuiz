from rest_framework import generics, permissions


from ..models import User
from . import serializers as S
from .permissions import isNotAuthenticated


class SessionAPIView(generics.RetrieveAPIView):
    serializer_class = S.UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class UsersAPIView(generics.ListAPIView):
    queryset = User.objects.sorted_users()
    serializer_class = S.UserSerializer


class UserEditAPIView(generics.UpdateAPIView):
    serializer_class = S.UserEditSerializer

    def get_object(self):
        return self.request.user


class UserRegisterAPIView(generics.CreateAPIView):
    serializer_class = S.UserRegisterSerializer
    permission_classes = [isNotAuthenticated]
