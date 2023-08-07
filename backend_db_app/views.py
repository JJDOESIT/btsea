from django.shortcuts import render
from django.http.response import HttpResponseRedirect
from django.contrib.auth.tokens import default_token_generator
from .models import CustomUser
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.decorators import login_required

def index(request,token=None,uid=None):
    return render(request,'index.html')

def verify(request,token,uid):
    try:
        pk=urlsafe_base64_decode(uid)
    except:
         raise Exception('PK Error')
    user=CustomUser.objects.get(pk=pk)
    print(user)
    token_generator=default_token_generator
    if token_generator.check_token(user,token):
        user.is_active=True
        user.save()
    return HttpResponseRedirect('http://127.0.0.1:8000/')

@login_required(login_url='http://127.0.0.1:8000/login/')
def auth_user(request):
    return render(request,'index.html')

@login_required
def user_logout(request):
    return render(request,'index.html')

@login_required
def receive_transaction(request):
    return render(request,'index.html')
