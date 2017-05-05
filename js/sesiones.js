$(document).ready(function(){
  getTabla();
  function getTabla(){
    $.getJSON("sesiones.php", function(tablajson){
      $.each(tablajson, function(i, tablajson){
        var datos_enviar = tablajson.id +", \""+tablajson.nombre+
            "\", \""+tablajson.hora_e+"\", \""+tablajson.hora_s+
            "\", \""+tablajson.dias+"\"";

        var datos_tabla = "<tr>"+
            "<td>"+tablajson.id+"</td>"+
            "<td>"+tablajson.grupo+"</td>"+
            "<td>"+tablajson.Fecha+"</td>"+
            "<td><input type='button' class='btn btn-primary' value='Editar' onclick='alerta("+datos_enviar+")'></td>"+
          "</tr>";
        $("#tabla").append(datos_tabla);
      })
    })
  }
})
