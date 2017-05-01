//-- Funcion que hace al hacer click en editar
function alerta(id, nombre, hora_e, hora_s, dias){
  $("#nombre").val(nombre);
  $("#hora_entrada").val(hora_e);
  $("#hora_salida").val(hora_s);

  var arr = dias.split(' ');
  var dias2 = Array();
  for (var i = 1; i < arr.length; i++) {
    $("#"+arr[i]+"").attr("checked", true);
    dias2[i-1] = arr[i];
  }

  $("#actualizar").attr("disabled", false);
  $("#eliminar").attr("disabled", false);
  $("#guardar").attr("disabled", true);

  // Meter logica aqui para checkear los box
  // $("#"+dias+"").prop("checked", true);
  //----------------------------------------

  $(document).ready(function(){


    $("#hora_entrada").change(function(){
      hora_e = ($('select[id=hora_entrada]').val());
      $('#hora_entrada').val($(this).val());
    });

    $("#hora_salida").change(function(){
      hora_s = ($('select[id=hora_salida]').val());
      $('#hora_salida').val($(this).val());
    });

    $("#lunes").change(function(){
      if($.inArray('lunes', dias2)>=0){
        var remover = "lunes";
        dias2.splice($.inArray(remover, dias2),1);
      }else{
        dias2.push('lunes');
      }
    });
    $("#martes").change(function(){
      if($.inArray('martes', dias2)>=0){
        var remover = "martes";
        dias2.splice($.inArray(remover, dias2),1);
      }else{
        dias2.push('martes');
      }
    });
    $("#miercoles").change(function(){
      if($.inArray('miercoles', dias2)>=0){
        var remover = "miercoles";
        dias2.splice($.inArray(remover, dias2),1);
      }else{
        dias2.push('miercoles');
      }
    });
    $("#jueves").change(function(){
      if($.inArray('jueves', dias2)>=0){
        var remover = "jueves";
        dias2.splice($.inArray(remover, dias2),1);
      }else{
        dias2.push('jueves');
      }
    });
    $("#viernes").change(function(){
      if($.inArray('viernes', dias2)>=0){
        var remover = "viernes";
        dias2.splice($.inArray(remover, dias2),1);
      }else{
        dias2.push('viernes');
      }
    });
    $("#sabado").change(function(){
      if($.inArray('sabado', dias2)>=0){
        var remover = "sabado";
        dias2.splice($.inArray(remover, dias2),1);
      }else{
        dias2.push('sabado');
      }
    });

    $("#eliminar").click(function(){
      var datosel = {
        'id'  : id,
        'opcion'  : 'eliminar'
      }
      $.ajax({
        type    : 'POST',
        url     : 'grupos.php',
        data    : datosel,
        dataType: 'json',
        encode  : true
      })
      .done(function(datos){
        alert(datos.mensaje);
        location.reload();
      })
    })

    $("#actualizar").click(function(){
      var string = "";
      for (var i = 0; i < dias2.length; i++) {
        string += " " + dias2[i];
      }
      var datosact = {
        'id'    : id,
        'nombre': $("#nombre").val(),
        'hora_e': hora_e,
        'hora_s': hora_s,
        'dias'  : string,
        'opcion'  : 'actualizar'
      }

      $.ajax({
        type    : 'POST',
        url     : 'grupos.php',
        data    : datosact,
        dataType: 'json',
        encode  : true
      })
      .done(function(datos){
        alert(datos.mensaje);
        location.reload();
      })
    })
  })
}

//----Termina editar

$(document).ready(function(){


  getTabla();


  var dias = Array();
  var hora_entrada;
  var hora_salida;
  $("#hora_entrada").change(function(){
    hora_entrada = ($('select[id=hora_entrada]').val());
    $('#hora_entrada').val($(this).val());
  });

  $("#hora_salida").change(function(){
    hora_salida = ($('select[id=hora_salida]').val());
    $('#hora_salida').val($(this).val());
  });

  $("#lunes").change(function(){
    if($.inArray('lunes', dias)>=0){
      var remover = "lunes";
      dias.splice($.inArray(remover, dias),1);
    }else{
      dias.push('lunes');
    }
  });
  $("#martes").change(function(){
    if($.inArray('martes', dias)>=0){
      var remover = "martes";
      dias.splice($.inArray(remover, dias),1);
    }else{
      dias.push('martes');
    }
  });
  $("#miercoles").change(function(){
    if($.inArray('miercoles', dias)>=0){
      var remover = "miercoles";
      dias.splice($.inArray(remover, dias),1);
    }else{
      dias.push('miercoles');
    }
  });
  $("#jueves").change(function(){
    if($.inArray('jueves', dias)>=0){
      var remover = "jueves";
      dias.splice($.inArray(remover, dias),1);
    }else{
      dias.push('jueves');
    }
  });
  $("#viernes").change(function(){
    if($.inArray('viernes', dias)>=0){
      var remover = "viernes";
      dias.splice($.inArray(remover, dias),1);
    }else{
      dias.push('viernes');
    }
  });
  $("#sabado").change(function(){
    if($.inArray('sabado', dias)>=0){
      var remover = "sabado";
      dias.splice($.inArray(remover, dias),1);
    }else{
      dias.push('sabado');
    }
  });

  $("#guardar").click(function(){
    var string = "";
    for (var i = 0; i < dias.length; i++) {
      string += " " + dias[i];
    }
    var datos={
      'nombre'        : $("#nombre").val(),
      'hora_entrada'  : hora_entrada,
      'hora_salida'   : hora_salida,
      'dias'          : string,
      'opcion'  : 'agregar'
    };

    $.ajax({
      type     : 'POST',
      url      : 'grupos.php',
      data     : datos,
      dataType : 'json',
      encode   : true
    })

    .done(function(recibir){
      alert(recibir.mensaje);
      location.reload();
    })
  });
  //-------- Funcion cargar tabla ----------------------
  function getTabla(){
      $.getJSON("grupos.php", function(tablajson){
        $.each(tablajson, function(i, tablajson){
          var datos_enviar = tablajson.id +", \""+tablajson.nombre+
              "\", \""+tablajson.hora_e+"\", \""+tablajson.hora_s+
              "\", \""+tablajson.dias+"\"";

          var datos_tabla = "<tr>"+
              "<td>"+tablajson.id+"</td>"+
              "<td>"+tablajson.nombre+"</td>"+
              "<td>"+tablajson.hora_e+"</td>"+
              "<td>"+tablajson.hora_s+"</td>"+
              "<td>"+tablajson.dias+"</td>"+
              "<td><input type='button' class='btn btn-primary' value='Editar' onclick='alerta("+datos_enviar+")'></td>"+
            "</tr>";
          $("#tabla").append(datos_tabla);
        })
      })
  }
});
