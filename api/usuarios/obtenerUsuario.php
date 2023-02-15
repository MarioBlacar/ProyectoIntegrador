<?php
require '../vendor/autoload.php';
require_once '../conexion.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$con = new Conexion();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = file_get_contents('php://input');
    $usuario  = json_decode($json);

    $username = $usuario->usuario;
    $pass = $usuario->contraseña;
    $sql = "SELECT `usuario`, `contraseña` ,`id` FROM `usuario` WHERE usuario='$username' AND contraseña='$pass'";

    try {
        // $con->query($sql);
        $result = $con->query($sql)->fetch_all(MYSQLI_ASSOC);
        if ($result) {
            $key = 'ga$p4sh0';
            $payload = [
                'id' => $result[0]['id'],
            ];
            $jwt = JWT::encode($payload, $key, 'HS256');
            // $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
            // $decoded_array = (array) $decoded;
            header("HTTP/1.1 200 OK");
            echo json_encode(['token' => $jwt]);
        } else {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(['msg' => "Usuario o contraseña invalidos"]);
        }
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 401 Bad Request");
        echo json_encode(['msg' => "error"]);
    }
    exit;
}
header("HTTP/1.1 401 Bad Request");
