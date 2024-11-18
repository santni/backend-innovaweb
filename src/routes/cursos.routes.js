const express = require('express');
const router = express.Router();
const { getCursos, getCursoById, createCurso, updateCurso, deleteCurso, getCursosPorIdade, getCursosPorModalidade, getCursosPorNivel, getCursosPorTurno, } = require('../controllers/cursos.controllers');


router.get('/', getCursos);
router.post('/', createCurso);
router.put('/:id', updateCurso);
router.delete('/:id', deleteCurso);
router.get('/idade/:idade', getCursosPorIdade);
router.get('/modalidade/:modalidade', getCursosPorModalidade);
router.get('/nivel/:nivel', getCursosPorNivel);
router.get('/turno/:turno', getCursosPorTurno);
router.get('/cursos/:id', getCursoById)





module.exports = router;
