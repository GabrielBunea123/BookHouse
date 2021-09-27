from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(Category)
admin.site.register(Payment)
admin.site.register(PersonalData)
admin.site.register(BuyNow)
admin.site.register(FavouriteProducts)
admin.site.register(Review)
admin.site.register(ProductImage)