from django.db import models


# Create your models here.
class uf(models.Model):
    id_uf = models.AutoField(primary_key=True)
    valor = models.FloatField(null=False)
    fecha = models.DateField(max_length=24, null=False)


class ipc(models.Model):
    id_ipc = models.AutoField(primary_key=True)
    valor = models.FloatField(null=False)
    fecha = models.CharField(max_length=24, null=False)
