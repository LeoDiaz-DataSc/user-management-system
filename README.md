# User Management System

[![PHP](https://img.shields.io/badge/PHP-7.4+-777BB4?logo=php&logoColor=white)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

## Overview

A user management system with authentication, role-based access control (RBAC), and full CRUD operations. Built with PHP, MySQL, and modern CSS. The system implements the Page Controller pattern where each PHP file handles routing, business logic, and view rendering for its designated operation.

## Security Implementation

| Measure | Implementation |
|---------|---------------|
| **Password Storage** | BCrypt hashing via `password_hash()` / `password_verify()` |
| **SQL Injection Prevention** | Prepared statements with `bind_param()` throughout |
| **XSS Prevention** | Output encoding via `htmlspecialchars()` |
| **Session Management** | Server-side PHP sessions with role verification |
| **Centralized Configuration** | Database credentials isolated in `config.php` with environment variable support |

## Architecture

**Pattern:** Page Controller — each PHP file serves as an independent controller handling its HTTP request lifecycle.

```
Browser -> index.html / login.html    (Static forms)
        -> login.php                  (Authentication: BCrypt verify, session init)
        -> alta.php                   (INSERT operation)
        -> editar.php                 (UPDATE operation)
        -> eliminar.php               (DELETE operation)
        -> lista_admin.php            (Admin view: full CRUD table)
        -> lista_vista.php            (Viewer: read-only table)
        -> logout.php                 (Session termination)
        -> config.php                 (Database connection factory)
        -> MySQL (Usuarios, UsuariosSistema)
```

### Role-Based Access Control

| Role | Permissions |
|------|------------|
| `admin` | Full CRUD operations, user management |
| `vista` | Read-only access to user listings |

## Technology Stack

| Component | Technology |
|-----------|-----------|
| Backend | PHP 7.4+ |
| Frontend | HTML5, CSS3 (gradient styling, responsive) |
| Database | MySQL 8.0 (InnoDB) |
| Server | Apache (XAMPP / WAMP) |
| Auth | BCrypt + Server-side Sessions |

## Installation

### Prerequisites
- PHP 7.4+, MySQL 8.0, Apache

```bash
mysql -u root -p < database.sql
```

Configure credentials in `config.php` or via environment variables.

### Test Accounts

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | admin |
| usuario | usuario123 | vista |

## Roadmap

- [ ] CSRF token protection
- [ ] Node.js REST API + React frontend migration
- [ ] Docker containerization
- [ ] Server-side input validation enhancement
- [ ] Pagination for user listings

## License

MIT License. See [LICENSE](./LICENSE).

**Developed by [Leonardo Diaz](https://github.com/LeoDiaz-DataSc)**

---

# Version en Espanol

## Descripcion General

Sistema de gestion de usuarios con autenticacion, control de acceso basado en roles (RBAC) y operaciones CRUD completas. Construido con PHP, MySQL y CSS moderno. El sistema implementa el patron Page Controller donde cada archivo PHP maneja enrutamiento, logica de negocio y renderizado de vista para su operacion designada.

## Implementacion de Seguridad

| Medida | Implementacion |
|--------|---------------|
| **Almacenamiento de Contrasenas** | Hashing BCrypt mediante `password_hash()` / `password_verify()` |
| **Prevencion de Inyeccion SQL** | Sentencias preparadas con `bind_param()` en todo el sistema |
| **Prevencion de XSS** | Codificacion de salida mediante `htmlspecialchars()` |
| **Gestion de Sesiones** | Sesiones PHP del lado del servidor con verificacion de rol |
| **Configuracion Centralizada** | Credenciales de BD aisladas en `config.php` con soporte de variables de entorno |

## Arquitectura

**Patron:** Page Controller — cada archivo PHP sirve como controlador independiente.

```
Navegador -> index.html / login.html    (Formularios estaticos)
          -> login.php                  (Autenticacion: verificacion BCrypt, inicio de sesion)
          -> alta.php                   (Operacion INSERT)
          -> editar.php                 (Operacion UPDATE)
          -> eliminar.php               (Operacion DELETE)
          -> lista_admin.php            (Vista admin: tabla CRUD completa)
          -> lista_vista.php            (Vista lectura: tabla solo lectura)
          -> logout.php                 (Terminacion de sesion)
          -> config.php                 (Fabrica de conexion a BD)
          -> MySQL (Usuarios, UsuariosSistema)
```

## Instalacion

### Requisitos Previos
- PHP 7.4+, MySQL 8.0, Apache

```bash
mysql -u root -p < database.sql
```

Configure credenciales en `config.php` o mediante variables de entorno.

## Hoja de Ruta

- [ ] Proteccion con tokens CSRF
- [ ] Migracion a API REST Node.js + frontend React
- [ ] Contenedorizacion con Docker
- [ ] Mejora de validacion de entradas del lado del servidor
- [ ] Paginacion para listados de usuarios

**Desarrollado por [Leonardo Diaz](https://github.com/LeoDiaz-DataSc)**
