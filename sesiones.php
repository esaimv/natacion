<?php

  $con = mysqli_connect('localhost','root','') or die("Error al conectar " .mysql_error());
  mysqli_select_db($con, 'natacion') or die ("Error al seleccionar la Base de datos: " .mysql_error());

  if(!(empty($_POST['opcion']))){
    $opcion = $_POST['opcion'];
    //Si la opcion es agregar
    if($opcion == 'agregar'){
      // Variables de entrada
      $fecha = $_POST['fecha'];
      $gupo  = $_POST['grupo'];
      $descripcion = $_POST['descripcion'];
      //Vairbale de query
      $q = "INSERT INTO sesion (grupo, fecha, descripcion) "+
            "VALUES (".$grupo.", '".$fecha."', '".$descripcion."');";
      mysqli_query($con, $q) or die ("Problema con query");
      $datos['mensaje'] = "Sesion agregada";
    }else{
      $q = "SELECT * FROM grupos LEFT JOIN ...."// FALTAAA
      $res = mysqli_query($con, $q) or die ("Problema con query");
      $tabla = Array();
      while ($row = mysqli_fetch_array($res)){
        $id = $row['id'];
        $nombre = $row['nombre'];
        $hora_e = $row['hora_entrada'];
        $hora_s = $row['hora_salida'];
        $dias = $row['dias'];

        $tabla[] = array('id' => $id, 'nombre' => $nombre, 'hora_e' => $hora_e, 'hora_s' => $hora_s, 'dias' => $dias);
      }
      $datos = $tabla;
    }
  }else{
    $q = "SELECT * FROM sesiones;"
    $resultado = mysqli_query($con, $q) or die ("Problema con query");

    while ($row = mysqli_fetch_array($resultado)){
      $id = $row['id_sesion'];
      $grupo = $row['grupo'];
      $fecha =  $row['fecha'];
      $descripcion = $row['descripcion'];

      $tabla = array('id_sesion' => $id, 'grupo' => $grupo, 'fecha' => $fecha, 'descripcion' => $descripcion);
    }
    $datos = $tabla;
  }
 ?>
