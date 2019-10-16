from django.db import models


# Create your models here.
class uf(models.Model):
    valor = models.FloatField(null=False)
    fecha = models.DateField(null=False, primary_key=True)


class ipc(models.Model):
    valor = models.FloatField(null=False)
    fecha = models.DateField(null=False, primary_key=True)
