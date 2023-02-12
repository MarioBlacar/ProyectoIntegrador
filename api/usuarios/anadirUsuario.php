<?php
require_once '../conexion.php';
$con = new Conexion();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (
        isset($_POST['nombre']) && isset($_POST['usuario'])
        && isset($_POST['contraseña']) && isset($_POST['fecha'])
        && isset($_POST['peso']) && isset($_POST['altura'])
        && isset($_POST['e-mail']) && isset($_POST['actividades'])
    ) {
        // el id se debe cambiar
        $id=1;
        $nombre = $_POST['nombre'];
        $usuario = $_POST['usuario'];
        $contraseña = $_POST['contraseña'];
        $fecha = $_POST['fecha'];
        $peso = $_POST['peso'];
        $altura = $_POST['altura'];
        $email = $_POST['e-mail'];
        $actividades = $_POST['actividades'];
        $sql = "INSERT INTO usuario (id, nombre, usuario, contraseña,
     email, altura, peso, actividades) VALUES ('$id','$nombre','$usuario', '$contraseña', '$email',
     '$altura', '$peso', '$actividades')";
        try {
            $con->query($sql);
            header("HTTP/1.1 201 Created");
            echo json_encode($con->insert_id);
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 400 Bad Request");
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
    exit;
}
