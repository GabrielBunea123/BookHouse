from .views import *
from django.urls import path,re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('generate-token',GenerateToken.as_view()),
    path('register',Register.as_view()),
    path('login',Login.as_view()),
    path('get-user',GetUser.as_view()),
    path('logout',Logout.as_view()),
    path('get-profile', GetProfile.as_view()),
    path('create-profile', CreateProfile.as_view()),
]