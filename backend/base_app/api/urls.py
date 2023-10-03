from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from . import views as V

urlpatterns = [
    path('token/', include([
        path('', TokenObtainPairView.as_view(), name='token_obtain'),
        path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
        path('verify/', TokenVerifyView.as_view(), name='token_verify'),
    ])),
    path('session/', include([
        path('', V.SessionAPIView.as_view(), name='session'),
        path('update/', V.UserEditAPIView.as_view(), name='session_update'),
    ])),
    path('users/', include([
        path('', V.UsersAPIView.as_view(), name='users'),
        path('users/<slug:slug>/', V.SessionAPIView.as_view(), name='user'),
    ])),
    path('register/', V.UserRegisterAPIView.as_view(), name='register'),
]
