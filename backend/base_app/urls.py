from django.urls import path, include

urlpatterns = [
    path('api/', include('base_app.api.urls')),
]
