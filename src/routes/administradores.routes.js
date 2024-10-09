const express = require('express');
const router = express.Router();
const { getAdm, createAdm, updateAdm, deleteAdm } = require('../controllers/administradores.controllers'); 

router.get('/', getAdm);
router.post('/', createAdm);
router.put('/:id', updateAdm);
router.delete('/:id', deleteAdm);
app.put('/cursos/:id', verificaAdmin, async (req, res) => {
    const { id } = req.params;
    const { titulo, modalidade, nivel, descricao, turnos, status } = req.body;

    try {
        // Atualiza o curso com os dados fornecidos
        const result = await pool.query(`
            UPDATE cursos
            SET titulo = $1, modalidade = $2, nivel = $3, descricao = $4, turnos = $5, status = $6
            WHERE id_curso = $7
            RETURNING *;
        `, [titulo, modalidade, nivel, descricao, turnos, status, id]);

        if (result.rowCount > 0) {
            res.json({ message: 'Curso atualizado com sucesso', curso: result.rows[0] });
        } else {
            res.status(404).json({ message: 'Curso não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar curso:', error);
        res.status(500).send('Erro ao atualizar curso');
    }
});



module.exports = router;
