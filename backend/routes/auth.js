const express = require('express');
const router = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');
const logAction = require('../middleware/audit');

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        const [users] = await db.query(
            'SELECT ID_Usuario, ID_Rol, Username, Nombres, Apellidos FROM Usuarios WHERE Username = ? AND Password_Hash = SHA2(?, 256) AND Activo = TRUE',
            [username, password]
        );

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        if (users.length === 0) {
            // Log failed attempt
            await db.query('INSERT INTO Audit_Logs (Accion, Detalle, Direccion_IP) VALUES (?, ?, ?)', 
                ['LOGIN_FAILED', `Attempt for username: ${username}`, ip]);
                
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        const user = users[0];

        // Update Last Login
        await db.query('UPDATE Usuarios SET Ultimo_Login = CURRENT_TIMESTAMP WHERE ID_Usuario = ?', [user.ID_Usuario]);

        // Generate JWT
        const token = jwt.sign(
            { id: user.ID_Usuario, rolId: user.ID_Rol, username: user.Username },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        // Log successful attempt
        await db.query('INSERT INTO Audit_Logs (ID_Usuario, Accion, Detalle, Direccion_IP) VALUES (?, ?, ?, ?)', 
            [user.ID_Usuario, 'LOGIN_SUCCESS', 'User logged in successfully', ip]);

        res.json({ 
            success: true, 
            token, 
            user: { id: user.ID_Usuario, nombres: user.Nombres, rolId: user.ID_Rol } 
        });

    } catch (err) {
        next(err);
    }
});

module.exports = router;
