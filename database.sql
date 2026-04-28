-- =============================================
-- BASE DE DATOS: ejemplos
-- Sistema de Gestión de Usuarios
-- =============================================

-- Tabla de usuarios registrados (personas)
DROP TABLE IF EXISTS `Usuarios`;
CREATE TABLE `Usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `newsletter` tinyint(1) NOT NULL DEFAULT 0,
  `genero` varchar(10) NOT NULL,
  `pais` varchar(50) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `fecha_registro` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla de usuarios del sistema (para login)
DROP TABLE IF EXISTS `UsuariosSistema`;
CREATE TABLE `UsuariosSistema` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `rol` ENUM('admin', 'vista') NOT NULL DEFAULT 'vista',
  `fecha_creacion` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertar usuarios de prueba
-- Contraseñas: admin123 y usuario123 (hasheadas con password_hash)
INSERT INTO `UsuariosSistema` (`username`, `password`, `rol`) VALUES
('admin', '$2y$10$8K1p/a0dR1xqM8k.8Szo/.uLqj5OXuRNgBc.XWxvH6yCxgJVG0Kg.', 'admin'),
('usuario', '$2y$10$LgzGkVpJdqF3.WG5YeJ5/.uBXKD7yYnD7Gk.tB.J9eRv1QKxqI6Hy', 'vista');

-- Insertar algunos usuarios de ejemplo en la tabla Usuarios
INSERT INTO `Usuarios` (`nombre`, `newsletter`, `genero`, `pais`, `fecha_nacimiento`) VALUES
('Juan Pérez García', 1, 'masculino', 'mexico', '1990-05-15'),
('María López Hernández', 0, 'femenino', 'espana', '1985-08-22'),
('Carlos Rodríguez', 1, 'masculino', 'argentina', '1995-03-10');
