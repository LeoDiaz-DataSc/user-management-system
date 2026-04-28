<?php
/**
 * Database Configuration
 * 
 * This file contains all database connection parameters.
 * In production, these values should come from environment variables.
 */

// Load from .env if available, otherwise use defaults
$servidor = getenv('DB_HOST') ?: "localhost";
$usuario = getenv('DB_USER') ?: "root";
$contrasena = getenv('DB_PASSWORD') ?: "";
$basededatos = getenv('DB_NAME') ?: "ejemplos";

/**
 * Get a database connection
 * @return mysqli Database connection object
 */
function getConnection() {
    global $servidor, $usuario, $contrasena, $basededatos;
    
    $conn = new mysqli($servidor, $usuario, $contrasena, $basededatos);
    
    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }
    
    $conn->set_charset("utf8mb4");
    return $conn;
}
?>
