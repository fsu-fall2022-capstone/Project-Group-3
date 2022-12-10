from email.utils import parsedate_to_datetime
from django.core.files.storage import default_storage
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib import messages
from django.http import HttpResponse
from django.http.response import JsonResponse
from . import models
from . import serializers
import datetime
from django.core.serializers.json import DjangoJSONEncoder
from .models import users, posts

# Create your views here.

#this is just a test function to add a new user to the database
@csrf_exempt
def index(request):
    x = {'Username': 'toch','Password': 'pass','Email': 'tc18cj@fsu.edu', 'About': 'nothing','RoleLvl': 2, 'FirstName': 'Tommy', 'LastName': 'Chong'}
    users_serializer = serializers.UsersSerializer(data=x)
    if users_serializer.is_valid():
        users_serializer.save()
        return JsonResponse("Added Successfully", safe=False)
    return JsonResponse("Failed to Add", safe=False)

@csrf_exempt
def create_user(request):
    try:
        x = {'Username': request.POST['email'],'Password': 'xxx','Email': request.POST['email'], 'About': 'nothing',
        'RoleLvl': 2, 'FirstName': request.POST.get('given_name', 'anonymous'), 'LastName': request.POST.get('family_name', 'anonymous')}
        users_serializer = serializers.UsersSerializer(data=x)
        if users_serializer.is_valid():
            users_serializer.save()
        return JsonResponse("Added Successfully", safe=False)
    except:
        print("Could not add user")
        return JsonResponse("Could not add to user", safe=False)

@csrf_exempt
def delete_user(request):
    try:
        username = request.POST.get('Username')
        userToDelete=users.objects.get(Username=username)
        userToDelete.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    except:
        print("Could not delete")
        return JsonResponse("Could not delete", safe=False)

@csrf_exempt
def update_user(request):
    try:
        x = {'Username': request.POST['Username'],
        'Password': 'xxx',
        'Email': request.POST['Email'], 
        'About': request.POST['About'],
        'RoleLvl': 2,
        'FirstName': request.POST['First'],
        'LastName': request.POST['Last']}
        user = models.users.objects.get(Username=request.POST['OldUsername'])
        users_serializer = serializers.UsersSerializer(user, data=x)
        if users_serializer.is_valid():
            users_serializer.save()
        return JsonResponse("Updated Successfully", safe=False)
    except:
        print("Could not add user")
        return JsonResponse("Could not update to user", safe=False)
    
    

@csrf_exempt
def get_users(request):
    if request.method == 'GET':
        users = models.users.objects.all()
        users_serializer = serializers.UsersSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)

def get_current_user(request):
    if request.method == 'GET':
        users = models.users.objects.filter(Username=request.GET['email'])
        users_serializer = serializers.UsersSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)


@csrf_exempt
def create_post(request):
    if(request.method == 'POST'):
        Username = request.POST['Username']
        File = request.FILES['csv_file']
        Description = request.POST['Description']
        Tags = request.POST['Tags']
        xData = request.POST['xData']
        yData = request.POST['yData']
        form = {"Username": Username, "File": File, "Description": Description, "xData": xData, "yData": yData, "Tags": Tags}
        form['PostedWhen'] = datetime.datetime.strptime(datetime.datetime.now().strftime('%m/%d/%y %H:%M:%S'), '%m/%d/%y %H:%M:%S') 
        post = serializers.PostsSerializer(data=form)
        if post.is_valid():
            post.save()
            return HttpResponse(200)
        else:
            return HttpResponse(400)

    return HttpResponse(400)

@csrf_exempt
def delete_post(request):
    try:
        PostID = request.POST.get('PostID')
        postToDelete=posts.objects.get(PostID=PostID)
        postToDelete.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    except:
        print("Could not delete")
        return JsonResponse("Could not delete", safe=False)

@csrf_exempt
def get_posts(request):
    if(request.method == 'GET'):
        posts = models.posts.objects.all().order_by('-PostedWhen')
        # print(posts)
        posts_json = serializers.GetPostsSerializer(posts, many= True)
        if(posts_json):
            return JsonResponse(posts_json.data, safe=False)

        return HttpResponse(400)
    return HttpResponse(400)

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

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()

            messages.success(request, f'Your account has been created. You can log in now!')    
            return redirect('login')
    else:
        form = UserCreationForm()

    context = {'form': form}
    return render(request, 'users/register.html', context)

@csrf_exempt
def dislike(request):
    dislike = request.POST.get('dislikes')
    dislike = posts.objects.get(dislike=dislike)
    dislike.delete()
    return JsonResponse("Disliked successfully", safe=False)

@csrf_exempt
def delete_dislike(request):
    dislike = request.POST.get('dislike')
    dislike = posts.objects.get(dislike=dislike)
    dislike.delete()
    return JsonResponse("Deleted dislike successfully", safe=False)

@csrf_exempt
def like(request):
    like = request.POST.get('like')
    like = posts.objects.get(like=like)
    like.delete()
    return JsonResponse("Liked successfully", safe=False)

@csrf_exempt
def delete_like(request):
    like = request.POST.get('like')
    like = posts.objects.get(like=like)
    like.delete()
    return JsonResponse("Deleted like successfully", safe=False)