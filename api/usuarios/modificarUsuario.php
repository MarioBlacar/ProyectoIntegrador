<?php
require_once '../conexion.php';
$con = new Conexion();
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    if (
        isset($_POST['nombre']) && isset($_POST['usuario'])
        && isset($_POST['contraseña']) && isset($_POST['fecha'])
        && isset($_POST['peso']) && isset($_POST['altura'])
        && isset($_POST['e-mail']) && isset($_POST['actividades'])
    ) {
        // el id se debe cambiar
        $id = 1;
        $nombre = $_POST['nombre'];
        $usuario = $_POST['usuario'];
        $contraseña = $_POST['contraseña'];
        $fecha = $_POST['fecha'];
        $peso = $_POST['peso'];
        $altura = $_POST['altura'];
        $email = $_POST['e-mail'];
        $actividades = $_POST['actividades'];
        $sql = "UPDATE alumnos SET nombre='$nombre', usuario='$usuario',
     contraseña='$contraseña', fecha='$fecha', peso='$peso',
     altura='$altura',email='$email', actividades='$actividades' WHERE id='$id'";
        try {
            $con->query($sql);
            header("HTTP/1.1 200 OK");
            echo json_encode($id);
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 400 Bad Request");
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
    exit;
}
