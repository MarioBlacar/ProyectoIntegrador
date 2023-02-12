<?php
require_once '../conexion.php';
$con = new Conexion();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM usuario WHERE 1 ";
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql .= "AND id='$id'";
    } elseif (isset($_GET['usuario']) && isset($_GET['contraseña'])) {
        $usuario = $_GET['usuario'];
        $contraseña = $_GET['contraseña'];
        $sql .= "AND usuario='$usuario' AND contraseña='$contraseña'";
    } elseif (count($_GET) > 0) {
        header("HTTP/1.1 404 Bad Request");
        exit;
    }
    try {
        $result = $con->query($sql);
        $usuarios = $result->fetch_all(MYSQLI_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($usuarios);
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}
