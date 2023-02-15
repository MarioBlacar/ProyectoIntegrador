<?php
require '../vendor/autoload.php';
require_once '../conexion.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$con = new Conexion();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);

    if (
        isset($json['nombre']) && isset($json['usuario'])
        && isset($json['contraseña']) && isset($json['fecha'])
        && isset($json['peso']) && isset($json['altura'])
        && isset($json['email']) && isset($json['actividades'])
    ) {
        $json['actividades'] = implode(",", $json['actividades']);

        $nombre = $json['nombre'];
        $usuario = $json['usuario'];
        $contraseña = $json['contraseña'];
        $fecha = $json['fecha'];
        $peso = $json['peso'];
        $altura = $json['altura'];
        $email = $json['email'];
        $actividades = $json['actividades'];
        $sql = "INSERT INTO usuario ( nombre, usuario, contraseña,
     email, altura, peso, actividades) VALUES ('$nombre','$usuario', '$contraseña', '$email',
     '$altura', '$peso', '$actividades')";
        echo $sql;
        try {
            $con->query($sql);
            $id = $con->insert_id;
            header("HTTP/1.1 201 Created");
            $key = 'ga$p4sh0';
            $payload = [
                'id' => $id
            ];
            $jwt = JWT::encode($payload, $key, 'HS256');
            echo json_encode(['token' => $jwt]);
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 400 Bad Request");
        }
    } else {
        header("HTTP/1.1 401 Bad Request");
    }
    exit;
}
