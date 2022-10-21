from  rest_framework import serializers
from . import models

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.users
        fields=('Username','Password','Email', 'About','RoleLvl')

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.posts
        fields=('PostID','PostFileName','Username', 'PostedWhen','Tags')