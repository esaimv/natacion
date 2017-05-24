<?php
$con = mysqli_connect('localhost','root','') or die("Error al conectar " .mysql_error());
  mysqli_select_db($con, 'natacion') or die ("Error al seleccionar la Base de datos: " .mysql_error());

  if(!(empty($_POST['opcion']))){
    $opcion = $_POST['opcion'];

    if($opcion == 'guardar'){

      $no = $_POST['nombre'];
      $ed = $_POST['edad'];
      $pe = $_POST['peso'];
      $ta = $_POST['talla'];
      $do = $_POST['doce'];
      $abd = $_POST['abd'];
      $lg = $_POST['lagxm'];
      $sa = $_POST['salto'];
      $flex = $_POST['flex'];

      $q = "INSERT INTO bateria (nombre, edad, peso, talla, doce, abd, lagxm, salto, flex) VALUES ('".$no."', ".$ed.", '".$pe."', '".$ta."', '".$do."', '".$abd."', '".$lg."', '".$sa."', '".$flex."');";

      mysqli_query($con, $q) or die ("Problema con query");

			$datos['mensaje'] = "Guardado correctamente";

			echo json_encode($datos);
    }else{
      if($opcion == 'actualizar'){

        $id = $_POST['id'];
        $no = $_POST['nombre'];
        $ed = $_POST['edad'];
        $pe = $_POST['peso'];
        $ta = $_POST['talla'];
        $do = $_POST['doce'];
        $abd = $_POST['abd'];
        $lg = $_POST['lagxm'];
        $sa = $_POST['salto'];
        $flex = $_POST['flex'];

        mysqli_query($con, "UPDATE bateria SET nombre='".$no."' WHERE id = ".$id.";");
        mysqli_query($con, "UPDATE bateria SET edad=".$ed." WHERE id = ".$id.";");
        mysqli_query($con, "UPDATE bateria SET peso=".$pe." WHERE id = ".$id.";");
        mysqli_query($con, "UPDATE bateria SET talla='".$ta."' WHERE id = ".$id.";");
        mysqli_query($con, "UPDATE bateria SET doce='".$do."' WHERE id = ".$id.";");
        mysqli_query($con, "UPDATE bateria SET abd='".$abd."' WHERE id = ".$id.";");
        mysqli_query($con, "UPDATE bateria SET lagxm='".$lg."' WHERE id = ".$id.";");
        mysqli_query($con, "UPDATE bateria SET salto='".$sa."' WHERE id = ".$id.";");
        mysqli_query($con, "UPDATE bateria SET flex='".$flex."' WHERE id = ".$id.";");

          $datos['mensaje'] = "Registro actualizado";
          echo json_encode($datos);
      }else{
          if($opcion == 'eliminar'){
            $id = $_POST['id'];
            $q = "DELETE FROM bateria WHERE id=".$id.";";
            mysqli_query($con, $q) or die ("Problema con query");
            $datos['mensaje'] = "Registro liminado";
            echo json_encode($datos);
          }
      }
    }
  }else{
      $q = "SELECT * FROM bateria;";

      $res = mysqli_query($con, $q) or die ("Problema con query");
      $tabla = Array();
      while ($row = mysqli_fetch_array($res)){
        $id = $row['id'];
        $no = $row['nombre'];
        $ed = $row['edad'];
        $pe = $row['peso'];
        $ta = $row['talla'];
        $do = $row['doce'];
        $abd = $row['abd'];
        $lg = $row['lagxm'];
        $sa = $row['salto'];
        $flex = $row['flex'];

        $tabla[] = array('id' => $id, 'nombre' => $no, 'edad' => $ed, 'peso' => $pe, 'talla' => $ta, 'doce' => $do, 'abd' => $abd, 'lagxm' => $lg, 'salto' => $sa, 'flex' => $flex);
      }

      $datos = $tabla;
      echo json_encode($datos);
  }
?>
