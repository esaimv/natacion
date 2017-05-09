<?php

  $con = mysqli_connect('localhost','root','') or die("Error al conectar " .mysql_error());
  mysqli_select_db($con, 'natacion') or die ("Error al seleccionar la Base de datos: " .mysql_error());

  if(!(empty($_POST['opcion']))){

    $opcion = $_POST['opcion'];
    //Si la opcion es agregar
    if($opcion == 'agregar'){
      // Variables de entrada
      $fecha = $_POST['fecha'];
      $id_grupo  = $_POST['id_grupo'];
      $ejercicio = $_POST['ejercicio'];
      //Vairbale de query

      //$q = "INSERT INTO sesiones (id_grupo, ejercicios, fecha) VALUES (2, '2', '2');";
       $q = "INSERT INTO sesiones (id_grupo, ejercicios, fecha) VALUES (".$id_grupo.", '".$ejercicio."', '".$fecha."');";
      mysqli_query($con, $q) or die ("Problema con query");
      $datos['mensaje'] = "Sesion agregada";

    }else{
      if($opcion == 'actualizar'){
        $id_sesion = $_POST['id_sesion'];
        $fecha = $_POST['fecha'];
        $id_grupo  = $_POST['id_grupo'];
        $ejercicios = $_POST['ejercicio'];

        mysqli_query($con, "UPDATE sesiones SET id_grupo='".$id_grupo."' WHERE id_sesiones = ".$id_sesion.";");
        mysqli_query($con, "UPDATE sesiones SET fecha='".$fecha."' WHERE id_sesiones = ".$id_sesion.";");
        mysqli_query($con, "UPDATE sesiones SET ejercicios='".$ejercicios."' WHERE id_sesiones = ".$id_sesion.";");

        $datos['mensaje'] = "Grupo actualizado";
      }else{
        if ($opcion == "eliminar") {
          $id = $_POST['id'];
          $q = "DELETE FROM sesiones WHERE id_sesiones=".$id.";";
          mysqli_query($con, $q) or die ("Problema con query");
          $datos['mensaje'] = "Grupo eliminado";
          //echo json_encode($datos);
        }
      }

    //   $res = mysqli_query($con, $q) or die ("Problema con query");
    //   $tabla = Array();
    //   while ($row = mysqli_fetch_array($res)){
    //     $id = $row['id'];
    //     $nombre = $row['nombre'];
    //     $hora_e = $row['hora_entrada'];
    //     $hora_s = $row['hora_salida'];
    //     $dias = $row['dias'];
    //
    //     $tabla[] = array('id' => $id, 'nombre' => $nombre, 'hora_e' => $hora_e, 'hora_s' => $hora_s, 'dias' => $dias);
    //   }
    //   $datos = $tabla;
    }
  }else{
    $q = "SELECT * FROM sesiones;";
    $resultado = mysqli_query($con, $q) or die ("Problema con query");
    $tabla = Array();
    while ($row = mysqli_fetch_array($resultado)){
      $id = $row['id_sesiones'];
      $id_grupo = $row['id_grupo'];
      $fecha =  $row['fecha'];
      $descripcion = $row['ejercicios'];
      $q2 = "SELECT nombre from grupos where id=".$id_grupo.";";
      $r_grupo = mysqli_fetch_array(mysqli_query($con, $q2));

      $tabla[] = array('id_sesion' => $id, 'grupo' => $r_grupo['nombre'], 'fecha' => $fecha, 'descripcion' => $descripcion, 'id_grupo' => $id_grupo);
    }
    $datos = $tabla;
  }
  mysqli_close($con);
  echo json_encode($datos);
 ?>
