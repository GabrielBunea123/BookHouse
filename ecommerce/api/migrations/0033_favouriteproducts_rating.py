# Generated by Django 3.2.4 on 2021-09-15 14:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_product_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='favouriteproducts',
            name='rating',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
