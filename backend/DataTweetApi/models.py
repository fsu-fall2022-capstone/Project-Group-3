from django.db import models

# Create your models here.

class users(models.Model):
    FirstName = models.CharField(max_length=32)
    LastName = models.CharField(max_length=32)
    Username = models.CharField(primary_key=True, max_length=32)
    Password = models.CharField(max_length=32)
    Email = models.CharField(max_length=50)
    About = models.CharField(max_length=500)
    RoleLvl = models.IntegerField()

class posts(models.Model):
    PostID = models.AutoField(primary_key=True)
    PostFileName = models.CharField(max_length=64)
    Username = models.ForeignKey(to=users, on_delete=models.CASCADE)
    PostedWhen = models.DateTimeField()
    Tags = models.CharField(max_length=500)