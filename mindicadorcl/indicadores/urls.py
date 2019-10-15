from django.urls import path
from . import views

urlpatterns = [
    path('indicadores/historico/', views.home),
    path('indicadores/historico/input/', views.consumoApiHistorico,
         name='api_historico'),
    path('indicadores/api/uf/', views.consumoApiUf),
    path('indicadores/api/ipc/', views.consumoApiIpc),
    path('indicadores/filtros/', views.uiUser),
]
