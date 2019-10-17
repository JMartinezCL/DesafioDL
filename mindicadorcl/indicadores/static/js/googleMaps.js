var map = null;
var map_rectangles = [];


$('#btn_generar').on("click",function(){
    //alert("ya");
    var latitudInicial = parseFloat( $('input:text[name=lat_ini]').val() );
    var longitudInicial = parseFloat( $('input:text[name=long_ini]').val() );
    var longitudGrilla = parseInt( $('input:text[name=cant_grilla]').val() );
    var tamanio = parseFloat( $('input:text[name=tamanio]').val() );
    
    if(map_rectangles.length > 0)    
      map_rectangles.forEach(function(element){
        if(element.fig.setMap){
          element.fig.setMap(null);
          element.maker.setMap(null);          
        }        
      })
    map_rectangles =[];    
    setRectangles(latitudInicial, longitudInicial, longitudGrilla, tamanio);    
});


$('#btn_eliminar').on("click",function(){    
    $('input:text[name=lat_ini]').val("");
    $('input:text[name=long_ini]').val("");
    $('input:text[name=cant_grilla]').val("");
    $('input:text[name=tamanio]').val("");
    
    if(map_rectangles.length > 0)    
      map_rectangles.forEach(function(element){
        if(element.fig.setMap){
          element.fig.setMap(null);
          element.maker.setMap(null);          
        }        
      })
    map_rectangles =[];   
});


function initMap() {

    function initialize() {

        var mapOptions = {
            zoom: 11,
            center: new google.maps.LatLng(-30.000, -71.350)
        };

        var latLng = new google.maps.LatLng(-30.000, -71.350);
        map = new google.maps.Map(document.getElementById('map'),
            mapOptions);
    
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(-30.000, -71.350),
            map: map,
            draggable: true,
            title: 'marker'
        });
        google.maps.event.addListener(marker, 'drag', function(evt) {
            let lat = marker.getPosition().lat();
            let lng = marker.getPosition().lng();     
            $('input:text[name=lat_ini]').val(lat);
            $('input:text[name=long_ini]').val(lng);                
        });
      
    }//end initialize

    

    google.maps.event.addDomListener(window, 'load', initialize)
}//end initmap
  
function setRectangles(latitudInicial, longitudInicial, longitudGrilla, tamanio) {   

    let traslacion_x = 0
    let translacion_y = 0
    for (var i = 0; i < longitudGrilla; i++) {
      traslacion_x = tamanio * i;
      for (var j = 0; j < longitudGrilla; j++) {
        translacion_y = tamanio * j
        id = i + ' - ' + j
        let square = {
          fig: new google.maps.Rectangle({
            strokeColor: '#EEE7E5',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            clickeable: true,
            map: map,
            bounds: new google.maps.LatLngBounds(
              new google.maps.LatLng(latitudInicial + translacion_y, longitudInicial + traslacion_x),
              new google.maps.LatLng(latitudInicial + tamanio + translacion_y, longitudInicial + tamanio + traslacion_x)
            )
          }),
          maker: new google.maps.Marker({
            position: new google.maps.LatLng(latitudInicial + translacion_y + tamanio / 2, longitudInicial + traslacion_x + + tamanio / 2),
            label: id,
            map: map
          })
        }
        square.fig.info = {
          id: id
        }
        map_rectangles.push(square)

        google.maps.event.addListener(square.fig, 'click', function (evt) {
          alert('Cuadrado ' + this.info.id + '\n' + this.getBounds())
          console.log("los puntos:", this.getBounds())
          console.log(this.info)
        });
      }
    }
}