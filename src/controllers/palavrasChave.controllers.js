const pool = require('../config/db.config'); 

const getPalavrasChave = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM palavras_chaves');
        res.json({
            total: result.rowCount,
            palavras_chaves: result.rows,
        });
    } catch (error) {
        console.error('Erro ao obter palavras-chave:', error);
        res.status(500).send('Erro ao obter palavras-chave');
    }
};

const createPalavraChave = async (req, res) => {
    const { palavras } = req.body;

    if (!palavras) {
        return res.status(400).send({ message: 'Preencha o campo palavra' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO palavras_chaves (palavras) VALUES ($1) RETURNING *',
            [palavras]
        );
        res.status(201).json({ message: 'Palavra-chave cadastrada com sucesso', palavra: result.rows[0] });
    } catch (error) {
        console.error('Erro ao criar palavra-chave:', error);
        res.status(500).send('Erro ao cadastrar a palavra-chave');
    }
};

const updatePalavraChave = async (req, res) => {
    const id = req.params.id;
    const { palavras } = req.body;

    if (!palavras) {
        return res.status(400).send({ message: 'Preencha o campo palavra' });
    }

    try {
        const result = await pool.query('SELECT * FROM palavras_chaves WHERE id_palavrasChaves = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send({ message: 'Palavra-chave não encontrada' });
        }

        await pool.query('UPDATE palavras_chaves SET palavras = $1 WHERE id_palavrasChaves = $2', [palavras, id]);
        res.send('Palavra-chave atualizada com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar palavra-chave:', error);
        res.status(500).send('Erro ao atualizar a palavra-chave');
    }
};

const deletePalavraChave = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query('SELECT * FROM palavras_chaves WHERE id_palavrasChaves = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send({ message: 'Palavra-chave não encontrada' });
        }

        await pool.query('DELETE FROM palavras_chaves WHERE id_palavrasChaves = $1', [id]);
        res.send('Palavra-chave deletada com sucesso');
    } catch (error) {
        console.error('Erro ao deletar palavra-chave:', error);
        res.status(500).send('Erro ao deletar a palavra-chave');
    }
};

const getCursosPorPalavraChave = async (req, res) => {
    const { palavras } = req.params;

    try {
        const result = await pool.query(`
      SELECT * FROM cursos 
      WHERE id_palavrasChaves IN (
        SELECT id_palavrasChaves FROM palavras_chaves WHERE palavras ILIKE $1
      )
   ` , [`%${palavras}%`]);

        res.json({
            total: result.rowCount,
            palavras_chaves: result.rows,
        });
    } catch (error) {
        console.error('Erro ao obter cursos por palavra-chave:', error);
        res.status(500).send('Erro ao obter cursos por palavra-chave');
    }
};

module.exports = {
    getPalavrasChave,
    createPalavraChave,
    updatePalavraChave,
    deletePalavraChave,
    getCursosPorPalavraChave,
};