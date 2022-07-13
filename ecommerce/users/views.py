from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework import generics,status,permissions
from .models import *
from django.conf import settings
# Create your views here.

from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout

class GenerateToken(APIView):
    def post(self,request):
        for user in User.objects.all():
            Token.objects.get_or_create(user=user)
        return Response({"Ok":"Ok"},status=HTTP_201_CREATED)


#Register
class Register(APIView):
    serializer_class = RegisterSerializer
    def post(self,request,*args,**kwargs):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            Token.objects.get_or_create(user=user)
            return Response(UserSerializer(user).data,status=status.HTTP_201_CREATED)
        return Response({"Bad request":"Something went wrong. Try again."},status=status.HTTP_400_BAD_REQUEST)


#Login
class Login(APIView):
    serializer_class = LoginSerializer
    def post(self,request,*args,**kwargs):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data
            token = Token.objects.get_or_create(user=user)
            login(request,user)
            return Response(TokenSerializer(Token.objects.get(user=user)).data,status=status.HTTP_200_OK)
        return Response({"Not found":"Something went wrong. Try again."},status=status.HTTP_400_BAD_REQUEST)


#Logout
class Logout(APIView):
    serializer_class = LogoutSerializer
    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            logout_user = serializer.data.get("logout_user")
            logout(self.request)

            return Response({"User logged out":logout_user},status=status.HTTP_200_OK)
        return Response({"Bad request":"Something went wrong. Try again."},status=status.HTTP_400_BAD_REQUEST)


#Get user
class GetUser(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class GetProfile(APIView):
    serializer_class = ProfileUserSerializer
    lookup_url_kwarg='user'
    def get(self, request, format=None):
        
        user = User.objects.get(pk=request.GET.get(self.lookup_url_kwarg))
        profile = Profile.objects.filter(user=user)
        if profile.exists():
            data = ProfileSerializer(profile[0]).data
            return Response(data, status=status.HTTP_200_OK)
        else:
            newProfile = Profile(user=user, description='', orderedBooks=0)
            newProfile.save()
            data = ProfileSerializer(newProfile).data
            return Response(data, status=status.HTTP_200_OK)


class CreateProfile(APIView):
    serializer_class = ProfileSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.data.get('user')
            image = serializer.data.get('image')
            description = serializer.data.get('description')
            orderedBooks = serializer.data.get('orderedBooks')

            existingProfile = Profile.objects.filter(user=user)

            if existingProfile.exists():
                return Response(ProfileSerializer(existingProfile[0]).data, status=status.HTTP_201_CREATED)

            newProfile = Profile(user=user, image=image, description=description, orderedBooks=orderedBooks)
            newProfile.save()

            return Response(ProfileSerializer(newProfile).data, status=status.HTTP_201_CREATED)
        return Response({"Bad request":"Something went wrong. Try again."},status=status.HTTP_400_BAD_REQUEST)