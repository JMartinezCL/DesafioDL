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
    uf.objects.all().delete()
    ipc.objects.all().delete()
    mensaje = None
    user_request_indicator = None
    user_request_year = None
    uf_object = uf()
    ipc_object = ipc()
    api_url = 'https://www.mindicador.cl/api/'
    if request.method == 'POST':
        datos = json.loads(request.POST.get('datos'))
        # user_request_indicator = datos['indicador']
        user_request_year = datos['year']
    # print(response.text)
    # user_request = (api_url + user_request_indicator
    #                + '/' + user_request_year)
    # response = requests.get(user_request)
    # response_json = json.loads(response.text)
    #
    user_request_uf = (api_url + 'uf'
                       + '/' + user_request_year)
    user_request_ipc = (api_url + 'ipc'
                        + '/' + user_request_year)
    response_uf = requests.get(user_request_uf)
    response_ipc = requests.get(user_request_ipc)
    response_json_uf = json.loads(response_uf.text)
    response_json_ipc = json.loads(response_ipc.text)
    """
    for serie in response_json['serie']:
        # print(serie['fecha'])
        if response_json['codigo'] == 'uf':
            try:
                uf_object.valor = serie['valor']
                uf_object.fecha = serie['fecha']
                uf_object.save()
            except IOError as e:
                print("error")
                mensaje = 'No se pudo guardar los datos en la Base de datos.'
        elif response_json['codigo'] == 'ipc':
            try:
                ipc_object.valor = serie['valor']
                ipc_object.fecha = serie['fecha']
                ipc_object.save()
            except IOError as e:
                print("error")
                mensaje = 'No se pudo guardar los datos en la Base de datos.'
        """
    for serie in response_json_uf['serie']:
        try:
            uf_object.valor = serie['valor']
            uf_object.fecha = serie['fecha']
            uf_object.save()
        except IOError as e:
            print("error")
    for serie in response_json_ipc['serie']:
        try:
            ipc_object.valor = serie['valor']
            ipc_object.fecha = serie['fecha']
            ipc_object.save()
        except IOError as e:
            print("error")
    historico_ipc = ipc.objects.all()
    historico_uf = uf.objects.all()

    # data = {"serie": historico_uf}
    lista_ipc = [{'valor': ipc.valor, 'fecha': ipc.fecha}
                 for ipc in historico_ipc]
    lista_uf = [{'valor': uf.valor, 'fecha': uf.fecha} for uf in historico_uf]
    response = json.dumps({'uf': lista_uf, 'ipc': lista_ipc})
    # print(response)
    return JsonResponse(response, safe=False)


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
