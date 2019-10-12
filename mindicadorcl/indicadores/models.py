from django.db import models


# Create your models here.
class uf(models.Model):
    # id_uf = models.AutoField()
    valor = models.FloatField(null=False)
    fecha = models.CharField(max_length=24, null=False, primary_key=True)


class ipc(models.Model):
    # id_ipc = models.AutoField()
    valor = models.FloatField(null=False)
    fecha = models.CharField(max_length=24, null=False, primary_key=True)
