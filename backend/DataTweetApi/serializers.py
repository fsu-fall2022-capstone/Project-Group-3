from  rest_framework import serializers
from . import models

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Users
        fields=('Username','Password','Email', 'About','RoleLvl')

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Posts
        fields=('PostID','PostFileName','PostedBy', 'PostedWhen','Tags')