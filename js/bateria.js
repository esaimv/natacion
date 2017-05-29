$(document).ready(function(){
  cargar_tabla();
  $("#guardar").click(guardar);
})


function guardar(){
  if(false){
    alert("Se deben llenar todos los campos")
  }else{
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
}

function cargar_tabla(){
  $.getJSON("bateria.php",function(tbateria){
		cargar_bateria(tbateria);
	});
}

function cargar_bateria(tbateria){
	$.each(tbateria, function(i, tbateria){
    var datos_enviar = tbateria.id +", \""+tbateria.nombre+
         "\", "+tbateria.edad+", \""+tbateria.peso+
         "\", \""+tbateria.talla+"\", \""+tbateria.doce+
         "\", \""+tbateria.abd+"\", \""+tbateria.lagxm+
         "\", \""+tbateria.salto+"\", \""+tbateria.flex+"\"";

    var datos_tabla = "<tr>"+
        "<td>"+tbateria.id+"</td>"+
        "<td>"+tbateria.nombre+"</td>"+
        "<td>"+tbateria.edad+"</td>"+
        "<td>"+tbateria.peso+"</td>"+
        "<td>"+tbateria.talla+"</td>"+
        "<td>"+tbateria.doce+"</td>"+
        "<td>"+tbateria.abd+"</td>"+
        "<td>"+tbateria.lagxm+"</td>"+
        "<td>"+tbateria.salto+"</td>"+
        "<td>"+tbateria.flex+"</td>"+
        "<td><input type='button' class='btn btn-primary' value='Editar' onclick='editar_bateria("+datos_enviar+")'></td>"+
        "</tr>";

      $("#tabla_bateria").append(datos_tabla);
  })
}

function editar_bateria(id, no, ed, pe, ta, doce, abd, lagxm, sa, flex){
  $("#guardar").attr('disabled', true);
  $("#actualizar").attr('disabled', false);
  $("#eliminar").attr('disabled', false);

  $("#nombre").val(no);
  $("#edad").val(ed);
  $("#peso").val(pe);
  $("#talla").val(ta);
  $("#doce").val(doce);
  $("#abd").val(abd);
  $("#lagxm").val(lagxm);
  $("#salto").val(sa);
  $("#flex").val(flex);

  $(document).ready(function(){
    $("#eliminar").click(function(){
			var opciones = {
				type    : 'POST',
      	url     : 'bateria.php',
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
      }else{
        var datos = {
          id : id,
          nombre : $("#nombre").val(),
          edad : $("#edad").val(),
          peso : $("#peso").val(),
          talla : $("#talla").val(),
          doce : $("#doce").val(),
          abd : $("#abd").val(),
          lagxm : $("#lagxm").val(),
          salto : $("#salto").val(),
          flex : $("#flex").val(),
          opcion : 'actualizar'
        }

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
    })
  })
}
