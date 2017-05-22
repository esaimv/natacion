<?php 

	$con = mysqli_connect('localhost','root','') or die("Error al conectar " .mysql_error());
  	mysqli_select_db($con, 'natacion') or die ("Error al seleccionar la Base de datos: " .mysql_error());

  	if(!(empty($_POST['opcion']))){
	    $opcion = $_POST['opcion'];
	    if($opcion == 'guardar'){

			$no = $_POST['nombre'];
			$ej = $_POST['ejercicio'];
			$fe = $_POST['fecha'];      
			$ti = $_POST['tiempo'];

			$q = "INSERT INTO chequeo (nombre, fecha, ejercicio, tiempo) VALUES ('".$no."', '".$fe."', '".$ej."', ".$ti.");";
			mysqli_query($con, $q) or die ("Problema con query");

			$datos['mensaje'] = "Guardado correctamente";

			echo json_encode($datos);

	    }else{
    	    if($opcion == 'actualizar'){

	          	$id = $_POST['id'];
	          	$no = $_POST['nombre'];
	      		$ej = $_POST['ejercicio'];
	      		$fe = $_POST['fecha'];      
	      		$ti = $_POST['tiempo'];

		        mysqli_query($con, "UPDATE chequeo SET nombre='".$no."' WHERE id = ".$id.";");
		        mysqli_query($con, "UPDATE chequeo SET fecha='".$fe."' WHERE id = ".$id.";");
		        mysqli_query($con, "UPDATE chequeo SET ejercicio=".$ej." WHERE id = ".$id.";");
		        mysqli_query($con, "UPDATE chequeo SET tiempo=".$ti." WHERE id = ".$id.";");          

          		$datos['mensaje'] = "Registro actualizado";
          		echo json_encode($datos);
        	}else{
          		if($opcion == 'eliminar'){
	            	$id = $_POST['id'];
	            	$q = "DELETE FROM chequeo WHERE id=".$id.";";
	            	mysqli_query($con, $q) or die ("Problema con query");
	            	$datos['mensaje'] = "Registro liminado";
	            	echo json_encode($datos);
          		}
        	}
    	}    
  	}else{
    	$q = "SELECT * FROM chequeo;";
    	$resultado = mysqli_query($con, $q) or die ("Problema con query");
    	$tabla = Array();
    	while ($row = mysqli_fetch_array($resultado)){
	      	$id = $_POST['id'];
    	  	$no = $_POST['nombre'];
  			$ej = $_POST['ejercicio'];
  			$fe = $_POST['fecha'];      
	    	$ti = $_POST['tiempo'];

	      	$tabla[] = array('id' => $id, 'nombre' => $no, 'fecha' => $fe, 'ejercicio' => $ej, 'tiempo' => $ti);
	      	      	
    	}
    	$datos = $tabla;
    	echo json_encode($datos);
  	}
 ?>
