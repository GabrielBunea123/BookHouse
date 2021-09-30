from django.db import models
import string
import random

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=200,default='')
    author = models.CharField(max_length=100,default='')
    description = models.CharField(max_length=10000,default='')
    image = models.FileField(upload_to='images/',default='',blank=True)
    price = models.IntegerField(default=0)
    currency = models.CharField(max_length=5,default='')
    category = models.CharField(max_length=200)
    stock = models.IntegerField(default=0,blank=True,null=True)
    rating = models.IntegerField(default=0,blank=True,null=True)
class ProductImage(models.Model):
    image = models.FileField(upload_to='product_images/',default='',blank=True)
    product_id = models.IntegerField()

class Cart(models.Model):
    name = models.CharField(max_length=200,default='')
    buyer = models.CharField(max_length=100,default='')
    quantity = models.IntegerField(default=1)
    image = models.FileField(upload_to='images/',default='',blank=True)
    price = models.IntegerField(default=0)
    currency = models.CharField(max_length=5,default='')
    product_id = models.IntegerField(default=0)
    stock = models.IntegerField(default=0,blank=True,null=True)
    rating = models.IntegerField(default=0,blank=True,null=True)

class FavouriteProducts(models.Model):
    name = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    description = models.CharField(max_length=10000)
    image = models.FileField(upload_to='images/',default='',blank=True)
    price = models.IntegerField(default=0)
    currency = models.CharField(max_length=5,default='')
    category = models.CharField(max_length=200)
    product_id = models.IntegerField(default=0)
    added_to_favourite = models.BooleanField()
    rating = models.IntegerField(default=0,blank=True,null=True)

class PersonalData(models.Model):
    firstName= models.CharField(max_length=200)
    lastName=models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    street = models.CharField(max_length=200)
    number = models.CharField(max_length=200)
    county = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    buyer_id = models.CharField(max_length=200)
    phone=models.CharField(max_length=200)
    block = models.CharField(max_length=200,null=True,blank=True)
    scara = models.CharField(max_length=200,blank=True,null=True)
    apartment = models.CharField(max_length=200,blank=True,null=True)
    payment_method = models.CharField(max_length=200,blank=True,null=True)
    postal_code = models.CharField(max_length=200,blank=True,null=True)


class Review(models.Model):
    creator = models.CharField(max_length=200)
    rating = models.IntegerField()
    comment = models.CharField(max_length=5000)
    product_id = models.IntegerField(default=0)

class Category(models.Model):
    category = models.CharField(max_length=200)

class Payment(models.Model):
    payment_id= models.CharField(max_length=200)

class BuyNow(models.Model):
    name = models.CharField(max_length=200,default='')
    buyer = models.CharField(max_length=100,default='')
    price = models.IntegerField(default=0)
    currency = models.CharField(max_length=5,default='')

class Searched(models.Model):
    searched = models.CharField(max_length=500)

class Contact(models.Model):
    email = models.CharField(max_length=200)
    body = models.CharField(max_length=50000)