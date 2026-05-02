<?php
session_start();

// Verificar si está logueado
if (!isset($_SESSION['rol'])) {
    header("Location: login.html");
    exit();
}

// Conexión a la base de datos (centralizada en config.php)
require_once 'config.php';
$conn = getConnection();

// Obtener todos los usuarios
$sql = "SELECT * FROM Usuarios ORDER BY fecha_registro DESC";
$resultado = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ver Usuarios</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <div class="container container-wide">
        <div class="header">
            <h2>Lista de Usuarios</h2>
            <div class="user-info">
                <span class="user-badge badge-vista">Vista:
                    <?php echo htmlspecialchars($_SESSION['username']); ?>
                </span>
                <a href="logout.php" class="btn btn-secondary btn-sm">Cerrar Sesión</a>
            </div>
        </div>

        <?php if ($resultado->num_rows > 0): ?>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Newsletter</th>
                        <th>Género</th>
                        <th>País</th>
                        <th>Fecha Nac.</th>
                        <th>Fecha Registro</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($fila = $resultado->fetch_assoc()): ?>
                        <tr>
                            <td>
                                <?php echo $fila['id']; ?>
                            </td>
                            <td>
                                <?php echo htmlspecialchars($fila['nombre']); ?>
                            </td>
                            <td>
                                <?php echo $fila['newsletter'] ? '✓ Sí' : '✗ No'; ?>
                            </td>
                            <td>
                                <?php echo ucfirst(htmlspecialchars($fila['genero'])); ?>
                            </td>
                            <td>
                                <?php echo ucfirst(htmlspecialchars($fila['pais'])); ?>
                            </td>
                            <td>
                                <?php echo date('d/m/Y', strtotime($fila['fecha_nacimiento'])); ?>
                            </td>
                            <td>
                                <?php echo date('d/m/Y H:i', strtotime($fila['fecha_registro'])); ?>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        <?php else: ?>
            <div class="message">
                <p>No hay usuarios registrados.</p>
            </div>
        <?php endif; ?>
    </div>
</body>

</html>
<?php
$conn->close();
?>