<?php
require '../vendor/autoload.php';
require_once '../conexion.php';

$con = new Conexion();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);

    if (
        isset($json['nombreRuta']) && isset($json['descripcion'])
        && isset($json['latitud']) && isset($json['longitud'])
        && isset($json['distancia']) && isset($json['localidad'])
    ) {

        $nombreRuta = $json['nombreRuta'];
        $descripcion = $json['descripcion'];
        $latitud = $json['latitud'];
        $longitud = $json['longitud'];
        $distancia = $json['distancia'];
        $localidad = $json['localidad'];
        $creador = $json['creador'];
        $sql = "INSERT INTO rutas ( nombreRuta, descripcion, latitudInicio,
        longitudInicio, distancia, localidad, creador) VALUES ('$nombreRuta','$descripcion', '$latitud', '$longitud',
     '$distancia', '$localidad', '$creador')";
        echo $sql;
        try {
            $con->query($sql);
            $id = $con->insert_id;
            header("HTTP/1.1 201 Created");
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 400 Bad Request");
        }
    } else {
        header("HTTP/1.1 401 Bad Request");
    }
    exit;
}
