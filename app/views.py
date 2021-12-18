from django.http.response import HttpResponse
import json
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.exceptions import ImproperlyConfigured
from django.utils.datastructures import MultiValueDictKeyError


# Create your views here.
def index(request):
    if request.user.is_authenticated:
        return render(request, "app/index.html")
    else:
        return render(request, "app/home_page.html")


def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        if not username:
            messages.error(request, "All fields are required")
            return HttpResponseRedirect(reverse('login'))
        password = request.POST["password"]
        if not password:
            messages.error(request, "All fields are required")
            return HttpResponseRedirect(reverse('login'))
        user = authenticate(request, username=username, password=password)
        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            messages.error(request, "username or password are wrong")
            return HttpResponseRedirect(reverse('login'))
    else:
        return render(request, "app/login.html")
    


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        if not username:
            messages.error(request, "All fields are required")
            return HttpResponseRedirect(reverse('register'))
        email = request.POST["email"]
        if not email:
            messages.error(request, "All fields are required")
            return HttpResponseRedirect(reverse('register'))
        # Ensure password matches confirmation
        password = request.POST["password"]
        if not password:
            messages.error(request, "All fields are required")
            return HttpResponseRedirect(reverse('register'))
        confirmation = request.POST["confirmation"]
        if not confirmation:
            messages.error(request, "All fields are required")
            return HttpResponseRedirect(reverse('register'))
        if password != confirmation:
            messages.error(request, "password must be equal the confirmation")
            return HttpResponseRedirect(reverse('register'))
        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            messages.error(request, "username already exists")
            return HttpResponseRedirect(reverse('register'))
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "app/register.html")


@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def standings(request):
    return render(request, "app/standings.html")


def team(request, id):
    return render(request, "app/team.html", {
        "id": id
    })