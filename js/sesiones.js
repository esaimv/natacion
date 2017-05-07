function ejercicios(desc){
  alert(desc);
}

$(document).ready(function(){
    obtenergrupos();
    $("#guardar").click(ingresar_sesion);

    function obtenergrupos(){
      $.getJSON('grupos.php', function(grupos){
        $.each(grupos, function(i, grupos){
          $("#grupo").append('<option value="'+grupos.id+'">'+grupos.nombre+'</option>');
        })
      })
    }
    function ingresar_sesion(){
      var datos = {
        'id_grupo'   : $("#grupo option:selected").val(),
        'fecha'       : $("#fecha").val(),
        'ejercicio'  : $("#descripcion").val(),
        'opcion'      : 'agregar'
      };
      alert(datos.id_grupo + datos.fecha + datos.ejercicio);
      $.ajax({
        type    : 'POST',
        url     : 'sesiones.php',
        data    : datos,
        dataType: 'json',
        encode  : true
      })
      .done(function(datosr){
        alert("Ingresao");
        alert(datosr.mensaje);
        location.reload();
      })
    }



    $('.form_date').datetimepicker({
      language:  'es',
      weekStart: 1,
      todayBtn:  1,
      autoclose: 1,
      todayHighlight: 1,
      startView: 2,
      minView: 2,
      forceParse: 0
    });

    $('#filtrar').change(function () {
        var rex = new RegExp($(this).val(), 'i');
        $('.buscar tr').hide();
        $('.buscar tr').filter(function () {
            return rex.test($(this).text());
        }).show();
    })
    $('#filtrar').keyup(function () {
        var rex = new RegExp($(this).val(), 'i');
        $('.buscar tr').hide();
        $('.buscar tr').filter(function () {
            return rex.test($(this).text());
        }).show();
    })


  $.getJSON("sesiones.php", function(tablajson){
    $.each(tablajson, function(i, tablajson){
      // var datos_enviar = tablajson.id +", \""+tablajson.nombre+
      //     "\", \""+tablajson.hora_e+"\", \""+tablajson.hora_s+
      //     "\", \""+tablajson.dias+"\"";
      var desc = "\""+tablajson.descripcion+"\"";
      var datos_tabla = "<tr>"+
          "<td>"+tablajson.id_sesion+"</td>"+
          "<td>"+tablajson.grupo+"</td>"+
          "<td>"+tablajson.fecha+"</td>"+
          "<td><input type='button' class='btn btn-primary' value='Ver' onclick='ejercicios("+desc+")'></td>"+
        "</tr>";
      $("#tabla").append(datos_tabla);
    })
  })
})
