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
        const result = await pool.query('SELECT * FROM palavras_chaves WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send({ message: 'Palavra-chave não encontrada' });
        }

        await pool.query('UPDATE palavras_chaves SET palavras = $1 WHERE id = $2', [palavras, id]);
        res.send('Palavra-chave atualizada com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar palavra-chave:', error);
        res.status(500).send('Erro ao atualizar a palavra-chave');
    }
};

const deletePalavraChave = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query('SELECT * FROM palavras_chaves WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send({ message: 'Palavra-chave não encontrada' });
        }

        await pool.query('DELETE FROM palavras_chaves WHERE id = $1', [id]);
        res.send('Palavra-chave deletada com sucesso');
    } catch (error) {
        console.error('Erro ao deletar palavra-chave:', error);
        res.status(500).send('Erro ao deletar a palavra-chave');
    }
};

const getCursosPorPalavraChave = async (req, res) => {
    console.log('Passou aqui');
    const { palavras } = req.params;

    console.log(palavras);

    try {
        const result = await pool.query(`
            SELECT c.* 
            FROM cursos c
            JOIN palavras_chaves pc ON c.id_curso = pc.id_curso_fk
            WHERE unaccent(pc.palavras) ILIKE unaccent($1)
        `, [`%${palavras}%`]); // Adiciona '%' para busca em qualquer parte da palavra

        if (result.rowCount > 0) {
            res.json({
                total: result.rowCount,
                cursos: result.rows, // Retorna cursos associados à palavra-chave parcial
            });
        } else {
            // Segunda consulta busca nas colunas da tabela cursos
            const searchResult = await pool.query(`
                  SELECT *
                        FROM cursos
                        WHERE unaccent(titulo) ILIKE unaccent($1)
                        OR unaccent(modalidade) ILIKE unaccent($1)
                        OR unaccent(nivel) ILIKE unaccent($1)
                        OR unaccent(descricao) ILIKE unaccent($1)
                        OR unaccent(descricao_requisitos) ILIKE unaccent($1)
                        OR unaccent(programacao) ILIKE unaccent($1)
                        OR unaccent(modalidade_aula) ILIKE unaccent($1)
                        OR unaccent(metodologia_ensino) ILIKE unaccent($1)
                        OR unaccent(turnos) ILIKE unaccent($1)
                        OR unaccent(status) ILIKE unaccent($1)
            `, [`%${palavras}%`]);

            if (searchResult.rowCount > 0) {
                res.json({
                    total: searchResult.rowCount,
                    cursos: searchResult.rows, // Retorna todos os dados dos cursos encontrados
                });
            } else {
                // Caso não haja dados correspondentes
                res.status(404).json({
                    message: 'Nenhum dado correspondente encontrado.',
                });
            }
        }
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