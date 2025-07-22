from django.shortcuts import render

def content_page(request):
    return render(request,"components/content.html")