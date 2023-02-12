<?php
require_once '../conexion.php';
$con = new Conexion();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $sql = "SELECT * FROM usuario";
        $result = $con->query($sql);
        $usuarios = $result->fetch_all(MYSQLI_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($usuarios);
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}
header("HTTP/1.1 400 Bad Request");
