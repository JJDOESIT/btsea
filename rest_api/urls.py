from django.urls import path
from . import views

urlpatterns = [
    path('create-user/',views.create_model_user.as_view()),
    path('login-user/',views.login_model_user.as_view()),
    path('verify-auth-user/',views.verify_auth_user.as_view()),
    path('user-logout/',views.user_logout.as_view()),
    path('fetch-user-wallet/',views.fetch_user_wallet.as_view()),
    path('create-user-wallet/',views.create_user_wallet.as_view()),
]
