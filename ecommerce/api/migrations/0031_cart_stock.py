# Generated by Django 3.2.4 on 2021-09-14 14:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0030_product_stock'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='stock',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
