<?php
require '../vendor/autoload.php';
require_once '../conexion.php';

$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $sql = "SELECT * FROM rutas WHERE 1";
        if (isset($_GET['buscarId'])) {
            $idRuta = $_GET['buscarId'];
            $sql .= " AND idRutas='$idRuta'";
        }
        if (isset($_GET['buscarUsuario'])) {
            $usuario = $_GET['buscarUsuario'];
            $sql .= " AND creador='$usuario'";
        }
        if (isset($_GET['buscarNombre'])) {
            $nombreRuta = $_GET['buscarNombre'];
            $sql .= " AND nombreRuta='$nombreRuta'";
        }
        if (isset($_GET['buscarLocalidad'])) {
            $localidad = $_GET['buscarLocalidad'];
            $sql .= " AND localidad='$localidad'";
        }
        if (isset($_GET['buscarDistanciaMinima'])) {
            $distanciaMinima = $_GET['buscarDistanciaMinima'];
            $sql .= " AND distancia>'$distanciaMinima'";
        }
        if (isset($_GET['buscarDistanciaMaxima'])) {
            $distanciaMaxima = $_GET['buscarDistanciaMaxima'];
            $sql .= " AND distancia<'$distanciaMaxima'";
        }

        $result = $con->query($sql);
        $rutas = $result->fetch_all(MYSQLI_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($rutas);
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
        echo json_encode(["no se encuentran rutas"]);
    }
    exit;
}
header("HTTP/1.1 400 Bad Request");
echo json_encode(["error"]);
