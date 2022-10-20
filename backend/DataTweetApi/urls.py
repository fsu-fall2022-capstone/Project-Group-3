from django.template.defaulttags import url
from django.urls import path
import django.conf.urls
from . import views
from django.conf.urls.static import static
from django.conf import settings
#URLConf
urlpatterns = [

    path('/index', views.index, name='index'),

    url(r'^user$', views.usersApi),
    url(r'^user/([0-9]+)$', views.usersApi),

    url(r'^post$',views.postApi),
    url(r'^post/([0-9]+)$',views.postApi),

    url(r'^post/savefile',views.SaveFile)
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)