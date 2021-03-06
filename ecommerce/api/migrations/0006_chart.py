# Generated by Django 3.2.4 on 2021-08-17 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_product_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=200)),
                ('buyer', models.CharField(default='', max_length=100)),
                ('quantity', models.IntegerField(default=0)),
                ('image', models.ImageField(blank=True, default='', upload_to='images/')),
                ('price', models.IntegerField(default=0)),
                ('currency', models.CharField(default='', max_length=5)),
            ],
        ),
    ]
