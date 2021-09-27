from .views import *
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('home',GetProducts.as_view()),
    path('add-product',AddProduct.as_view()),
    path('product-details',ProductDetails.as_view()),
    path("product-details-image",ProductDetailsImage.as_view()),
    path("product-details-category",ProductDetailsCategory.as_view()),
    path('cart',AddToCart.as_view()),
    path('get-cart',GetCart.as_view()),
    path('delete-from-cart',DeleteFromCart.as_view()),
    path('change-cart-quantity',CartQuantity.as_view()),
    path('category',GetCategories.as_view()),
    path('fill-in-personal-data',PersonalDataView.as_view()),
    path('checkout',PaymentHandleView.as_view()),
    path('add-to-favourite',AddToFavouriteView.as_view()),
    path('favourite-products',GetFavouriteProducts.as_view()),
    path('delete-favourite',DeleteFavourite.as_view()),
    path('add-review',AddReview.as_view()),
    path('get-reviews',GetReviews.as_view()),
    path('check-for-fav',ProductDetailsFavouriteProduct.as_view()),
    path('searched-results',SearchedResults.as_view()),
    path('token-auth/', obtain_jwt_token),
    path("contact",Contact.as_view()),
    path('confirm-ramburs',ConfirmRamburs.as_view()),
    

    
]+ static(settings.MEDIA_URL,
                document_root=settings.MEDIA_ROOT)
