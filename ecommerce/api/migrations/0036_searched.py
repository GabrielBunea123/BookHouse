# Generated by Django 3.2.4 on 2021-09-19 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0035_auto_20210915_1752'),
    ]

    operations = [
        migrations.CreateModel(
            name='Searched',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('searched', models.CharField(max_length=500)),
            ],
        ),
    ]
