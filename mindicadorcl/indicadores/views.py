from django.shortcuts import render
import requests
import json

# Create your views here.


def consumoApi(request):

    response = requests.get('https://www.mindicador.cl/api/uf')
    # print(response.text)
    response_json = json.loads(response.text)
    uf_valor = response_json['serie'][0]
    print(uf_valor)

    return render(request, 'indicadores/indicadores_api.html', {})
