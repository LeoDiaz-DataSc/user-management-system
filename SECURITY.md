# Security Policy (ISO 27001 Alignment)

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| v2.0.x  | :white_check_mark: |
| v1.0.x  | :x:                |

## Reporting a Vulnerability

Por favor, no reporte vulnerabilidades de seguridad a través de issues públicos de GitHub.
Envíe un correo a [security@example.com](mailto:security@example.com). Reportaremos la recepción en 24 horas y proporcionaremos una estimación de resolución técnica.

## Enterprise Security Features
- **IAM Authentication**: Integración de JWT Tokens con caducidad (8h) e invalidación de sesión.
- **RBAC**: Control de acceso granular basado en roles.
- **Audit Logging**: Trazabilidad completa de accesos (IP, Usuario, Acción) almacenados en base de datos.
- **Cryptography**: Encriptación Bcrypt (Cost 12) / SHA-256 para contraseñas y datos sensibles.
