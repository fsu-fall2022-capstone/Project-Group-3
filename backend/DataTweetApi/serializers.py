from  rest_framework import serializers
from . import models

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.users
        fields='__all__'

class GetPostsSerializer(serializers.ModelSerializer):
    FirstName = serializers.CharField(source = 'Username.FirstName')
    LastName = serializers.CharField(source = 'Username.LastName')
    class Meta:
        model=models.posts
        fields=('Username', 'Description', 'PostedWhen', 'File', 'xData', 'yData', 'Tags', 'FirstName', 'LastName', 'PostID')

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.posts
        fields=('File', 'Username', 'Description', 'xData', 'yData', 'PostedWhen', 'Tags')