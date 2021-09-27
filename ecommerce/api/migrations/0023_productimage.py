# Generated by Django 3.2.4 on 2021-08-31 20:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_auto_20210831_2258'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.FileField(blank=True, default='', upload_to='images/')),
                ('product_id', models.IntegerField()),
            ],
        ),
    ]
