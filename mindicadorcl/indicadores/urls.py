from django.urls import path
from . import views

urlpatterns = [
    path('indicadores/historico/', views.consumoApi),
    path('indicadores/historico/input/', views.consumoApiHistorico,
         name='api_historico'),
]
