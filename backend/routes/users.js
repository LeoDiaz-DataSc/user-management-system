const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { verifyToken, checkPermission } = require('../middleware/auth');
const logAction = require('../middleware/audit');

// Todas las rutas de usuarios requieren estar autenticado
router.use(verifyToken);

// Obtener todos los usuarios (Requiere permiso users.read)
router.get('/', checkPermission('users.read'), async (req, res, next) => {
    try {
        const [users] = await db.query(`
            SELECT u.ID_Usuario, u.Username, u.Email, u.Nombres, u.Apellidos, r.Nombre_Rol, u.Activo, u.Ultimo_Login
            FROM Usuarios u
            JOIN Roles r ON u.ID_Rol = r.ID_Rol
        `);
        res.json({ success: true, data: users });
    } catch (err) {
        next(err);
    }
});

// Crear usuario (Requiere permiso users.create)
router.post('/', checkPermission('users.create'), logAction('CREATE_USER'), async (req, res, next) => {
    try {
        const { id_rol, username, email, password, nombres, apellidos } = req.body;
        
        await db.query(
            'INSERT INTO Usuarios (ID_Rol, Username, Email, Password_Hash, Nombres, Apellidos) VALUES (?, ?, ?, SHA2(?, 256), ?, ?)',
            [id_rol, username, email, password, nombres, apellidos]
        );
        res.status(201).json({ success: true, message: 'Usuario creado exitosamente' });
    } catch (err) {
        next(err);
    }
});

// Desactivar usuario (Requiere permiso users.delete)
router.delete('/:id', checkPermission('users.delete'), logAction('DEACTIVATE_USER'), async (req, res, next) => {
    try {
        await db.query('UPDATE Usuarios SET Activo = FALSE WHERE ID_Usuario = ?', [req.params.id]);
        res.json({ success: true, message: 'Usuario desactivado' });
    } catch (err) {
        next(err);
    }
});

// Ver logs de auditoría (Requiere permiso audit.read)
router.get('/audit-logs', checkPermission('audit.read'), async (req, res, next) => {
    try {
        const [logs] = await db.query(`
            SELECT a.*, u.Username 
            FROM Audit_Logs a 
            LEFT JOIN Usuarios u ON a.ID_Usuario = u.ID_Usuario 
            ORDER BY a.Fecha_Hora DESC LIMIT 100
        `);
        res.json({ success: true, data: logs });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
