from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','name','description','price','currency','image','category','stock','rating','regislat')
        depth=1
class GetProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','name','author','image','description','price','currency','category','stock','rating','regislat')
class ProductDetailsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=['category']
        depth = 1
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
        fields=('name','buyer','quantity','image','price','currency',"product_id",'stock','rating')
        depth=1
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields='__all__'
        depth=1
class PaymentSerializer(serializers.Serializer):
    payment_id = serializers.CharField()
    user = serializers.CharField()

class BuyNowSerializer(serializers.ModelSerializer):
    class Meta:
        model=BuyNow
        fields="__all__"

class PersonalDataSerializer(serializers.ModelSerializer):
    class Meta:
        model=Orders
        fields=("firstName","lastName","email",'address','county','city','phone','block','scara','apartment','payment_method','delivery_method','postal_code','buyer_id')
        depth=1

class AddToFavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteProducts
        fields = ('id','name','description','price','currency','image','category','product_id','rating', 'author')
        depth=1

class FavouriteUserSerializer(serializers.Serializer):
    author = serializers.CharField()
    product_id=serializers.IntegerField()

class GetFavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model=FavouriteProducts
        fields="__all__"
        depth=1

class DeleteFavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model=FavouriteProducts
        fields=("product_id",'author')
        depth=1

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields="__all__"
        depth=1
        many=True

class SearchedSerializer(serializers.ModelSerializer):
    class Meta:
        model=Searched
        fields="__all__"
        depth=1

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields="__all__"
        depth = 1
