$(document).ready(function(){
  obtener_grupos();
  $("#grupo").change(cargar);
  obtener_fecha();

})
var strDate;
function obtener_fecha(){
  var d = new Date();
  var mes;
  switch (d.getMonth()+1) {
    case 1:
      mes = 'Enero';
      break;
    case 2:
      mes = 'Febrero';
      break;
    case 3:
      mes = 'Marzo';
      break;
    case 4:
      mes = 'Abril';
      break;
    case 5:
      mes = 'Mayo';
      break;
    case 6:
      mes = 'Junio';
      break;
    case 7:
      mes = 'Julio';
      break;
    case 8:
      mes = 'Agosto';
      break;
    case 9:
      mes = 'Septiembre';
      break;
    case 10:
      mes = 'Octubre';
      break;
    case 11:
      mes = 'Noviembre';
      break;
    case 12:
      mes = 'Diciembre';
      break;
    default:

  }

  strDate =  d.getDate() + " " + mes + " " + d.getFullYear();
}

function obtener_grupos(){
  $.getJSON("grupos.php",function(tgrupos){
    cargar_grupos(tgrupos);
  });
}

function cargar_grupos(tgrupos){
  $.each(tgrupos, function(i, tgrupos){
    var opcion = "<option value=\""+tgrupos.nombre+"\">"+tgrupos.nombre+"</option>";
      $("#grupo").append(opcion);
    })
}

function cargar(){
  $.getJSON("alumnos.php",function(talumnos){
    var grupo = $("#grupo").val();
    cargar_alumnos(talumnos, grupo);
  });
}

function cargar_alumnos(tablajson, grupo){
  $.each(tablajson, function(i, tablajson){
    if(tablajson.grupo == grupo){
      var datos_enviar = tablajson.id + ", \""+tablajson.control+"\","+
        "\""+tablajson.nombre+"\", \""+strDate+"\"";
      var datos_tabla = "<tr>"+
          "<td>"+tablajson.id+"</td>"+
          "<td>"+tablajson.control+"</td>"+
          "<td>"+tablajson.nombre+"</td>"+
          "<td><input id='check' type='checkbox' onclick='guardar_arreglo("+datos_enviar+")' value='check'></td>"+
        "</tr>";
      $("#tabla").append(datos_tabla);
    }
  })
}

function guardar_arreglo(id, control, nombre, fecha){
  var  datos = {
    id  : id,
    control: control,
    nombre: nombre,
    fecha: fecha
  }
  var opciones = {
		type    : 'POST',
  	url     : 'asistencia.php',
  	data    : datos,
  	dataType: 'json',
  	encode  : true
	}
  $.ajax(opciones).done(function(){
    alert("Termino")
  })
}
