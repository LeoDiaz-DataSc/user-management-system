-- =============================================
-- BASE DE DATOS: iam_system
-- Identity and Access Management (Enterprise)
-- =============================================

CREATE DATABASE IF NOT EXISTS iam_system;
USE iam_system;

-- 1. Tabla de Roles (RBAC)
CREATE TABLE IF NOT EXISTS Roles (
    ID_Rol INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_Rol VARCHAR(50) UNIQUE NOT NULL,
    Descripcion TEXT
) ENGINE=InnoDB;

-- 2. Tabla de Permisos (RBAC)
CREATE TABLE IF NOT EXISTS Permisos (
    ID_Permiso INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_Permiso VARCHAR(100) UNIQUE NOT NULL,
    Descripcion TEXT
) ENGINE=InnoDB;

-- 3. Tabla Relacional Rol_Permisos
CREATE TABLE IF NOT EXISTS Rol_Permisos (
    ID_Rol INT NOT NULL,
    ID_Permiso INT NOT NULL,
    PRIMARY KEY (ID_Rol, ID_Permiso),
    FOREIGN KEY (ID_Rol) REFERENCES Roles(ID_Rol) ON DELETE CASCADE,
    FOREIGN KEY (ID_Permiso) REFERENCES Permisos(ID_Permiso) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Tabla de Usuarios del Sistema (IAM)
CREATE TABLE IF NOT EXISTS Usuarios (
    ID_Usuario INT PRIMARY KEY AUTO_INCREMENT,
    ID_Rol INT NOT NULL,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password_Hash VARCHAR(255) NOT NULL,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Genero VARCHAR(20),
    Pais VARCHAR(50),
    Fecha_Nacimiento DATE,
    Newsletter BOOLEAN DEFAULT FALSE,
    MFA_Enabled BOOLEAN DEFAULT FALSE,
    Activo BOOLEAN DEFAULT TRUE,
    Ultimo_Login DATETIME,
    Fecha_Creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_Rol) REFERENCES Roles(ID_Rol)
) ENGINE=InnoDB;

-- 5. Tabla de Auditoría (Trazabilidad)
CREATE TABLE IF NOT EXISTS Audit_Logs (
    ID_Log INT PRIMARY KEY AUTO_INCREMENT,
    ID_Usuario INT,
    Accion VARCHAR(100) NOT NULL,
    Detalle TEXT,
    Direccion_IP VARCHAR(45),
    Fecha_Hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario) ON DELETE SET NULL
) ENGINE=InnoDB;

-- =============================================
-- INSERTS INICIALES (BOOTSTRAP)
-- =============================================

INSERT INTO Roles (Nombre_Rol, Descripcion) VALUES 
('SuperAdmin', 'Acceso total al sistema'),
('Moderador', 'Puede gestionar usuarios pero no roles'),
('Auditor', 'Solo lectura de logs de auditoría'),
('Usuario', 'Acceso básico');

INSERT INTO Permisos (Nombre_Permiso, Descripcion) VALUES 
('users.create', 'Crear usuarios'),
('users.read', 'Ver usuarios'),
('users.update', 'Editar usuarios'),
('users.delete', 'Eliminar usuarios'),
('roles.manage', 'Gestionar roles y permisos'),
('audit.read', 'Ver logs de auditoría');

-- Asignar todos los permisos al SuperAdmin (ID 1)
INSERT INTO Rol_Permisos (ID_Rol, ID_Permiso) 
SELECT 1, ID_Permiso FROM Permisos;

-- Asignar permisos al Moderador (ID 2)
INSERT INTO Rol_Permisos (ID_Rol, ID_Permiso) VALUES 
(2, 1), (2, 2), (2, 3); -- Crear, Leer, Editar usuarios

-- Insertar SuperAdmin Inicial (Password: Admin123!)
INSERT INTO Usuarios (ID_Rol, Username, Email, Password_Hash, Nombres, Apellidos) VALUES 
(1, 'admin', 'admin@iam.local', SHA2('Admin123!', 256), 'System', 'Administrator');
