<?php
require 'includes/function.php';
require 'includes/database.php';


$servicios=ObtenerServicio();

echo json_encode($servicios);