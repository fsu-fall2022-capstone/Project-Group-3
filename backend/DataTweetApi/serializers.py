from  rest_framework import serializers
from . import models

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.users
        fields=('Username', 'FirstName', 'LastName', 'Password','Email', 'About','RoleLvl')

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.posts
        fields=('PostFileName','Username', 'Description', 'PostedWhen','Tags')