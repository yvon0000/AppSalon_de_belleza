<?php
function ObtenerServicio () : array{



//importar la connexion
require 'database.php';
//consulta sql
$sql= "select * from servicios";


//ejecutar la sql
$resultado=mysqli_query($db,$sql);
//echo"<pre>";
//var_dump(mysqli_fetch_assoc($resultado));
//echo "</pre>";
$servicios =[];
$i =0;
while($row=mysqli_fetch_assoc($resultado)){
    $servicios[$i]["id"] = $row["id"];
    $servicios[$i] ["nombre"]= $row["nombre"];
    $servicios[$i] ["precio"] = $row["precio"];
    $i++;
 

}
//echo"<pre>";
//var_dump($servicios);
   // echo"</pre>";
   return $servicios;
}
ObtenerServicio();