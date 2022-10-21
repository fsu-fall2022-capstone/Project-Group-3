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
    path('get_posts', views.get_posts),
    path("register", views.register_request, name="register"),

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)