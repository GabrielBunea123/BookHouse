# Generated by Django 3.2.4 on 2021-08-18 14:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_rename_chart_cart'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image_string',
            field=models.CharField(default='', max_length=1000),
            preserve_default=False,
        ),
    ]
