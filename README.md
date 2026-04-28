# 👥 User Management System — Sistema de Gestión de Usuarios

[![PHP](https://img.shields.io/badge/PHP-7.4+-777BB4?logo=php&logoColor=white)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

A **User Management System** with authentication, role-based access control, and full CRUD operations. Built with PHP, MySQL, and modern CSS design featuring gradient styling and responsive layout.

---

## 📸 Screenshots

> _Screenshots coming soon — the application features a registration form, login page, admin panel with user table, and role-based views._

---

## 🎯 Features

| Feature | Description |
|---------|-------------|
| 📝 **User Registration** | Name, newsletter, gender, country, birthdate |
| 🔐 **Secure Login** | BCrypt password hashing with `password_hash()` |
| 👮 **Role-Based Access** | `admin` (full CRUD) and `vista` (read-only) roles |
| ✏️ **Edit Users** | Inline editing from admin panel |
| 🗑️ **Delete Users** | Confirmation dialog before deletion |
| 🛡️ **SQL Injection Protection** | Prepared statements throughout |
| 📱 **Responsive Design** | Modern CSS with gradients, hover effects, and mobile support |

---

## 🏗️ Architecture

**Pattern:** Page Controller — each PHP file handles both routing logic and view rendering.

```
┌─────────────────────┐
│   Browser (Client)   │
├─────────────────────┤
│  index.html          │ → Registration form
│  login.html          │ → Login form
├─────────────────────┤
│  login.php           │ → Authentication (BCrypt verify)
│  alta.php            │ → INSERT new user
│  editar.php          │ → UPDATE user
│  eliminar.php        │ → DELETE user
│  lista_admin.php     │ → Admin view (full CRUD)
│  lista_vista.php     │ → Read-only view
│  logout.php          │ → Session destroy
├─────────────────────┤
│  MySQL Database      │
│  ├── Usuarios        │ → Registered people
│  └── UsuariosSistema │ → Login credentials + roles
└─────────────────────┘
```

### Security Measures
- ✅ `password_hash()` with BCrypt for secure password storage
- ✅ `password_verify()` for authentication
- ✅ Prepared statements (`$stmt->bind_param`) to prevent SQL injection
- ✅ `htmlspecialchars()` for XSS prevention in output
- ✅ Session-based authentication with role verification

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | PHP 7.4+ |
| **Frontend** | HTML5, CSS3 |
| **Database** | MySQL 8.0 (InnoDB) |
| **Server** | Apache (XAMPP/WAMP) |
| **Auth** | BCrypt + Sessions |

---

## 📁 Project Structure

```
user-management-system/
├── index.html          # Registration form
├── login.html          # Login form
├── login.php           # Authentication handler
├── alta.php            # Create user
├── editar.php          # Edit user
├── eliminar.php        # Delete user
├── lista_admin.php     # Admin panel (full CRUD)
├── lista_vista.php     # Viewer panel (read-only)
├── logout.php          # Session logout
├── styles.css          # Modern CSS (gradients, responsive)
├── database.sql        # Database schema + seed data
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- PHP 7.4+
- MySQL 8.0
- Apache (XAMPP, WAMP, or similar)

### 1. Set up the Database
```bash
mysql -u root -p < database.sql
```

### 2. Configure Database Connection
Create a `config.php` or update credentials in PHP files:
```php
$servidor = "localhost";
$usuario = "root";
$contrasena = "your_password";
$basededatos = "ejemplos";  // Database name
```

### 3. Deploy
Copy project files to your web server's document root (e.g., `htdocs/`).

### 4. Test Accounts
| Username | Password | Role |
|----------|----------|------|
| `admin` | `admin123` | Admin (full CRUD) |
| `usuario` | `usuario123` | Vista (read-only) |

---

## 🔮 Roadmap

- [ ] Extract database config to `config.php`
- [ ] Add CSRF token protection
- [ ] Web version with Node.js API + React frontend
- [ ] Docker containerization
- [ ] Server-side validation improvements
- [ ] Pagination for user lists

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](./LICENSE) for details.

---

**Developed by [Leonardo Diaz](https://github.com/LeoDiaz-DataSc)**
