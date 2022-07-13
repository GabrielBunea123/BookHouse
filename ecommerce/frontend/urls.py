from .views import *
from django.urls import path,re_path
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('',index),
    path('add-product',index),
    path('product-details/<int:id>',index),
    path('cart',index),
    path('favourite-products/<str:buyer>',index),
    path('checkout/<str:buyer>',index),
    path('profile',index),
    path('fill-in-personal-data',index),
    path('success',index),
    path('error',index),
    path('login',index),
    path('register',index),
    path('searched-results/<str:query>',index),
    path('contact-support',index),

]+ static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)


