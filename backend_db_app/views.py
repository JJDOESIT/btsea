from django.shortcuts import render
from django.http.response import HttpResponseRedirect
from django.contrib.auth.tokens import default_token_generator
from .models import CustomUser
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.decorators import login_required

BASE_URL='https://jamesgwhit.pythonanywhere.com/'

# Non-auth view
def index(request, token=None, uid=None):
    return render(request, "index.html")


# Deciphers the url, looking for a token and uid, then verifies that it's valid
def verify(request, token, uid):
    try:
        pk = urlsafe_base64_decode(uid)
    except:
        return HttpResponseRedirect(BASE_URL)
    user = CustomUser.objects.get(pk=pk)
    token_generator = default_token_generator
    if token_generator.check_token(user, token):
        user.is_active = 1
        user.save()
    return HttpResponseRedirect(BASE_URL)


# Checks that the user is logged in and active
@login_required(login_url=BASE_URL + "login/")
def auth_user_check_active(request):
    if request.user.is_active:
        return render(request, "index.html")
    else:
        return HttpResponseRedirect(BASE_URL + "verify-email/")


# Chekcs that the user is logged in, but not active
@login_required(login_url=BASE_URL + "login/")
def auth_user(request):
    return render(request, "index.html")


# Handles 404 error
def handle404(request, exception=None):
    return HttpResponseRedirect(BASE_URL+'not-found/')
