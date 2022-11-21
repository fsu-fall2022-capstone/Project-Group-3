from  rest_framework import serializers
from . import models

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.users
        fields=('Username', 'FirstName', 'LastName', 'Password','Email', 'About','RoleLvl')

class GetPostsSerializer(serializers.ModelSerializer):
    FirstName = serializers.CharField(source = 'Username.FirstName')
    LastName = serializers.CharField(source = 'Username.LastName')
    class Meta:
        model=models.posts
        fields=('Username', 'Description', 'PostedWhen','Tags', 'FirstName', 'LastName')

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.posts
        fields=('File', 'Username', 'Description', 'PostedWhen','Tags')