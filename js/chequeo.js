
$(document).ready(function(){

	$('.form_date').datetimepicker(opciones_time);
	obtener_alumnos();
	obtener_chequeo();
	$("#guardar").click(guardar);
	$('#filtrar').change(filtrar)
  $('#filtrar').keyup(filtrar)


})

function obtener_chequeo(){
		$.getJSON("chequeo.php",function(tchequeo){
			cargar_chequeo(tchequeo);
		});

	function cargar_chequeo(tchequeo){
		$.each(tchequeo, function(i, tchequeo){
			var datos_enviar = tchequeo.id +", \""+tchequeo.nombre+
					 "\", \""+tchequeo.fecha+"\", \""+tchequeo.ejercicio+""+
					 "\", "+tchequeo.tiempo;
			var datos_tabla = "<tr>"+
					"<td>"+tchequeo.id+"</td>"+
					"<td>"+tchequeo.nombre+"</td>"+
					"<td>"+tchequeo.fecha+"</td>"+
					"<td>"+tchequeo.ejercicio+"</td>"+
					"<td>"+tchequeo.tiempo+"</td>"+
					"<td><input type='button' class='btn btn-primary' value='Editar' onclick='editar_chequeo("+datos_enviar+")'></td>"+
				"</tr>";

				$("#tabla_chequeo").append(datos_tabla);
	    })
	}
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

function editar_chequeo(id, no, fe, ej, ti){
	$("#guardar").attr('disabled', true);
	$("#actualizar").attr('disabled', false);
	$("#eliminar").attr('disabled', false);

	$("#nombre").val(no);
	$("#ejercicio").val(ej);
	$("#fecha").val(fe);
	$("#tiempo").val(ti);

	$(document).ready(function(){
		$('.form_date').datetimepicker(opciones_time);
		$("#eliminar").click(function(){
			var opciones = {
				type    : 'POST',
      	url     : 'chequeo.php',
      	data    : {id: id, opcion : "eliminar"},
      	dataType: 'json',
      	encode  : true
			}
			$.ajax(opciones).done(function(drecibidos){
				alert(drecibidos.mensaje);
				location.reload();
			})
		});
		$("#actualizar").click(function(){
			if(false){
				alert("Se deben llenar todos los campos")
			}else {
				var datos = {
					id				: id,
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
					location.reload();
				})
			}
		});
		$("#eliminar").click(eliminar(id));
		$('#filtrar').change(filtrar);
	  $('#filtrar').keyup(filtrar);
	});

}
function validar_campos(){
  if($("#nombre").val() == "" || $("#fecha").val() == "" || $("#ejercicio").val() == "" || $("#tiempo").val() == "" ){
    var band = false;
  }else{
		var band = true;
	}
  return band;
}

function guardar(){
	if(false){
		alert("Se deben llenar todos los campos")
	}else {
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
			location.reload();
		})
	}
}

function obtener_alumnos(){
	$.getJSON("alumnos.php",function(talumnos){
		cargar_alumnos(talumnos);
	});
}

function cargar_alumnos(talumnos){
	$.each(talumnos, function(i, talumnos){
		if(talumnos.clasificacion == "Equipo" || talumnos.clasificacion == "Pre-equipo"){
			var nalumno =  "<option value='"+talumnos.nombre+"'>"+talumnos.nombre+"</option>";

        	$("#nombre").append(nalumno);
				}
    })
}
