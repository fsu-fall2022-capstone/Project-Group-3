from django.template.defaulttags import url
from django.urls import path
import django.conf.urls
from . import views
from django.conf.urls.static import static
from django.conf import settings
#URLConf
urlpatterns = [

    path('index', views.index, name='index'),
    path('create_post', views.create_post),
    path('delete_post', views.delete_post),
    path('get_posts', views.get_posts),
    path('create_user', views.create_user),
    path('delete_user', views.delete_user),
    path('update_user', views.update_user),
    path('get_users', views.get_users),
    path('get_current_user', views.get_current_user),
    path("register", views.register, name="register"),
    path('like', views.like),
    path('dislike', views.dislike),
    path('delete_dislike', views.delete_dislike),
    path('like', views.like),
    path('delete_like', views.delete_like),

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)