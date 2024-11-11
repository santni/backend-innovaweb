const express = require('express');
const router = express.Router();
const { getCursos, createCurso, updateCurso, deleteCurso, getCursosPorIdade, getCursosPorModalidade, getCursosPorNivel, getCursosPorTurno, } = require('../controllers/cursos.controllers');


router.get('/', getCursos);
router.post('/', createCurso);
router.put('/:id', updateCurso);
router.delete('/:id', deleteCurso);
router.get('/idade/:idade', getCursosPorIdade);
router.get('/modalidade/:modalidade', getCursosPorModalidade);
router.get('/nivel/:nivel', getCursosPorNivel);
router.get('/turno/:turno', getCursosPorTurno);



module.exports = router;
