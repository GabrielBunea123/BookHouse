# Generated by Django 3.1.7 on 2021-11-28 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0045_auto_20211013_2126'),
    ]

    operations = [
        migrations.AddField(
            model_name='personaldata',
            name='delivery_method',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]