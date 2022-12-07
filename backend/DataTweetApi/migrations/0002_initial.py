# Generated by Django 4.0.3 on 2022-12-07 02:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('DataTweetApi', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='users',
            fields=[
                ('FirstName', models.CharField(max_length=32)),
                ('LastName', models.CharField(max_length=32)),
                ('Username', models.CharField(max_length=32, primary_key=True, serialize=False)),
                ('Password', models.CharField(max_length=32)),
                ('Email', models.CharField(max_length=50)),
                ('About', models.CharField(max_length=500, null=True)),
                ('RoleLvl', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='posts',
            fields=[
                ('PostID', models.AutoField(primary_key=True, serialize=False)),
                ('File', models.FileField(null=True, upload_to='media/')),
                ('xData', models.TextField(blank=True)),
                ('yData', models.TextField(blank=True)),
                ('PostedWhen', models.DateTimeField()),
                ('Tags', models.CharField(max_length=500, null=True)),
                ('Description', models.CharField(max_length=500)),
                ('Username', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to='DataTweetApi.users')),
            ],
        ),
    ]
