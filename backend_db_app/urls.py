from django.urls import path, include
from . import views


urlpatterns = [
    path("", views.index),
    path("register/", views.index),
    path("login/", views.index),
    path("framework/", include("rest_api.urls")),
    path("verify/<slug:token>/<slug:uid>/", views.verify),
    path("dashboard/", views.auth_user_check_active),
    path("dashboard/logout/", views.auth_user_check_active),
    path("verify-email/", views.auth_user),
    path("dashboard/receive/", views.auth_user_check_active),
]
