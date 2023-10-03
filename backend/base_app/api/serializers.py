import os
from django.http import HttpRequest
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm
from rest_framework import serializers

from ..models import User


class UserSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    rank = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'score', 'correct',
                  'incorrect', 'email', 'url', 'photo',
                  'rank')

    def get_url(self, obj: User):
        request: HttpRequest = self.context.get('request')
        return request.build_absolute_uri(obj.get_absolute_url())

    def get_rank(self, obj: User):
        try:
            return obj.rank
        except:
            return None


class UserEditSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = 'score', 'correct', 'incorrect', 'email', 'photo'

    def validate_photo(self, val):
        photo = self.instance.photo
        name = os.path.basename(photo.name)
        if not name.startswith('default'):
            os.remove(photo.path)
        return val


class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(max_length=128,
                                      label='Confirm Password',
                                      write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {
                'help_text': 'Your password must contain at least 8 characters.',
            }
        }

    def validate_password2(self, value):
        password1 = self.initial_data['password']
        if password1 != value:
            raise serializers.ValidationError("Passwords didn't match!")
        return value

    def validate_password(self, value):
        try:
            validate_password(value)
        except Exception as e:
            raise serializers.ValidationError(e.messages)
        return value

    def create(self, validated_data: dict):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user
