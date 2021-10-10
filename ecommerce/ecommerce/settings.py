"""
Django settings for ecommerce project.

Generated by 'django-admin startproject' using Django 3.2.4.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os

import dj_database_url 
import django_heroku
from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-yjn14l5tbr$bt^85tc14r*m!ts790on4rr64ui$m+b(ks3@_$n'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['https://tobuycopy-101.herokuapp.com','127.0.0.1:8000','www.bookhouse.store','bookhouse.store']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api.apps.ApiConfig',
    'frontend.apps.FrontendConfig',
    'rest_framework',
    # 'corsheaders',
]
CORS_ORIGIN_WHITELIST = (

    'https://127.0.0.1:8000',
    'https://tobuycopy-101.herokuapp.com/'
    'http://tobuycopy-101.herokuapp.com/'
)
# JWT_AUTH = {
#     'JWT_RESPONSE_PAYLOAD_HANDLER': 'user.utils.my_jwt_response_handler'
# }


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'whitenoise.middleware.WhiteNoiseMiddleware',
]
REST_FRAMEWORK = {
    # Only enable JSON renderer by default.
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
}

ROOT_URLCONF = 'ecommerce.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI_APPLICATION = 'ecommerce.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'media'),
)

MEDIA_ROOT =  os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'


# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field



DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'



STRIPE_PUBLISHABLE_KEY="pk_live_51JQpMJBL4rqcbP3Bb26TMtgyX1ya6yFNxbmml6ZPuWjiWAY9adFlsEat3DAXwXjPBIS5LKoRwBgwiaI7BJIrLnSr00gmozuGVd"
STRIPE_SECRET_KEY="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"


EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'bookhouse356@gmail.com'
EMAIL_HOST_PASSWORD = 'haxasxagsbroetib'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# CORS_ORIGIN_WHITELIST=[
#     'https://tobuycopy-101.herokuapp.com/'
#     'http://tobuycopy-101.herokuapp.com/'
# ]



django_heroku.settings(locals())

# COMPRESS_ENABLED = os.environ.get('COMPRESS_ENABLED', False)
# prod_db = dj_database_url.config(conn_max_age=500)
# DATABASES['default'].update(prod_db)

AWS_ACCESS_KEY_ID = 'AKIAX2Y54V4QN6VSIZ54'
AWS_SECRET_ACCESS_KEY = '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'
AWS_STORAGE_BUCKET_NAME = 'ecommerce-101'
AWS_QUERYSTRING_AUTH = False
AWS_S3_SIGNATURE_VERSION = 's3v4'
AWS_S3_REGION_NAME = 'us-east-2'
AWS_S3_FILE_OVERWRITE = False
AWS_DEFAULT_ACL = None
AWS_S3_VERIFY = True
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage' 

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True


# if os.getcwd()=='/app':
#     SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO','https')
#     SECURE_SSL_REDIRECT = True
#     DEBUG = False

# STATICFILES_STORAGE = 'storages.backends.s3boto3.S3StaticStorage'