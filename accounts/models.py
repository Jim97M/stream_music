import urllib.request 
import http.cookiejar
from django.db import models
from django.shortcuts import render
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.views.decorators.csrf import csrf_protect
@csrf_protect
class UserAccountManager(BaseUserManager):
    # Create your models here.
    def create_user(self, request, email, password=None, **extra_fields):
        cookiejar = http.cookiejar.CookieJar()
        cookieproc = urllib.request.HTTPCookieProcessor(cookiejar)
        opener = urllib.request.build_opener(cookieproc)
        response = opener.open("http://127.0.0.1:8000/")
        for cookie in cookiejar:
            print(cookie.name, cookie.value)

        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email = email, **extra_fields)
        
        user.set_password(password)
        user.save()
         
        return render(request, "frontend/index.html", user)


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager(urllib.request)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return self.first_name

    def get_first_name(self):
        return self.first_name

    def __str__(self):
        return self.email