from django.shortcuts import render

def forms(request):
    return render(request,'components/form.html')