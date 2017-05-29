

  function editar_alumno(id, no, ca, co, se, sa, fe, cl, cu, fo, tr, gr){
    $("#modal_alumnos").modal('toggle');
    $("#nombre").val(no)
    $("#carrera").val(ca)
    $("#nocontrol").val(co)
    $("#semestre").val(se)
    $("#curp").val(cu)
    $("#sangre").val(sa)
    $("#fecha").val(fe)
    $("#traje").val(tr)
    $("#clasificacion").val(cl)
    $("#grupo").val(gr)
    $("#imgfoto").attr('src', 'fotos/'+fo);
    $("#guardar").attr('disabled', true);
    $("#actualizar").attr('disabled', false);
    $("#eliminar").attr('disabled', false);

    $(document).ready(function(){
      var cambiarfoto = false;
      $("#foto").change(function(){
        cambiarfoto = true;
      })

      $("#eliminar").click(function(){
        var datosel = {
          'id'  : id,
          'opcion'  : 'eliminar'
        }
        $.ajax({
          type    : 'POST',
          url     : 'alumnos.php',
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
          alert("Se deben llenar todos los campos")
        }else{
          var datos = {
            'id'            : id,
            'nombre'        : $("#nombre").val(),
            'carrera'       : $("#carrera").val(),
            'control'    : $("#nocontrol").val(),
            'semestre'      : $("#semestre").val(),
            'curp'          : $("#curp").val(),
            'sangre'          : $("#sangre").val(),
            'fecha'         : $("#fecha").val(),
            'traje'         : $("#traje").val(),
            'clasificacion' : $("#clasificacion").val(),
            'grupo'        : $("#grupo").val(),
            'opcion'        : 'actualizar'
          }
          $.ajax({
            type    : 'POST',
            url     : 'alumnos.php',
            data    : datos,
            dataType: 'json',
            encode  : true
          })
          .done(function(datosr){
            if(cambiarfoto){
              var inputFileImage = document.getElementById("foto");
              var file = inputFileImage.files[0];
              var data = new FormData();

              data.append('foto', file);
              data.append('opcion', 'cambiarfoto');
              data.append('id', id);
              var url = "alumnos.php";
              $.ajax({
                  url: url,
                  type: 'POST',
                  contentType: false,
                  data: data,
                  processData: false,
                  cache: false
              }).done(function(data){
                  alert("Actualizado correctamente")
                  location.reload();
              });
            }else{
              alert(datosr.mensaje);
              location.reload();
            }
          })
        }
      })
    })
  }

  $(document).ready(function(){
    obtener_grupos();

    $('.form_date').datetimepicker(opciones_time);

    $("#guardar").click(guardar_alumno);
    $("#buscar").click(alumnos_modal);

    $('#filtrar').change(filtrar);
    $('#filtrar').keyup(filtrar);

    $(window).resize(width_modal);
    width_modal();

  })

  function width_modal(){
    Width = $(window).width();
    if(Width<=970){
      $("#modal-dialog").width('initial')
    }else{
      $("#modal-dialog").width('80%')
    }
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

  function alumnos_modal(){
    $("#tabla-body").empty();
    $.getJSON("alumnos.php", function(tablajson){
      $.each(tablajson, function(i, tablajson){
        var datos_enviar = tablajson.id +", \""+tablajson.nombre+
             "\", \""+tablajson.carrera+"\", "+tablajson.control+", "+tablajson.semestre+""+
             ", \""+tablajson.sangre+"\", \""+tablajson.fecha+"\", \""+tablajson.clasificacion+""+
             "\", \""+tablajson.curp+"\", \""+tablajson.foto+"\", \""+tablajson.traje+"\", \""+tablajson.grupo+"\"";
        var datos_tabla = "<tr>"+
            "<td>"+tablajson.id+"</td>"+
            "<td>"+tablajson.nombre+"</td>"+
            "<td>"+tablajson.carrera+"</td>"+
            "<td>"+tablajson.control+"</td>"+
            "<td>"+tablajson.semestre+"</td>"+
            "<td>"+tablajson.sangre+"</td>"+
            "<td>"+tablajson.fecha+"</td>"+
            "<td>"+tablajson.clasificacion+"</td>"+
            "<td>"+tablajson.grupo+"</td>"+
            "<td><input type='button' class='btn btn-primary' value='Editar' onclick='editar_alumno("+datos_enviar+")'></td>"+
          "</tr>";
        $("#tabla_modal").append(datos_tabla);
      })
    })
    $("#filtrar").focus();
  }

  function guardar_alumno(){
    if(false){
      alert("Se deben llenar todos los campos")
    }else{
      var datos = {
        'nombre'        : $("#nombre").val(),
        'carrera'       : $("#carrera").val(),
        'control'       : $("#nocontrol").val(),
        'semestre'      : $("#semestre").val(),
        'curp'          : $("#curp").val(),
        'sangre'        : $("#sangre").val(),
        'fecha'         : $("#fecha").val(),
        'traje'         : $("#traje").val(),
        'clasificacion' : $("#clasificacion").val(),
        'grupo'        : $("#grupo").val(),
        'opcion'        : 'guardar'
      }
      $.ajax({
        type    : 'POST',
        url     : 'alumnos.php',
        data    : datos,
        dataType: 'json',
        encode  : true
      })
      .done(function(datosr){
        uploadAjax(datosr.id);
        location.reload();
      })
    }
  }

  function uploadAjax(id) {
    var inputFileImage = document.getElementById("foto");
    var file = inputFileImage.files[0];
    var data = new FormData();

    data.append('foto', file);
    data.append('opcion', 'foto');
    data.append('id', id);
    var url = "alumnos.php";
    $.ajax({
        url: url,
        type: 'POST',
        contentType: false,
        data: data,
        processData: false,
        cache: false
    }).done(function(data){
    		alert("Guardado correctamente")
    })
  }
