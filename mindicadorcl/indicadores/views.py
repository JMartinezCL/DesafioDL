from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from .models import uf, ipc
import requests
import json


# Create your views here.


def consumoApi(request):
    return render(request, 'indicadores/indicadores_api.html', {})


def consumoApiHistorico(request):
    api_url = 'https://www.mindicador.cl/api/'
    user_request_indicator = 'null'
    user_request_year = 'null'

    if request.method == 'POST':
        datos = json.loads(request.POST.get('datos'))
        user_request_indicator = datos['indicador']
        user_request_year = datos['year']
    # print(response.text)
    user_request = (api_url + user_request_indicator
                    + '/' + user_request_year)
    response = requests.get(user_request)
    response_json = json.loads(response.text)
    uf_valor = response_json['serie'][0]['valor']

    for serie in response_json['serie']:
        print(serie['fecha'])
        # guardar en bd
    # print(response_json)
    return JsonResponse({'valido': 'valido', 'mensaje': 'operacion exitosa'})
