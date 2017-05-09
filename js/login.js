$(document).ready(function(){
  $("#usuario").keypress(function(e){
    if(e.which == 13) {
      validar_login()
    }
  })
  $("#clave").keypress(function(e) {
    if(e.which == 13) {
      validar_login()
    }
  })
  var href = window.location.pathname;

  if(href != "/natacion/index.html"){
    obtener_sesion();
  }
  function obtener_sesion(){
    $.getJSON("login.php", function(sesion){
      if(sesion.sesion){
        $("#usuario").text(sesion.usuario);
      }else{
        if(!(window.location.href == "index.html")){
          window.location.href = "index.html";
        }
      }
    })
  }

  $("#login").click(validar_login)

  function validar_login(){
    var datos = {
      usuario : $("#usuario").val(),
      clave   : $("#clave").val(),
      login  : true
    }
    var opciones = {
      url       : 'login.php',
      type      : 'POST',
      data      : datos,
      dataType  : 'json'
    }
    $.ajax(opciones)
      .done(function(respuesta){
        if(respuesta.error == "false"){
          window.location.href = respuesta.url;
        }else {
          alert(respuesta.error);
        }
      })
    }
  })
