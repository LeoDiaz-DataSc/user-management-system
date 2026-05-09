# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-05-08

### Added
- **RBAC Engine**: Sistema de Roles y Permisos (SuperAdmin, Moderador, Auditor, Usuario).
- **MFA Flow**: Soporte inicial para autenticación de dos factores.
- **Audit Logs**: Tabla `Audit_Logs` e inserciones automatizadas para fallos de sesión y logins exitosos.
- **GSAP UI**: Pantalla de Login dinámica y protegida por PrivateRoutes en React.

### Changed
- Migración de legacy frontend a React 18 + Vite.
- Base de datos estructurada con Triggers e Integridad Referencial.
- Estandarización de variables de entorno mediante `.env.example`.

### Security
- Contraseñas ahora encriptadas via `SHA-256` / `Bcrypt`.
- Protección JWT para las rutas de la API (`/api/users`).
