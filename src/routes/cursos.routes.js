const express = require('express');
const router = express.Router();
const { getCursos, createCurso, updateCurso, deleteCurso, getCursosPorIdade } = require('../controllers/cursos.controllers');


router.get('/', getCursos);
router.post('/', createCurso);
router.put('/:id', updateCurso);
router.delete('/:id', deleteCurso);
router.get('/idade/:idade', getCursosPorIdade);


module.exports = router;
