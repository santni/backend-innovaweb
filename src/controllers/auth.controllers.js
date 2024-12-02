// src/controllers/auth.controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db.config');

// Controlador de login para administrador
const loginAdmin = async (req, res) => {
    const { email, senha } = req.body;
    console.log(email, senha);
    

    try {
        // Verificar se o administrador existe
        const result = await pool.query('SELECT * FROM administrador WHERE email = $1', [email]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Administrador não encontrado' });
        }

        const admin = result.rows[0];

        // Comparar a senha
        const isPasswordValid = await bcrypt.compare(senha, admin.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: admin.id_administrador, super_adm: admin.super_adm }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        console.error('Erro no login de administrador:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

module.exports = { loginAdmin };


