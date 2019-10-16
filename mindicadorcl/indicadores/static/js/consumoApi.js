
$("#btn_graph").on("click",function()
{    
    var year_ini = $('input:text[name=year_ini]').val();
    var year_end = $('input:text[name=year_end]').val();
    var month_ini =$('select[name=month_ini] option:selected').val();
    var month_end =$('select[name=month_end] option:selected').val();   
    $('.ajaxProgress').show();  
    getDataResquest(getYearRange(year_ini, year_end), month_ini, year_ini, month_end, year_end)
    //filtra por meses     
});
/***
 * determina la cantidad de años de los que se pedira la data *
 ***/
function getYearRange(inicio, fin){
    range = fin - inicio
    var list_range =[]
    i=0
    for(inicio; inicio <=fin; inicio++){
        list_range.push(inicio)        
    }    
    return list_range
}
/***
 * hace la peticion de data para el rango seleccionado *
 ***/
function getDataResquest(yearRange, month_ini, year_ini,month_end, year_end){
    dateRepositoryUf =[]
    valueRepositoryUf =[]
    dateRepositoryIpc =[]
    valueRepositoryIpc =[]
    date_uf = []
    value_uf = []
    date_ipc = []
    value_ipc= []

    yearRange.forEach(function(element) {        
        aux_uf = requestApi('uf',element);              
        aux_ipc = requestApi('ipc',element);        
        var date_uf = aux_uf['serie'].map(function(e) {            
            var current_month= Number(e.fecha.substring(5,7));
            var current_year = Number(e.fecha.substring(0,4))
            if((month_ini <= current_month && year_ini == current_year) || (current_month <= month_end && year_end == current_year)){
                return e.fecha.substr(0,10);
            }
            else if(current_year != year_ini && current_year != year_end){
                return e.fecha.substr(0,10);
            }
            return;
            });
        date_uf.reverse();
        date_uf = date_uf.filter(function( element ) {return element !== undefined;});
        //valores uf
        var value_uf = aux_uf['serie'].map(function(e) {            
            var current_month= Number(e.fecha.substring(5,7));
            var current_year = Number(e.fecha.substring(0,4))
            if((month_ini <= current_month && year_ini == current_year) || (current_month <= month_end && year_end == current_year)){                
                
                return e.valor;
            }
            else if(current_year != year_ini && current_year != year_end){
                return e.valor;
            }
            return;
        return e.valor;
        });
        value_uf.reverse();
        value_uf = value_uf.filter(function( element ) {return element !== undefined;});
        //valores ipc
        var value_ipc = aux_ipc['serie'].map(function(e) {            
            var current_month= Number(e.fecha.substring(5,7));
            var current_year = Number(e.fecha.substring(0,4))
            if((month_ini <= current_month && year_ini == current_year) || (current_month <= month_end && year_end == current_year) || current_year){
                return e.valor;
            }
            else if(current_year != year_ini && current_year != year_end){
                return e.valor;
            }
            return;        
        });
        value_ipc.reverse();
        value_ipc = value_ipc.filter(function( element ) {return element !== undefined;});
        //fechas ipc
        var date_ipc = aux_ipc['serie'].map(function(e) {            
            var current_month= Number(e.fecha.substring(5,7));
            var current_year = Number(e.fecha.substring(0,4))
            if((month_ini <= current_month && year_ini == current_year) || (current_month <= month_end && year_end == current_year)){                
                return e.fecha;
            }
            else if(current_year != year_ini && current_year != year_end){
                return e.fecha;
            }
            return;        
        });
        date_ipc.reverse();
        date_ipc = date_ipc.filter(function( element ) {return element !== undefined;});

        dateRepositoryUf = dateRepositoryUf.concat(date_uf)
        valueRepositoryUf = valueRepositoryUf.concat(value_uf)        
        
        /*igualad de cantidad de valores para ambos array, asigna ipc diario*/
        i=0;        
        date_uf.forEach(function(element) { 
            if(date_ipc[i]!=null && element.substr(0,7) == date_ipc[i].substr(0,7)){ 
            valueRepositoryIpc.push(value_ipc[i])            
            }
            else{            
                valueRepositoryIpc.push(value_ipc[i])           
                i++    
            }                         
        });        
    });
    drawGraphFilter(valueRepositoryUf, valueRepositoryIpc, dateRepositoryUf);

}
/***
 * Peticion a la api de mindicador.cl/api/*
 ***/
function requestApi(code,year){   
   var data_anual;

   $.ajax({
        type: 'get',
        url: 'https://mindicador.cl/api/'+code+'/'+year,
        dataType: 'json',
        async: false,       
        success: function (response){            
            temp = JSON.stringify(response)
            data_anual = JSON.parse(temp) 
            $('.ajaxProgress').hide();  
            },        
        error: function(response){
            alert("La peticion no se concreto!")            
        }
    });  
    return data_anual;
}

function drawGraphFilter(values_uf, ipc_fix, labels_uf){
   $('#myChart').remove();
   $('#graphContainer').append('<canvas id="myChart" width="400" height="400"><canvas>');
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels_uf,
            datasets: [{
                label: 'Uf',
                fill: false,
                data: values_uf,               
                borderWidth: 1,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgb(75, 192, 192)'
            },
            {
                label: 'Ipc',
                fill: false,
                data: ipc_fix,               
                borderWidth: 1,
                borderColor: 'rgb(255, 0, 192)',
                backgroundColor: 'rgb(225, 0, 192)'
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