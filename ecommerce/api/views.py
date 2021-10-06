from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework import generics,status
from .models import *
import json
import stripe
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.permissions import  IsAdminUser
# from django.core.validators import validate_email
# from validate_email import validate_email

# Create your views here.

class GetProducts(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = GetProductSerializer

class GetCategories(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class AddProduct(APIView):
    serializer_class = ProductSerializer

    def post(self, request, format=None,*args, **kwargs):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            description = serializer.data.get('description')
            price = serializer.data.get('price')
            image = request.FILES.getlist("image")
            product_images = image
            currency = serializer.data.get('currency')
            category = serializer.data.get('category')
            stock = serializer.data.get('stock')
            author = self.request.session.session_key


            product = Product(name=name, author=author,stock=stock,image=image[0],
                    description=description,price=price,currency=currency,category=category)
            product.save()
            ProductImage.objects.create(product_id=product.id,image=product.image)
            
            return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetails(APIView):
    serializer_class = GetProductSerializer
    lookup_url_kwarg = 'id'
    
    def get(self,request,format=None):
        product_id = request.GET.get(self.lookup_url_kwarg)#GET CODE FROM URL
        if product_id !=None:
            product = Product.objects.filter(id = product_id)
            if len(product)>0:
                data = GetProductSerializer(product[0]).data #SEND THE INFO ABOUT THE ROOM TO FRONTEND

                return Response(data, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'No room has this code'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class ProductDetailsCategory(APIView):#get items with the same category
    serializer_class = GetProductSerializer
    lookup_url_kwarg ='category'
    def get(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        product_category = request.GET.get(self.lookup_url_kwarg)
        products = Product.objects.filter(category=product_category)
        if products.exists():
            data = GetProductSerializer(products,many = True).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Not found': 'No products found'}, status=status.HTTP_404_NOT_FOUND)


class ProductDetailsFavouriteProduct(APIView): #if the product is added to favourite or not
    serializer_class = AddToFavouriteSerializer
    lookup_url_kwarg ='id'
    def get(self,request,*args, **kwargs):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        product_id = request.GET.get(self.lookup_url_kwarg)
        buyer = self.request.session.session_key
        fav_product = FavouriteProducts.objects.filter(author=buyer,product_id=product_id)
        if fav_product.exists():
             data = AddToFavouriteSerializer(fav_product[0]).data
             return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailsImage(APIView):
    serializer_class = ProductImageSerializer
    lookup_url_kwarg = 'id'
    def get(self,request):
        product_id = request.GET.get(self.lookup_url_kwarg)
        if product_id!=None:
            product_image = ProductImage.objects.filter(product_id = product_id)
            if product_image.exists():
                data = ProductImageSerializer(product_image,many = True).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({"Not found":'The images were not found'},status =status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class AddToCart(APIView):
    serializer_class = CartSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            price = serializer.data.get('price')
            currency = serializer.data.get('currency')
            rating = serializer.data.get('rating')
            buyer = self.request.session.session_key
            quantity = serializer.data.get('quantity')
            product_id = serializer.data.get('product_id')
            stock = serializer.data.get('stock')
            product = Cart(name=name, buyer=buyer,stock = stock,rating=rating,
                        quantity=quantity,price=price,currency=currency,image='',product_id=product_id)
            product.save()
            return Response(CartSerializer(product).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class AddToFavouriteView(APIView):
    serializer_class = AddToFavouriteSerializer

    def post(self, request, format=None,*args, **kwargs):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            product_id = serializer.data.get('product_id')
            name = serializer.data.get('name')
            description = serializer.data.get('description')
            price = serializer.data.get('price')
            image = Product.objects.get(id = product_id).image
            currency = serializer.data.get('currency')
            stock = serializer.data.get('stock')
            category = serializer.data.get('category')
            rating=serializer.data.get('rating')
            author = self.request.session.session_key
            added_to_favourite = serializer.data.get('added_to_favourite')
            product = FavouriteProducts(name=name, author=author,rating=rating,
                        description=description,price=price,currency=currency,image=image,category = category,product_id=product_id,added_to_favourite=added_to_favourite)
            product.save()
            return Response(AddToFavouriteSerializer(product).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetFavouriteProducts(APIView):
    serializer_class = GetFavouriteSerializer
    lookup_url_kwarg='buyer'
    def get(self,request):
        buyer = self.request.session.session_key
        print(buyer)
        if buyer!=None:
            favourite_products = FavouriteProducts.objects.filter(author=buyer)
            if favourite_products.exists():
                data = GetFavouriteSerializer(favourite_products,many = True).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Not found': 'No products found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class DeleteFavourite(APIView):
    serializer_class = DeleteFavouriteSerializer
    def post(self,request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            author = serializer.data.get("author")
            product_id = serializer.data.get("product_id")
            print(product_id)

            fav_product = FavouriteProducts.objects.filter(product_id=product_id,author=author)
            fav_product.delete()

            return Response({'Object':"Deleted"},status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class BuyNowView(APIView):
    serializer_class =CartSerializer 
    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            price = serializer.data.get('price')
            buyer = self.request.session.session_key
            currency = serializer.data.get('currency')

            product = Cart(name=name,price=price,buyer=buyer,currency=currency)
            product.save()
            return Response(BuyNowSerializer(product).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class CartQuantity(APIView):
    serializer_class = CartSerializer
    def post(self,request,format = None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            quantity = serializer.data.get('quantity')
            buyer = self.request.session.session_key
            product_id = serializer.data.get('product_id')
            cart = Cart.objects.get(buyer = buyer,product_id=product_id)
            product = Product.objects.get(id = product_id)
            if quantity >0:
                cart.quantity = quantity
                cart.price=product.price*quantity
            
                cart.save(update_fields=['quantity','price'])
            queryset = Cart.objects.filter(buyer=buyer)
            data = CartSerializer(queryset,many = True).data

            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
        


class GetCart(APIView):
    serializer_class = CartSerializer

    def get(self,request):
        buyer = self.request.session.session_key
        queryset = Cart.objects.filter(buyer=buyer)
        
        if queryset.exists():
            data = CartSerializer(queryset,many = True).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class DeleteFromCart(APIView):
    serializer_class = CartSerializer
    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            product_id = serializer.data.get('product_id')
            product = Cart.objects.filter(product_id=product_id)
            product.delete()
            return Response({"Deleted":"The item was deleted"}, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class SearchedResults(APIView):
    serializer_class = SearchedSerializer
    lookup_url_kwarg ='searched'
    def get(self,request,format=None):
        serializer = self.serializer_class(data=request.data)
        category = request.GET.get(self.lookup_url_kwarg)
        queryset = Product.objects.filter(category__icontains=category)
        if queryset.exists():
            data = ProductSerializer(queryset,many = True).data
            return Response(data, status=status.HTTP_200_OK)
        else:
            queryset = Product.objects.all()
            for i in queryset:
                if str(category.lower()) == str(i.name.lower()) or str(category.lower()) in str(i.name.lower()):
                    queryset = Product.objects.filter(name__icontains=category)
                    data = ProductSerializer(queryset,many = True).data
                    return Response(data, status=status.HTTP_200_OK)
                elif str(category.lower()) == str(i.description.lower()) or str(category.lower()) in str(i.description.lower()):
                    queryset = Product.objects.filter(description__icontains = category)
                    data = ProductSerializer(queryset,many = True).data
                    return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'No object has this category'}, status=status.HTTP_404_NOT_FOUND)
        print(serializer.errors)

class PaymentHandleView(APIView):

    serializer_class=PaymentSerializer

    def post(self,request,format=None):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        serializer=self.serializer_class(data=request.data)
        buyer = self.request.session.session_key
        if serializer.is_valid():
            price=0
            payment_id= serializer.data.get('payment_id')
            cart = Cart.objects.filter(buyer = buyer)
            personalData = PersonalData.objects.get(buyer_id=buyer)
            for i in cart:
                price+=i.price
                product = Product.objects.get(id = i.product_id)
                product.stock-=i.quantity
                product.save()
            try:
                if cart!=None:
                    paymentIntent = stripe.PaymentIntent.create(
                        amount=price*100+1500,
                        currency="RON",
                    )
                    table=''
                    for item in cart:
                        str2=f'Id: {item.product_id}\nNume: {item.name}\nCantitate: {item.quantity}\n\n'
                        table=table+str2
                    #id nume cantitate 
                    body=f"""{personalData.firstName} {personalData.lastName}, tranzacția ta a fost acceptata.

Produsul/Produsele cu:

{table}

va/vor fi livrat/e în Romania la adresa:
Județ: {personalData.county} 
Oras: {personalData.city} 
Cod postal: {personalData.postal_code}
Strada: {personalData.street} 
Număr: {personalData.number} 
Bloc: {personalData.block}
Scara: {personalData.scara} 
Apartament: {personalData.apartment}.




Număr contact: {personalData.phone}.
Tip plata: {personalData.payment_method}.

Mulțumim pentru că ai ales serviciile noastre."""
                        
                    send_mail(
                    'Confirmare plata',
                    body,
                    settings.EMAIL_HOST_USER,
                    [f'{personalData.email}','gabriel.bunea1@yahoo.com'],
                    fail_silently=False,
                    )
                    cart.delete()
                    return Response(paymentIntent, status=status.HTTP_200_OK)
            except:
                return Response({"Bas Request":"Error occured"},status=status.HTTP_400_BAD_REQUEST)
            return Response({"Bad request":"No items to pay"},status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PersonalDataView(APIView):
    serializer_class = PersonalDataSerializer
    def post(self,request,format=None):
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            firstName= serializer.data.get('firstName')
            lastName= serializer.data.get('lastName')
            email= serializer.data.get('email')
            street= serializer.data.get('street')
            number= serializer.data.get('number')
            county= serializer.data.get('county')
            city= serializer.data.get('city')
            phone = serializer.data.get('phone')
            block= serializer.data.get('block')
            scara = serializer.data.get('scara')
            apartment = serializer.data.get('apartment')
            payment_method= serializer.data.get('payment_method')
            postal_code= serializer.data.get('postal_code')


            personalDataAll = PersonalData.objects.all()
            buyer_id = self.request.session.session_key

            for i in personalDataAll:
                if buyer_id==i.buyer_id:
                    i.delete()      
            personalData = PersonalData(postal_code=postal_code,firstName=firstName,lastName=lastName,email=email,phone=phone,
            street=street,number=number,county=county,city=city,buyer_id=buyer_id,block=block,scara=scara,apartment=apartment,payment_method=payment_method)

            personalData.save()
            return Response({"ok":"ok"}, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ConfirmRamburs(APIView):
    serializer_class = PersonalDataSerializer
    def get(self,request):
        # serializer = self.serializer_class(data = request.data)
        # if serializer.is_valid():
            
        personalDataAll = PersonalData.objects.all()
        buyer_id = self.request.session.session_key
        personalData = PersonalData.objects.get(buyer_id=buyer_id)

        cart = Cart.objects.filter(buyer = buyer_id)
        if personalData:
            for i in cart:
                product = Product.objects.get(id = i.product_id)
                product.stock-=i.quantity
                product.save()


                table=''
                for item in cart:
                    str2=f'Id: {item.product_id}\nNume: {item.name}\nCantitate: {item.quantity}\n\n'
                    table=table+str2
                # pass
                body = f'''{personalData.firstName} {personalData.lastName}, comanda ta a fost plasata cu succces.

Produsul/e cu:

{table}

va/vor fi livrat/e în Romania la adresa:
Județ: {personalData.county}
Oras: {personalData.city} 
Cod postal:{personalData.postal_code}
Strada: {personalData.street}
Număr: {personalData.number}
Bloc: {personalData.block} 
Scara: {personalData.scara}
Apartament: {personalData.apartment}.




Număr contact: {personalData.phone}.
Tip plata: {personalData.payment_method}.

Mulțumim pentru că ai ales serviciile noastre.
'''
                send_mail(
                'Confiramre Livrare',
                    body,
                settings.EMAIL_HOST_USER,
                [f'{personalData.email}','gabriel.bunea1@yahoo.com'],
                fail_silently=False,
                )

                cart.delete()
            return Response({"ok":"ok"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            
class AddReview(APIView):
    serializer_class = ReviewSerializer

    def post(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            creator = self.request.session.session_key
            rating = serializer.data.get('rating')
            comment = serializer.data.get('comment')
            product_id = serializer.data.get('product_id')

            product = Product.objects.get(id = product_id)
            if product.rating!=0:
                product.rating = (product.rating+rating)/2
            else:
                product.rating = rating
            product.save()
            
            create_review = Review(creator = creator,rating=rating,comment=comment,product_id=product_id)
            create_review.save()
            return Response(ReviewSerializer(create_review).data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class GetReviews(APIView):
    serializer_class = ReviewSerializer
    lookup_url_kwarg='product_id'
    def get(self, request):
        product_id = request.GET.get(self.lookup_url_kwarg)
        if product_id!=None:
            reviews=Review.objects.filter(product_id=product_id)
        else:
            reviews = Review.objects.all()
        if reviews.exists():
            data = ReviewSerializer(reviews,many = True).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class GetAverageRating(APIView):
    serializer_class = ReviewSerializer
    lookup_url_kwarg='product_id'
    def get(self, request):
        product_id = request.GET.get(self.lookup_url_kwarg)
        if product_id!=None:
            reviews=Review.objects.filter(product_id=product_id)
        else:
            reviews = Review.objects.all()
        if reviews.exists():
            data = ReviewSerializer(reviews,many = True).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class Contact(APIView):
    serializer_class= ContactSerializer
    def post(self,request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            email = serializer.data.get('email')
            body = serializer.data.get('body')

            send_mail(
            'Feedback mail',
            f'{email}\n\n\n {body}',
            settings.EMAIL_HOST_USER,
            [f'gabriel.bunea1@yahoo.com'],
            fail_silently=False,
            )
            return Response({'OK':"200"},status = status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

    





            









