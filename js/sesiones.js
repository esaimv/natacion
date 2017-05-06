function ejercicios(desc){
  alert(desc);
}

$(document).ready(function(){
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
