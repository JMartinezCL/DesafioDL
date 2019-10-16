# ConsumoApi 
_Aplicación creada para interactuar con la API de mindicador.cl

### Pre-requisitos 📋
_Se necesitan tener las siguientes herramientas en el entorno local_

* Django
* Python 3
* Requests  

### Instalación 🔧
_Se recomienda instalar Anaconda3 que incluye python3 y los paquetes requeridos para utilizar el entorno de trabajo._

_Como segunda opcion puede instalar los paquetes requeridos mediante pip_
```
instalar python3
pip install pipenv
```

## Deployment 📦

_Para ejecutar la aplicación debe seguir los siguientes pasos:_

```
1| Iniciar pipenv 
2| Arrancar el entorno virtual
3| Instalar requirements.txt
4| Ubicarse en la carpeta del proyecto -> ejecutar python manage.py migrate 
5| Levantar el servidor de django -> python manage.py runserver

______________________
localhost:8000/indicadores/historico/ -> obtiene data anual desde API mindicador.cl
localhost:8000/indicadores/api/uf/ -> consumo de datos anual de UF
localhost:8000/indicadores/api/ipc/ -> consumo de datos anual de IPC
localhost:8000/indicadores/filtro/ -> despliega los datos IPC/UF segun el filtro indicado
localhost:8000/mapa/ -> mapa(googlemaps API) con grilla que indica los puntos de ubicacion por cada grilla

```

## Autores ✒️

_Colaboraron en este proyecto:_
* **José Martínez** - *Investigación y programación* - [JMartinezCL](https://github.com/JMartinezCL)