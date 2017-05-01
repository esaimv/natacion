<?php

  $con = mysqli_connect('localhost','root','') or die("Error al conectar " .mysql_error());
  mysqli_select_db($con, 'natacion') or die ("Error al seleccionar la Base de datos: " .mysql_error());

  if(!(empty($_POST['opcion']))){
    $opcion = $_POST['opcion'];

    if($opcion ==  "agregar"){
      $nombre = $_POST['nombre'];
      $hora_entrada = $_POST['hora_entrada'];
      $hora_salida = $_POST['hora_salida'];
      $dias = $_POST['dias'];

      $q = "INSERT INTO grupos (nombre, hora_entrada, hora_salida, dias )VALUES ('".$nombre."', '".$hora_entrada."', '".$hora_salida."', '".$dias."');";

      mysqli_query($con, $q) or die ("Problema con query");

      $datos['mensaje'] = "Grupo ingresado";

    }else {
      if ($opcion == "actualizar") {
        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        $hora_e = $_POST['hora_e'];
        $hora_s = $_POST['hora_s'];
        $dias = $_POST['dias'];

        mysqli_query($con, "UPDATE grupos SET nombre='".$nombre."' WHERE id = ".$id.";");
        mysqli_query($con, "UPDATE grupos SET hora_entrada='".$hora_e."' WHERE id = ".$id.";");
        mysqli_query($con, "UPDATE grupos SET hora_salida='".$hora_s."' WHERE id = ".$id.";");
        mysqli_query($con, "UPDATE grupos SET dias='".$dias."' WHERE id = ".$id.";");
        $datos['mensaje'] = "Grupo actualizado";
        //echo json_encode($datos)
      }else{
        if ($opcion == "eliminar") {
          $id = $_POST['id'];
          $q = "DELETE FROM grupos WHERE id=".$id.";";
          mysqli_query($con, $q) or die ("Problema con query");
          $datos['mensaje'] = "Grupo eliminado";
          //echo json_encode($datos);
        }
      }
    }
  }else{

    $q = "select * from grupos;";
    $resultado = mysqli_query($con, $q);

    $tabla = Array();
    while ($row = mysqli_fetch_array($resultado)){
      $id = $row['id'];
      $nombre = $row['nombre'];
      $hora_e = $row['hora_entrada'];
      $hora_s = $row['hora_salida'];
      $dias = $row['dias'];

      $tabla[] = array('id' => $id, 'nombre' => $nombre, 'hora_e' => $hora_e, 'hora_s' => $hora_s, 'dias' => $dias);
    }
    $datos = $tabla;
  }
  mysqli_close($con);
  echo json_encode($datos);

 ?>
