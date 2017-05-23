<?php
  $con = mysqli_connect('localhost','root','') or die("Error al conectar " .mysql_error());
  mysqli_select_db($con, 'natacion') or die ("Error al seleccionar la Base de datos: " .mysql_error());

  if(!(empty($_POST['opcion']))){

    $opcion = $_POST['opcion'];
    if($opcion == 'guardar'){

        $id = $_POST['id'];
        $co = $_POST['control'];
        $no = $_POST['nombre'];
        $fe = $_POST['fecha'];

        $q = "SELECT * FROM asistencia where id=".$id." AND fecha='".$fe."';";
        $band = false;
        $res = mysqli_query($con, $q);
        if($row = mysqli_fetch_array($res)){
          $band = false;
        }else{
          $band = true;
        }
        if($band == true){
          $q =  "INSERT INTO asistencia (id, control, nombre, fecha) VALUES (".$id.", '".$co."', '".$no."', '".$fe."');";
          mysqli_query($con, $q);
        }else{
          $q = "DELETE FROM asistencia WHERE id=".$id." AND fecha='".$fe."';";
          mysqli_query($con, $q) or die ("Problema con query");
        }
    }
  }else{
    $q = "SELECT * FROM asistencia;";
    $resultado = mysqli_query($con, $q) or die ("Problema con query");
    $tabla = Array();
    while ($row = mysqli_fetch_array($resultado)){
      $id = $row['id'];
      $co = $row['control'];
      $fe = $row['fecha'];
      $no = $row['nombre'];

        $tabla[] = array('id' => $id, 'control' => $co, 'nombre' => $no, 'fecha' => $fe);

    }
    $datos = $tabla;
    echo json_encode($datos);
  }

 ?>
