<?php
session_start();

// Conexión a la base de datos (centralizada en config.php)
require_once 'config.php';
$conn = getConnection();

// Recibir datos del formulario
$username = $_POST['username'];
$password = $_POST['password'];

// Buscar usuario en la base de datos
$stmt = $conn->prepare("SELECT id, username, password, rol FROM UsuariosSistema WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$resultado = $stmt->get_result();

$error = "";

if ($resultado->num_rows === 1) {
    $user = $resultado->fetch_assoc();

    // Verificar contraseña
    if (password_verify($password, $user['password'])) {
        // Iniciar sesión
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['rol'] = $user['rol'];

        // Redirigir según el rol
        if ($user['rol'] === 'admin') {
            header("Location: lista_admin.php");
        } else {
            header("Location: lista_vista.php");
        }
        exit();
    } else {
        $error = "Contraseña incorrecta";
    }
} else {
    $error = "Usuario no encontrado";
}

$stmt->close();
$conn->close();
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error de Login</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <div class="container">
        <div class="message message-error">
            <h2>Error de Autenticación</h2>
            <p>
                <?php echo htmlspecialchars($error); ?>
            </p>
        </div>
        <div class="text-center mt-20">
            <a href="login.html" class="btn btn-primary">Volver a intentar</a>
        </div>
    </div>
</body>

</html>