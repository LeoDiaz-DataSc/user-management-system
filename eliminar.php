<?php
session_start();

// Verificar si está logueado y es admin
if (!isset($_SESSION['rol']) || $_SESSION['rol'] !== 'admin') {
    header("Location: login.html");
    exit();
}

// Verificar que se proporcionó un ID
if (!isset($_GET['id'])) {
    header("Location: lista_admin.php");
    exit();
}

$id_a_borrar = $_GET['id'];

// Conexión a la base de datos (centralizada en config.php)
require_once 'config.php';
$conn = getConnection();

// Usar prepared statement para seguridad
$stmt = $conn->prepare("DELETE FROM Usuarios WHERE id = ?");
$stmt->bind_param("i", $id_a_borrar);
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eliminar Usuario</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <div class="container">
        <?php if ($stmt->execute()): ?>
            <div class="message message-success">
                <h2>Usuario Eliminado</h2>
                <p>El usuario ha sido eliminado correctamente.</p>
            </div>
            <p class="text-center">Serás redirigido en 2 segundos...</p>
            <meta http-equiv="refresh" content="2; url=lista_admin.php">
        <?php else: ?>
            <div class="message message-error">
                <h2>Error al Eliminar</h2>
                <p>
                    <?php echo $stmt->error; ?>
                </p>
            </div>
            <div class="text-center mt-20">
                <a href="lista_admin.php" class="btn btn-primary">Volver a la lista</a>
            </div>
        <?php endif; ?>
    </div>
</body>

</html>
<?php
$stmt->close();
$conn->close();
?>