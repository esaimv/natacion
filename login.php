<?php
  $vacio = "Debe ingresar un usuario y contraseña validos";
  $incorrectos = "Usuario y/o contraseña incorrectos";
  $datos['error'] = "false";
  if(!(empty($_POST['login']))){
    if(!(empty($usuario = $_POST['usuario']))){
      if(!(empty($clave = $_POST['clave']))){
        if($usuario == "admin" && $clave == "123456"){
          $datos['url'] =  "principal.html";
          session_start();
          $_SESSION['usuario'] = "Administrador";
          $_SESSION['logged'] = true;
        }else{
          $datos['error'] = $incorrectos;
        }
      }else{
        $datos['error'] = $vacio;
      }
    }else{
      $datos['error'] = $vacio;
    }
  }else{
    session_start();
    if(!(empty($_SESSION))){
      if($_SESSION['logged']){
        $sesion['usuario'] = $_SESSION['usuario'];
        $sesion['sesion'] = true;
      }else{
        $sesion['sesion'] == false;
      }
    }else{
      $sesion['sesion'] = false;
    }
    $datos = $sesion;
  }
  echo json_encode($datos);
 ?>
