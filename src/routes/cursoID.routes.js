const express = require('express');
const { getCursoById } = require('../controllers/cursos.controllers');
const router = express.Router();


// Rota para buscar curso pelo ID
router.get('/:id', getCursoById);

module.exports = router;
