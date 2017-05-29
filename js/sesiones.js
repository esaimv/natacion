function ejercicios(desc){
  $("#texto").empty();
  $("#modal_ejercicio").modal('toggle');
  $("#texto").append(desc);
}

function ejercicios_modal(id_sesion, grupo, fecha, descripcion, id_grupo){
  descripcion = descripcion.replace(/<br>/gi, '\r\n');
  $("#guardar").attr("disabled", true);
  $("#actualizar").attr("disabled", false);
  $("#eliminar").attr("disabled", false);
  $("#cerrar_modal").trigger('click');
  $("#descripcion").val(descripcion);
  $("#fecha").val(fecha);
  $("#grupo > option[value="+id_grupo+"]").attr("selected",true)

  $(document).ready(function(){
    $("#eliminar").click(function(){
      var datosel = {
        'id'  : id_sesion,
        'opcion'  : 'eliminar'
      }
      $.ajax({
        type    : 'POST',
        url     : 'sesiones.php',
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
      if(false){
        alert("Debe llenar todo los campos")
      }else{
        var datos = {
          'id_grupo'   : $("#grupo option:selected").val(),
          'id_sesion'   : id_sesion,
          'fecha'       : $("#fecha").val(),
          'ejercicio'  : $("#descripcion").val(),
          'opcion'      : 'actualizar'
        };
        $.ajax({
          type    : 'POST',
          url     : 'sesiones.php',
          data    : datos,
          dataType: 'json',
          encode  : true
        })
        .done(function(datosr){
          alert(datosr.mensaje);
          location.reload();
        })
      }
    })
    $("#eliminar").click(function(){
    })
  })
}

$(document).ready(function(){
    $(window).resize(width_modal)
    width_modal()
    obtenergrupos();
    $("#guardar").click(ingresar_sesion);
    $("#buscar").click(obtenergrupos_modal);
    $("#agregar").click(agregar_ejercicio);
    $("#ejercicio").keypress(function(e) {
    if(e.which == 13) {
        agregar_ejercicio()
    }
});
    function width_modal(){
    Width = $(window).width();
      if(Width<=970){
        $("#modal-dialog").width('initial')
      }else{
        $("#modal-dialog").width('80%')
      }
    }

    function agregar_ejercicio(){
      if($("#descripcion").val() == ""){
          $("#descripcion").val($("#ejercicio").val())
      }else {
          $("#descripcion").val($("#descripcion").val() + "\r\n" +$("#ejercicio").val())
      }
      $("#ejercicio").val("");
      $("#ejercicio").focus();
    }

    function obtenergrupos(){
      $.getJSON('grupos.php', function(grupos){
        $.each(grupos, function(i, grupos){
          $("#grupo").append('<option value="'+grupos.id+'">'+grupos.nombre+'</option>');
        })
      })
    }

    function obtenergrupos_modal(){
      $("#tabla-body").empty();
      $.getJSON("sesiones.php", function(tablajson){
        $.each(tablajson, function(i, tablajson){
          tablajson.descripcion = tablajson.descripcion.replace(/\r\n/gi, '<br>');
          tablajson.descripcion = tablajson.descripcion.replace(/\n/gi, '<br>');
          tablajson.descripcion = tablajson.descripcion.replace(/\r/gi, '<br>');
          var datos_enviar = tablajson.id_sesion +", \""+tablajson.grupo+
               "\", \""+tablajson.fecha+"\", \""+tablajson.descripcion+"\", \""+tablajson.id_grupo+"\"";
          // var desc = "\""+tablajson.descripcion+"\"";
          var datos_tabla = "<tr>"+
              "<td>"+tablajson.id_sesion+"</td>"+
              "<td>"+tablajson.grupo+"</td>"+
              "<td>"+tablajson.fecha+"</td>"+
              "<td><input type='button' class='btn btn-primary' value='Editar' onclick='ejercicios_modal("+datos_enviar+")'></td>"+
            "</tr>";
          $("#tabla_modal").append(datos_tabla);
         })
      })
    }
    function ingresar_sesion(){
      if(false){
        alert("Debe llenar todo los campos")
      }else{
        var datos = {
          'id_grupo'   : $("#grupo option:selected").val(),
          'fecha'       : $("#fecha").val(),
          'ejercicio'  : $("#descripcion").val(),
          'opcion'      : 'agregar'
        }
        $.ajax({
          type    : 'POST',
          url     : 'sesiones.php',
          data    : datos,
          dataType: 'json',
          encode  : true
        })
        .done(function(datosr){
          alert(datosr.mensaje);
          location.reload();
        })
      }
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
      desc = desc.replace(/\r\n/gi, "<br>");
      desc = desc.replace(/\n/gi, "<br>");
      desc = desc.replace(/\r/gi, "<br>");
      var datos_tabla = "<tr>"+
          "<td>"+tablajson.id_sesion+"</td>"+
          "<td>"+tablajson.grupo+"</td>"+
          "<td>"+tablajson.fecha+"</td>"+
          "<td><input type='button' class='btn btn-primary' value='Ver ejercicios' onclick='ejercicios("+desc+")'></td>"+
        "</tr>";
      $("#tabla").append(datos_tabla);
    })
  })
})

function validar_campos(){
  if( $("#descripcion").val() == "" || $("#fecha").val() == ""){
    var band = false;
  }else{
    var band = true;
  }
  return band;
}
