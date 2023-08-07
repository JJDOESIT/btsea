from django.urls import path,include
from . import views


urlpatterns = [
    path('',views.index),
    path('register/',views.index),
    path('login/',views.index),
    path('framework/',include('rest_api.urls')),
    path('verify/<slug:token>/<slug:uid>/',views.verify),
    path('dashboard/',views.auth_user),
    path('dashboard/logout/',views.user_logout),
    path('verify-email/',views.index),
    path('dashboard/receive/',views.receive_transaction),
]

