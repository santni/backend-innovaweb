const express = require('express');
const router = express.Router();
const { getCursos, createCurso, updateCurso, deleteCurso } = require('../controllers/cursos.controllers');


router.get('/cursos', getCursos);
router.post('/cursos', createCurso);
router.put('/cursos/:id', updateCurso);
router.delete('/cursos/:id', deleteCurso);

module.exports = router;
