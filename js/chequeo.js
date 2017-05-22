
$(document).ready(function(){
	obtener_alumnos();
	$("#guardar").click(guardar);	
	$("#buscar").click(buscar);

	$('#filtrar').change(filtrar)
    $('#filtrar').keyup(filtrar)

    $('.form_date').datetimepicker(opciones_time);
})

function ready2(id, no, ej, fe, ti){

	$('.form_date').datetimepicker(opciones_time);

	$("#actualizar").click(actualizar(id));
	$("#eliminar").click(eliminar(id));
	$('#filtrar').change(filtrar);
    $('#filtrar').keyup(filtrar);
}

var opciones_time = {
      language:  'es',
      weekStart: 1,
      todayBtn:  1,
      autoclose: 1,
      todayHighlight: 1,
      startView: 2,
      minView: 2,
      forceParse: 0
  }

function filtrar(){
	var rex = new RegExp($(this).val(), 'i');
        $('.buscar tr').hide();
        $('.buscar tr').filter(function () {
            return rex.test($(this).text());
        }).show();
}


function buscar(){
	$("#tabla-body").empty();
	$.each(tchequeo, function(i, tchequeo){        
		var datos_enviar = tchequeo.id +", \""+tchequeo.nombre+             
             ", \""+tchequeo.ejercicio+"\", \""+tchequeo.fecha+"\", "+tchequeo.tiempo;
        var datos_tabla = "<tr>"+
            "<td>"+tchequeo.id+"</td>"+
            "<td>"+tchequeo.nombre+"</td>"+
            "<td>"+tchequeo.fecha+"</td>"+
            "<td>"+tchequeo.ejercicio+"</td>"+
            "<td>"+tchequeo.tiempo+"</td>"+
            "<td><input type='button' class='btn btn-primary' value='Editar' onclick='editar_chequeo("+datos_enviar+")'></td>"+
          "</tr>";
        $("#tabla_modal").append(datos_tabla);
    })    
}

function editar_chequeo(id, no, ej, fe, ti){
	$("#modal_chequeo").modal('toggle');
	$("#guardar").attr('disabled', true);
	$("#actualizar").attr('disabled', false);
	$("#eliminar").attr('disabled', false);

	$("#nombre").val(no);
	$("#ejercicio").val(ej);
	$("#fecha").val(fe);
	$("#tiempo").val(ti);

	$(document).ready(ready2(id, no, ej, fe, ti));

}

function eliminar(){
	var opciones = {
		type    : 'POST',
      	url     : 'chequeo.php',
      	data    : {'id': id},
      	dataType: 'json',
      	encode  : true
	}
	$.ajax(opciones).done(function(drecibidos){
		alert(drecibidos.mensaje);
	})
}

function actualizar(){
	var datos = {
		id			: id, 
		fecha 		: $("#fecha").val(), 
		nombre		: $("#nombre").val(), 
		ejercicio	: $("#ejercicio").val(), 
		tiempo  	: $("#tiempo").val(),
		opcion 		: "actualizar"
	}
	var opciones = {
		type    : 'POST',
      	url     : 'chequeo.php',
      	data    : datos,
      	dataType: 'json',
      	encode  : true
	}
	$.ajax(opciones).done(function(drecibidos){
		alert(drecibidos.mensaje);
	})
}

function guardar(){
	var datos = {
		fecha 		: $("#fecha").val(), 
		nombre		: $("#nombre").val(), 
		ejercicio	: $("#ejercicio").val(), 
		tiempo  	: $("#tiempo").val(),
		opcion 		: "guardar",  
	}
	var opciones = {
		type    : 'POST',
      	url     : 'chequeo.php',
      	data    : datos,
      	dataType: 'json',
      	encode  : true
	}

	$.ajax(opciones).done(function(drecibidos){
		alert(drecibidos.mensaje);
	})
}

function obtener_alumnos(){
	$.getJSON("alumnos.php",function(talumnos){
		cargar_alumnos(talumnos);
	});
}

function cargar_alumnos(talumnos){
	$.each(talumnos, function(i, talumnos){        
		if(talumnos.clasificacion == "Equipo" || talumnos.clasificacion == "Pre-equipo"){
			var nalumno =  "<option value='"+talumnos.nombre+"'>"+talumnos.nombre;+"</option>";         
        	$("#nombre").append(nalumno);  	
		}        
    })    
}