from django.urls import path
from .home.create_account import RegisterAPIView
from .home.login_account import LoginAPIView
from .home.update_account import UpdateAPIView

urlpatterns = [
    path("create_account/", RegisterAPIView.as_view(), name='create_account'),
    path("login_account/", LoginAPIView.as_view(), name='login_account'),
    path("update_account/",UpdateAPIView.as_view(),name='update_account'),
]