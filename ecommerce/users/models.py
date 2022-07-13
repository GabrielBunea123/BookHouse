from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)#when the user is deleted, the profile is also deleted
    image = models.FileField(upload_to='profile/', default='', null=True, blank=True)
    description = models.CharField(max_length=500, blank=True, null=True)
    orderedBooks = models.IntegerField(null=True, blank=True)
    bookReviews = models.IntegerField(null=True, blank=True, default=0)


