<?php
require_once '../conexion.php';
$con = new Conexion();
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    if (
        isset($json['usuario'])
        && isset($json['contraseña']) && isset($json['fecha'])
        && isset($json['peso']) && isset($json['altura'])
        && isset($json['e-mail']) && isset($json['actividades'])
    ) {
        $json['actividades'] = implode(",", $json['actividades']);

        $usuario = $json['usuario'];
        $contraseña = $json['contraseña'];
        $peso = $json['peso'];
        $altura = $json['altura'];
        $email = $json['e-mail'];
        $actividades = $json['actividades'];

        $sql = "UPDATE usuario SET usuario='$usuario',
        contraseña='$contraseña', peso='$peso',
        altura='$altura',email='$email', actividades='$actividades' WHERE usuario='$usuario'";
        echo $sql;
        try {
            $con->query($sql);
            header("HTTP/1.1 200 OK");
            echo json_encode($id);
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(['msg' => "accion no realizada"]);
        }
    } else {
        header("HTTP/1.1 401 Bad Request");
    }
    exit;
}
