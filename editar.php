<?php
session_start();

// Verificar si está logueado y es admin
if (!isset($_SESSION['rol']) || $_SESSION['rol'] !== 'admin') {
    header("Location: login.html");
    exit();
}

// Conexión a la base de datos (centralizada en config.php)
require_once 'config.php';
$conn = getConnection();

// PROCESAR LA ACTUALIZACIÓN (POST)
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $genero = $_POST['genero'];
    $pais = $_POST['pais'];
    $fecha_nacimiento = $_POST['fecha_nacimiento'];
    $newsletter = isset($_POST['newsletter']) ? 1 : 0;

    $stmt = $conn->prepare("UPDATE Usuarios SET nombre = ?, newsletter = ?, genero = ?, pais = ?, fecha_nacimiento = ? WHERE id = ?");
    $stmt->bind_param("sisssi", $nombre, $newsletter, $genero, $pais, $fecha_nacimiento, $id);

    if ($stmt->execute()) {
        header("Location: lista_admin.php");
        exit();
    } else {
        $error = "Error al actualizar: " . $stmt->error;
    }
    $stmt->close();
}

// CARGAR DATOS DEL USUARIO (GET)
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conn->prepare("SELECT * FROM Usuarios WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        $fila = $resultado->fetch_assoc();
    } else {
        die("Usuario no encontrado.");
    }
    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("ID no especificado.");
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Usuario</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <div class="container">
        <h2>Editar Usuario</h2>

        <?php if (isset($error)): ?>
            <div class="message message-error">
                <p>
                    <?php echo htmlspecialchars($error); ?>
                </p>
            </div>
        <?php endif; ?>

        <form action="editar.php" method="post">
            <input type="hidden" name="id" value="<?php echo $fila['id']; ?>">

            <div class="form-group">
                <label for="nombre">Nombre Completo:</label>
                <input type="text" id="nombre" name="nombre" value="<?php echo htmlspecialchars($fila['nombre']); ?>"
                    required>
            </div>

            <div class="checkbox-group">
                <label>
                    <input type="checkbox" name="newsletter" value="1" <?php echo ($fila['newsletter'] == 1) ? 'checked' : ''; ?>>
                    Suscribir al newsletter
                </label>
            </div>

            <div class="radio-group">
                <label>Género:</label>
                <label><input type="radio" name="genero" value="masculino" <?php echo ($fila['genero'] == 'masculino') ? 'checked' : ''; ?> required> Masculino</label>
                <label><input type="radio" name="genero" value="femenino" <?php echo ($fila['genero'] == 'femenino') ? 'checked' : ''; ?>> Femenino</label>
                <label><input type="radio" name="genero" value="otro" <?php echo ($fila['genero'] == 'otro') ? 'checked' : ''; ?>> Otro</label>
            </div>

            <div class="form-group">
                <label for="pais">País:</label>
                <select id="pais" name="pais" required>
                    <option value="mexico" <?php echo ($fila['pais'] == 'mexico') ? 'selected' : ''; ?>>México</option>
                    <option value="espana" <?php echo ($fila['pais'] == 'espana') ? 'selected' : ''; ?>>España</option>
                    <option value="argentina" <?php echo ($fila['pais'] == 'argentina') ? 'selected' : ''; ?>>Argentina
                    </option>
                    <option value="colombia" <?php echo ($fila['pais'] == 'colombia') ? 'selected' : ''; ?>>Colombia
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="fecha_nacimiento">Fecha de Nacimiento:</label>
                <input type="date" id="fecha_nacimiento" name="fecha_nacimiento"
                    value="<?php echo $fila['fecha_nacimiento']; ?>" required>
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-success">Guardar Cambios</button>
            </div>
        </form>

        <div class="text-center mt-20">
            <a href="lista_admin.php" class="link">← Cancelar y volver a la lista</a>
        </div>
    </div>
</body>

</html>