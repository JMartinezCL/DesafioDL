# Generated by Django 2.2 on 2019-10-13 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ipc',
            fields=[
                ('valor', models.FloatField()),
                ('fecha', models.CharField(max_length=24, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='uf',
            fields=[
                ('valor', models.FloatField()),
                ('fecha', models.CharField(max_length=24, primary_key=True, serialize=False)),
            ],
        ),
    ]
