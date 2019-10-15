$("#btn_guardar").on("click",function()
{
    alert("jjajaja")
    var formulario = {}
    formulario['year'] = $('input:text[name=year]').val();
    formulario['indicador']=$('select[name=indicador] option:selected').val();
    $.ajax({
        type: 'post',
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
});


function drawGraphic(uf, ipcs){
    var labels_ipc = ipcs.map(function(e) {
            return e.fecha.substr(0,7);
            });
    var values_ipc = ipcs.map(function(e) {
    return e.valor;
    });    
    var labels_uf = uf.map(function(e) {
            return e.fecha.substr(0,7);
            });
    var values_uf = uf.map(function(e) {
    return e.valor;
    });   
    
    labels_ipc.reverse()
    values_ipc.reverse()
    labels_uf.reverse()
    values_uf.reverse()
    i=0  
    var ipc_fix =[] //valor de ipc por dia
    $.each(uf, function(key, value){    
        if(value.fecha.substr(0,7) == ipcs[i]['fecha'].substr(0,7)){ 
            ipc_fix.push(ipcs[i]['valor'])            
        }
        else{            
            ipc_fix.push(ipcs[i]['valor'])           
            i++    
        }           
    })
    

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels_uf,
            datasets: [{
                label: 'Uf',
                fill: false,
                data: values_uf,               
                borderWidth: 1
            },
            {
                label: 'Ipc',
                fill: false,
                data: ipc_fix,               
                borderWidth: 1
            }],
        },        
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        //beginAtZero: false,
                       /* callback: function(value, index, values) {
                        return '$' + value;
                    }*/
                    }
                }]
            }
        }
    });
} 
