# Generated by Django 3.2.4 on 2021-09-02 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_alter_product_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='favouriteproducts',
            name='added_to_favourite',
            field=models.BooleanField(default=False),
        ),
    ]
