<?php
// Conexión a la base de datos (centralizada en config.php)
require_once 'config.php';
$conn = getConnection();

// Recibir datos del formulario
$nombre = $_POST['nombre'];
$newsletter = isset($_POST['newsletter']) ? 1 : 0;
$genero = $_POST['genero'];
$pais = $_POST['pais'];
$fecha_nacimiento = $_POST['fecha_nacimiento'];

// Preparar consulta para evitar inyección SQL
$stmt = $conn->prepare("INSERT INTO Usuarios (nombre, newsletter, genero, pais, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sisss", $nombre, $newsletter, $genero, $pais, $fecha_nacimiento);

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Usuario</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <?php if ($stmt->execute()): ?>
            <div class="message message-success">
                <h2>¡Registro Exitoso!</h2>
                <p>El usuario <strong><?php echo htmlspecialchars($nombre); ?></strong> ha sido registrado correctamente.</p>
            </div>
            <p class="text-center">Serás redirigido al login en 3 segundos...</p>
            <meta http-equiv="refresh" content="3; url=login.html">
        <?php else: ?>
            <div class="message message-error">
                <h2>Error en el Registro</h2>
                <p><?php echo $stmt->error; ?></p>
            </div>
            <div class="text-center mt-20">
                <a href="index.html" class="btn btn-primary">Volver al formulario</a>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
<?php
$stmt->close();
$conn->close();
?>
