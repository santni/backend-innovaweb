const express = require('express');
const router = express.Router();
const { getCursos, createCurso, updateCurso, deleteCurso } = require('../controllers/cursos.controllers');


router.get('/', getCursos);
router.post('/', createCurso);
router.put('/:id', updateCurso);
router.delete('/:id', deleteCurso);

module.exports = router;
