// src/routes/auth.routes.js
const express = require('express');
const { loginAdmin } = require('../controllers/auth.controllers.js'); // Importar o controlador de autenticação
const router = express.Router();

// Rota de login
router.post('/login', loginAdmin);

module.exports = router;