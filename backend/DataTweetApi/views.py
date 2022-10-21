from django.core.files.storage import default_storage
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http import HttpResponse
from django.http.response import JsonResponse
from . import models
from . import serializers

# Create your views here.

@csrf_exempt
def index(request):
    x = {'Username': 'toch','Password': 'pass','Email': 'email', 'About': 'nothing','RoleLvl': 2}
    users_serializer = serializers.UsersSerializer(data=x)
    print(users_serializer)
    if users_serializer.is_valid():
        users_serializer.save()
        return JsonResponse("Added Successfully", safe=False)
    return JsonResponse("Failed to Add", safe=False)

def say_hello(request):
    return render(request,"Hello World!")

@csrf_exempt
def usersApi(request, id=0):
    if request.method == 'GET':
        users = models.Users.objects.all()
        users_serializer = serializers.UsersSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)

    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        users_serializer = serializers.UsersSerializer(data=user_data)
        if users_serializer.is_valid():
            users_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        user = models.Users.objects.get(UsersId=user_data['UsersId'])
        users_serializer = serializers.UsersSerializer(user, data=user_data)
        if users_serializer.is_valid():
            users_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
         user = models.Users.objects.get(UsersId=id)
         user.delete()
         return JsonResponse("Deleted Successfully", safe=False)

@csrf_exempt
def postApi(request, id=0):
    return HttpResponse(200)
@csrf_exempt
def SaveFile(request):
    file=request.FILES['file']
    file_name=default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False)