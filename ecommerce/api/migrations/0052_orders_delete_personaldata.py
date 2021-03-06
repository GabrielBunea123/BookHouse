# Generated by Django 4.0.4 on 2022-07-13 07:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0051_alter_favouriteproducts_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Orders',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(max_length=200)),
                ('lastName', models.CharField(max_length=200)),
                ('email', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=200)),
                ('county', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
                ('buyer_id', models.CharField(max_length=200)),
                ('phone', models.CharField(max_length=200)),
                ('block', models.CharField(blank=True, max_length=200, null=True)),
                ('scara', models.CharField(blank=True, max_length=200, null=True)),
                ('apartment', models.CharField(blank=True, max_length=200, null=True)),
                ('payment_method', models.CharField(blank=True, max_length=200, null=True)),
                ('delivery_method', models.CharField(blank=True, max_length=200, null=True)),
                ('postal_code', models.CharField(blank=True, max_length=200, null=True)),
                ('product_name', models.CharField(blank=True, default='', max_length=200, null=True)),
                ('product_id', models.IntegerField(default=0)),
            ],
        ),
        migrations.DeleteModel(
            name='PersonalData',
        ),
    ]
