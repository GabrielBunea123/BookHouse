from .views import *
from django.urls import path,re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView


urlpatterns = [
    path('',index),
    path('add-product',index),
    path('product-details/<int:id>',index),
    path('cart',index),
    path('favourite-products/<str:buyer>',index),
    path('checkout/<str:buyer>',index),
    path('fill-in-personal-data',index),
    path('payment-confirmation',index),
    path('payment-confirmation-error',index),
    path('login',index),
    path('signup',index),
    path('ramburs-success',index),
    path('ramburs-error',index),
    path('searched-results',index),
    path('contact-support',index),
    path('confirm-ramburs/<str:buyer_id>',index)

]+ static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)


