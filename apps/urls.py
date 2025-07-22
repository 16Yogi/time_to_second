from django.urls import path 
from .views.index import home
from .views.content import content_page
from .views.form_login_logout import forms

urlpatterns = [
    path("",home,name='home'),
    path('login/',forms,name='forms'),
    path('content/',content_page,name='content_page')
]
