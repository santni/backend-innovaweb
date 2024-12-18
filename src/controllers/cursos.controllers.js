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
    res.status(500).json({
      message: 'Erro ao obter cursos',
      error: error.message,
    });
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

const getCursosPorModalidade = async (req, res) => {
  console.log('Filtrando cursos pela modalidade');
  const { modalidade } = req.params;

  try {
    if (!modalidade) {
      return res.status(400).send('Modalidade não fornecida');
    }

    const result = await pool.query(`
        SELECT * 
        FROM cursos
        WHERE modalidade ILIKE $1
    `, [modalidade]);

    if (result.rowCount > 0) {
      res.json({
        total: result.rowCount,
        cursos: result.rows,
      });
    } else {
      res.status(404).json({
        message: 'Nenhum curso correspondente encontrado para a modalidade fornecida.',
      });
    }
  } catch (error) {
    console.error('Erro ao filtrar cursos pela modalidade:', error);
    res.status(500).send('Erro ao filtrar cursos pela modalidade');
  }
};

const getCursosPorNivel = async (req, res) => {
  console.log('Filtrando cursos pelo nível');
  const { nivel } = req.params;

  try {
    if (!nivel) {
      return res.status(400).send('Nível não fornecido');
    }

    const result = await pool.query(`
        SELECT * 
        FROM cursos
        WHERE nivel ILIKE $1
    `, [nivel]);

    if (result.rowCount > 0) {
      res.json({
        total: result.rowCount,
        cursos: result.rows,
      });
    } else {
      res.status(404).json({
        message: 'Nenhum curso correspondente encontrado para o nível fornecido.',
      });
    }
  } catch (error) {
    console.error('Erro ao filtrar cursos pelo nível:', error);
    res.status(500).send('Erro ao filtrar cursos pelo nível');
  }
};

const getCursosPorTurno = async (req, res) => {
  console.log('Filtrando cursos pelo turno');
  const { turno } = req.params;

  try {
    if (!turno) {
      return res.status(400).send('Turno não fornecido');
    }

    const result = await pool.query(`
        SELECT * 
        FROM cursos
        WHERE turnos ILIKE $1
    `, [turno]);

    if (result.rowCount > 0) {
      res.json({
        total: result.rowCount,
        cursos: result.rows,
      });
    } else {
      res.status(404).json({
        message: 'Nenhum curso correspondente encontrado para o turno fornecido.',
      });
    }
  } catch (error) {
    console.error('Erro ao filtrar cursos pelo turno:', error);
    res.status(500).send('Erro ao filtrar cursos pelo turno');
  }
};

const createCurso = async (req, res) => {
  // Extrair as informações do corpo da requisição
  const {
    titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos,
    programacao, modalidade_aula, metodologia_ensino, idade, turnos, status
  } = req.body;

  try {
    // Inserir o curso no banco de dados
    const result = await pool.query(
      `INSERT INTO cursos 
      (titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos, 
      programacao, modalidade_aula, metodologia_ensino, idade, turnos, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos,
        programacao, modalidade_aula, metodologia_ensino, idade, turnos, status]
    );

    if (result.rowCount > 0) {
      res.status(201).json({ message: 'Curso cadastrado com sucesso', curso: result.rows[0] });
    } else {
      res.status(400).json({ message: 'Erro ao cadastrar o curso' });
    }
  } catch (error) {
    console.error('Erro detalhado ao criar curso:', error);
    res.status(500).json({ message: 'Não foi possível cadastrar o curso', error: error.message });
  }
};

const updateCurso = async (req, res) => {
  const id = req.params.id;
  const {
    titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos,
    programacao, modalidade_aula, metodologia_ensino, idade, turnos, status
  } = req.body;

  const query = `
    UPDATE cursos 
    SET titulo = $1, modalidade = $2, carga_horaria = $3, nivel = $4, descricao = $5, descricao_requisitos = $6, 
        programacao = $7, modalidade_aula = $8, metodologia_ensino = $9, idade = $10, turnos = $11, status = $12 
    WHERE id_curso = $13
  `;
  const values = [titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos,
    programacao, modalidade_aula, metodologia_ensino, idade, turnos, status, id];

  try {
    await pool.query(query, values);
    res.send('Curso atualizado com sucesso');
  } catch (err) {
    console.error('Erro ao atualizar curso:', err);
    res.status(500).send('Erro ao atualizar curso');
  }
};

const deleteCurso = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  const query = 'DELETE FROM cursos WHERE id_curso = $1';
  try {
    await pool.query(query, [id]);
    res.send('Curso deletado com sucesso');
  } catch (err) {
    console.error('Erro ao deletar curso:', err);
    res.status(500).send('Erro ao deletar curso');
  }
};

const getCursoById = async (req, res) => {
  const id_curso = req.params.id_curso;
  const query = 'SELECT * FROM cursos WHERE id_curso = $1';

  try {
    const resultado = await pool.query(query, [id_curso]);

    if (resultado.rows.length === 0) {
      return res.status(404).send('Curso não encontrado');
    }

    res.json(resultado.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar curso:', err);
    res.status(500).send('Erro ao buscar curso');
  }
};

module.exports = {
  getCursos,
  getCursosPorIdade,
  getCursosPorModalidade,
  getCursosPorNivel,
  getCursosPorTurno,
  createCurso,
  updateCurso,
  deleteCurso,
  getCursoById
};
