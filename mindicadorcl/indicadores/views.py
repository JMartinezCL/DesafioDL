from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from .models import uf, ipc
import requests
import json
from django.core import serializers


# Create your views here.


def home(request):
    return render(request, 'indicadores/indicadores_api.html', {})


def consumoApiHistorico(request):
    mensaje = None
    user_request_indicator = None
    user_request_year = None
    uf_object = uf()
    ipc_object = ipc()
    api_url = 'https://www.mindicador.cl/api/'

    if request.method == 'POST':
        datos = json.loads(request.POST.get('datos'))
        user_request_indicator = datos['indicador']
        user_request_year = datos['year']
    # print(response.text)
    user_request = (api_url + user_request_indicator
                    + '/' + user_request_year)
    response = requests.get(user_request)
    response_json = json.loads(response.text)
    for serie in response_json['serie']:
        print(serie['fecha'])
        if response_json['codigo'] == 'uf':
            try:
                uf_object.valor = serie['valor']
                uf_object.fecha = serie['fecha']
                uf_object.save()
            except IOError as e:
                print("error")
                mensaje = 'No se pudo guardar los datos en la Base de datos.'
        else:
            try:
                ipc_object.valor = serie['valor']
                ipc_object.fecha = serie['fecha']
                ipc_object.save()
            except IOError as e:
                print("error")
                mensaje = 'No se pudo guardar los datos en la Base de datos.'
    return JsonResponse({'valido': 'valido', 'mensaje': mensaje})


def consumoApiUf(request):
    # historico_uf = serializers.serialize("json", uf.objects.all())
    historico = uf.objects.all()
    # data = {"serie": historico_uf}
    lista = [{'valor': uf.valor, 'fecha': uf.fecha} for uf in historico]
    response = json.dumps(lista)
    return JsonResponse(json.loads(response), safe=False)


def consumoApiIpc(request):
    historico = ipc.objects.all()
    lista = [{'valor': ipc.valor, 'fecha': ipc.fecha} for ipc in historico]
    response = json.dumps(lista)
    return JsonResponse(json.loads(response), safe=False)
