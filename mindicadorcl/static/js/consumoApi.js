/*function consumoUf(){
    $.ajax({
        type: 'get',
        url: '/indicadores/historico/input/',
        dataType: 'json',
        data:{
            'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val(),
            'datos' : JSON.stringify(formulario)},

        success: function (response){   
            alert("Informacion historica guardada.")  
            var data = JSON.parse(response)            
            var decode = Object.entries(data)    
            drawGraphic(decode[0][1], decode[1][1])                        
            },        
        error: function(response){
            alert("Los datos no se pudieron almacenar correctamente.")            
        }
    }); 
}*/

$.getJSON('https://mindicador.cl/api/2018', function(data) {
    var dailyIndicators = data;
    console.log(dailyIndicators.uf.valor)
}).fail(function() {
    console.log('Error al consumir la API!');
});