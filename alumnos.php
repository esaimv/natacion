<?php
  $con = mysqli_connect('localhost','root','') or die("Error al conectar " .mysql_error());
  mysqli_select_db($con, 'natacion') or die ("Error al seleccionar la Base de datos: " .mysql_error());

  if(!(empty($_POST['opcion']))){
    $opcion = $_POST['opcion'];
    if($opcion == 'guardar'){

      $no = $_POST['nombre'];
      $ca = $_POST['carrera'];
      $co = $_POST['control'];
      $se = $_POST['semestre'];
      $cu = $_POST['curp'];
      $sa = $_POST['sangre'];
      $fe = $_POST['fecha'];
      $tr = $_POST['traje'];
      $cl = $_POST['clasificacion'];
      $gr = $_POST['grupo'];

      $q = "INSERT INTO alumnos (nombre, carrera, control, semestre, curp, sangre, fecha, traje, clasificacion, grupo) VALUES ('".$no."', '".$ca."', ".$co.", ".$se.", '".$cu."', '".$sa."', '".$fe."', '".$tr."', '".$cl."', '".$gr."');";
      mysqli_query($con, $q) or die ("Problema con query");

      $q = "SELECT * FROM alumnos WHERE id = (SELECT MAX(id) from alumnos)";
      $res = mysqli_query($con, $q) or die ("Problema con query");
      while ($row = mysqli_fetch_array($res)){
        $id = $row['id'];
      }
      $datos['id'] = $id;
      $datos['mensaje'] = "Sesion agregada";

      echo json_encode($datos);

    }else{
      if($opcion == 'foto'){
        if($_FILES['foto']['type'] == 'image/png'){
          $tipo = '.png';
        }else{
          if($_FILES['foto']['type'] == 'image/jpg'){
            $tipo = '.jpg';
          }
        }
        $id = $_POST['id'];
        $nombre_archivo = "alumno".$id.$tipo;
        // $tipo_archivo = $_FILES['foto']['type'];
        $tmp_archivo = $_FILES['foto']['tmp_name'];
        $archivador = 'fotos/' . $nombre_archivo;
        move_uploaded_file($tmp_archivo, $archivador);

        $q = "UPDATE alumnos SET foto = '".$nombre_archivo."' WHERE id = ".$id.";";
        mysqli_query($con, $q) or die ("Problema con query");
        $datos['mensaje'] = "Guardado con exito";
        echo json_encode($datos);



      }else{
        if($opcion == 'actualizar'){

          $id = $_POST['id'];
          $no = $_POST['nombre'];
          $ca = $_POST['carrera'];
          $co = $_POST['control'];
          $se = $_POST['semestre'];
          $cu = $_POST['curp'];
          $sa = $_POST['sangre'];
          $fe = $_POST['fecha'];
          $tr = $_POST['traje'];
          $cl = $_POST['clasificacion'];
          $gr = $_POST['grupo'];

          mysqli_query($con, "UPDATE alumnos SET nombre='".$no."' WHERE id = ".$id.";");
          mysqli_query($con, "UPDATE alumnos SET carrera='".$ca."' WHERE id = ".$id.";");
          mysqli_query($con, "UPDATE alumnos SET control=".$co." WHERE id = ".$id.";");
          mysqli_query($con, "UPDATE alumnos SET semestre=".$se." WHERE id = ".$id.";");
          mysqli_query($con, "UPDATE alumnos SET curp='".$cu."' WHERE id = ".$id.";");
          mysqli_query($con, "UPDATE alumnos SET sangre='".$sa."' WHERE id = ".$id.";");
          mysqli_query($con, "UPDATE alumnos SET fecha='".$fe."' WHERE id = ".$id.";");
          mysqli_query($con, "UPDATE alumnos SET traje='".$tr."' WHERE id = ".$id.";");
          mysqli_query($con, "UPDATE alumnos SET clasificacion='".$cl."' WHERE id = ".$id.";");
          mysqli_query($con, "UPDATE alumnos SET grupo='".$gr."' WHERE id = ".$id.";");

          $datos['mensaje'] = "Alumno actualizado";
          echo json_encode($datos);
        }else{
          if($opcion == 'eliminar'){
            $id = $_POST['id'];
            $q = "DELETE FROM alumnos WHERE id=".$id.";";
            mysqli_query($con, $q) or die ("Problema con query");
            $datos['mensaje'] = "Alumno eliminado";
            echo json_encode($datos);
          }else{
            if($opcion == 'cambiarfoto'){
              $id = $_POST['id'];
              if($_FILES['foto']['type'] == 'image/png'){
                $tipo = '.png';
              }else{
                if($_FILES['foto']['type'] == 'image/jpg'){
                  $tipo = '.jpg';
                }
              }
              $nombre_archivo = "alumno".$id.$tipo;
              $tmp_archivo = $_FILES['foto']['tmp_name'];
              $archivador = 'fotos/' . $nombre_archivo;

              $res = mysqli_query($con, "SELECT * FROM alumnos WHERE id = ".$id.";") or die ("Problema con query");
              while ($row = mysqli_fetch_array($res)){
                $foto = $row['foto'];
              }
              if(unlink('fotos/'.$foto)){
                move_uploaded_file($tmp_archivo, $archivador);
                mysqli_query($con, "UPDATE alumnos SET foto='".$nombre_archivo."' WHERE id = ".$id.";");
              }
              move_uploaded_file($tmp_archivo, $archivador);
              mysqli_query($con, "UPDATE alumnos SET foto='".$nombre_archivo."' WHERE id = ".$id.";");
              echo json_encode($datos);
            }
          }
        }
      }
    }
  }else{
    $q = "SELECT * FROM alumnos;";
    $resultado = mysqli_query($con, $q) or die ("Problema con query");
    $tabla = Array();
    while ($row = mysqli_fetch_array($resultado)){
      $id = $row['id'];
      $no = $row['nombre'];
      $ca =  $row['carrera'];
      $co = $row['control'];
      $se = $row['semestre'];
      $sa = $row['sangre'];
      $fe = $row['fecha'];
      $cl = $row['clasificacion'];
      $gr = $row['grupo'];
      $cu = $row['curp'];
      $fo = $row['foto'];
      $tr = $row['traje'];

      $tabla[] = array('id' => $id, 'nombre' => $no, 'carrera' => $ca, 'control' => $co, 'semestre' => $se, 'sangre' => $sa, 'fecha' => $fe, 'clasificacion'  => $cl, 'grupo' => $gr,'curp'=> $cu, 'foto' => $fo, 'traje' => $tr);
      // $tabla['traje'] = $tr;
    }
    $datos = $tabla;
    echo json_encode($datos);
  }
 ?>
