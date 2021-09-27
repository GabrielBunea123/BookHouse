from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','name','description','price','currency','image','category','stock','rating')
        depth=1
class GetProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','name','author','image','description','price','currency','category','stock','rating')
class ProductDetailsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=['category']
        depth = 1
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields="__all__"
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
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Payment
        fields="__all__"
        depth=1

class BuyNowSerializer(serializers.ModelSerializer):
    class Meta:
        model=BuyNow
        fields="__all__"

class PersonalDataSerializer(serializers.ModelSerializer):
    class Meta:
        model=PersonalData
        fields=("firstName","lastName","email",'street','number','county','city','phone','block','scara','apartment','payment_method','postal_code')
        depth=1

class AddToFavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteProducts
        fields = ('id','name','description','price','currency','image','category','product_id','author',"added_to_favourite",'rating')
        depth=1

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
