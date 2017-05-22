$(document).ready(function(){
  cargar_tabla();
  $("#guardar").click(guardar);
})

function guardar(){
  var datos = {
    nombre : $("#nombre").val(),
    edad : $("#edad").val(),
    peso : $("#peso").val(),
    talla : $("#talla").val(),
    doce : $("#doce").val(),
    abd : $("#abd").val(),
    lagxm : $("#lagxm").val(),
    salto : $("#salto").val(),
    flex : $("#flex").val(),
    opcion : 'guardar'
  }

  alert(datos.nombre + datos.edad + datos.peso + datos.talla + datos.doce + datos.abd + datos.lagxm + datos.salto + datos.flex);

  var opciones = {
    type    : 'POST',
    url     : 'bateria.php',
    data    : datos,
    dataType: 'json',
    encode  : true
  }

  $.ajax(opciones).done(function(drecibidos){
    alert(drecibidos.mensaje);
    location.reload();
  })
}

function cargar_tabla(){
  $.getJSON("alumnos.php",function(tbateria){
		cargar_bateria(tbateria);
	});
}

function cargar_alumnos(tbateria){
	$.each(tbateria, function(i, tbateria){
    var datos_enviar = tbateria.id +", \""+tbateria.nombre+
         "\", "+tbateria.edad+", \""+tbateria.peso+""+
         "\", \""+tbateria.talla+"\", \""+tbateria.doce+""+
         "\", \""+tbateria.abd+"\", \""+tbateria.lagxm+""+
         "\", \""+tbateria.salto+"\", \""+tbateria.flex+"\""+;

    var datos_tabla = "<tr>"+
        "<td>"+tbateria.id+"</td>"+
        "<td>"+tbateria.nombre+"</td>"+
        "<td>"+tbateria.edad+"</td>"+
        "<td>"+tbateria.peso+"</td>"+
        "<td>"+tbateria.abd+"</td>"+
        "<td>"+tbateria.lagxm+"</td>"+
        "<td>"+tbateria.salto+"</td>"+
        "<td>"+tbateria.flex+"</td>"+
        "<td><input type='button' class='btn btn-primary' value='Editar' onclick='editar_bateria("+datos_enviar+")'></td>"+
      "</tr>";

      $("#tabla_bateria").append(datos_tabla);
    })
  })
}
