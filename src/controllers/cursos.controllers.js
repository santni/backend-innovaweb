const pool = require('../config/db.config'); 

const getCursos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cursos');
    res.json({
      total: result.rowCount,
      cursos: result.rows,
    });
  } catch (error) {
    console.error('Erro ao obter cursos:', error);
    res.status(500).send('Erro ao obter cursos ');
  }
};

const getCursosPorIdade = async (req, res) => {
    console.log('Passou aqui');
    const { idade } = req.params;

    try {
    
        if (!idade) {
            return res.status(400).send('Idade não fornecida');
        }
        const result = await pool.query(`
            SELECT * 
            FROM cursos
            WHERE idade >= $1
        `, [idade]); 

        if (result.rowCount > 0) {
            res.json({
                total: result.rowCount,
                cursos: result.rows, 
            });
        } else {
            res.status(404).json({
                message: 'Nenhum curso correspondente encontrado para a idade fornecida.',
            });
        }
    } catch (error) {
        console.error('Erro ao filtrar cursos pela idade:', error);
        res.status(500).send('Erro ao filtrar cursos pela idade');
    }
};



const createCurso = async (req, res) => {
  try {
    const {
      titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos, programacao, modalidade_aula, metodologia_ensino, idade, turnos, status, imagem,
    } = req.body;

    if (
      !titulo || !modalidade || !carga_horaria || !nivel || !descricao || 
      !descricao_requisitos || !programacao || !modalidade_aula || 
      !metodologia_ensino || !idade || !turnos || !status || !imagem
    ) {
      res.status(400).send({ message: 'Preencha todos os campos' });
      return;
    }

    const result = await pool.query(
      'INSERT INTO cursos (titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos, programacao, modalidade_aula, metodologia_ensino, idade, turnos, status, imagem) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
      [titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos, programacao, modalidade_aula, metodologia_ensino, idade, turnos, status, imagem]
    );

    if (result.rowCount > 0) {
      res.status(201).send({ message: 'Curso cadastrado com sucesso' });
    } else {
      res.status(400).send({ message: 'Erro ao cadastrar o curso' });
    }
  } catch (error) {
    console.error('Erro ao criar curso:', error.message);
    res.status(500).send({ mensagem: 'Não foi possível cadastrar o curso' });
  }
};

const updateCurso = async (req, res) => {
  const id = req.params.id;
  const { 
    titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos, programacao, modalidade_aula, metodologia_ensino, idade, turnos, status, imagem
  } = req.body;

  const query = `
    UPDATE cursos 
    SET titulo = $1, modalidade = $2, carga_horaria = $3, nivel = $4, descricao = $5, descricao_requisitos = $6, 
        programacao = $7, modalidade_aula = $8, metodologia_ensino = $9, idade = $10, turnos = $11, status = $12, imagem = $13 
    WHERE id_cursos = $14
  `;
  const values = [titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos, programacao, modalidade_aula, metodologia_ensino, idade, turnos, status, imagem, id];

  try {
    await pool.query(query, values);
    res.send('Curso atualizado com sucesso');
  } catch (err) {
    console.error('Erro ao atualizar curso:', err);
    res.status(500).send('Erro ao atualizar curso');
  }
};

const deleteCurso = async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM cursos WHERE id_cursos=$1';

  try {
    await pool.query(query, [id]);
    res.send('Curso deletado com sucesso');
  } catch (err) {
    console.error('Erro ao deletar curso:', err);
    res.status(500).send('Erro ao deletar curso');
  }
};

module.exports = {
  getCursos,
  getCursosPorIdade,
  createCurso,
  updateCurso,
  deleteCurso,
};
