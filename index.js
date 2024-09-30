const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',  
  database: 'innovaweb',
  password: 'ds564',
  port: 7777, 
});

app.get('/cursos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cursos');
    res.json({
      total: result.rowCount,
      cursos: result.rows,
    });
  } catch (error) {
    console.error('Erro ao obter cursos:', error);
    res.status(500).send('Erro ao obter cursos');
  }
});

app.post('/cursos', async (req, res) => {
  console.log("Teste");
  
  try {
    const {
      titulo, modalidade, carga_horaria,nivel,descricao,descricao_requisitos,programacao,  modalidade_aula,    metodologia_ensino,  idade,    turnos,    status,   imagem,
    } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (

      !titulo ||
      !modalidade ||
      !carga_horaria ||
      !nivel ||
      !descricao ||
      !descricao_requisitos ||
      !programacao ||
      !modalidade_aula ||
      !metodologia_ensino ||
      !idade ||
      !turnos ||
      !status ||
      !imagem
    ) {
      res.status(400).send({ message: 'Preencha todos os campos' });
      return;
    }

    // Inserção no banco de dados
    const result = await pool.query(
      'INSERT INTO cursos (titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos, programacao, modalidade_aula, metodologia_ensino, idade, turnos, status, imagem) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
      [
        titulo,
        modalidade,
        carga_horaria,
        nivel,
        descricao,
        descricao_requisitos,
        programacao,
        modalidade_aula,
        metodologia_ensino,
        idade,
        turnos,
        status,
        imagem,
      ]
    );
    if (result.rowCount > 0) {
      res.status(201).send({ message: 'Curso cadastrado com sucesso' });
    } else {
      res.status(400).send({ message: 'Erro ao cadastrar o curso' });
    }
  } catch (e) {
    console.error('Erro ao criar curso:', e.message, e.stack);
    res.status(500).send({ mensagem: 'Não foi possível cadastrar o curso' });
  }
});

app.put('/cursos/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { 
    titulo, 
    modalidade, 
    carga_horaria, 
    nivel, 
    descricao, 
    descricao_requisitos, 
    programacao, 
    modalidade_aula, 
    metodologia_ensino, 
    idade, 
    turnos, 
    status, 
    imagem
  } = req.body;

  const query = `
    UPDATE cursos 
    SET titulo = $1, modalidade = $2, carga_horaria = $3, nivel = $4, descricao = $5, descricao_requisitos = $6, 
        programacao = $7, modalidade_aula = $8, metodologia_ensino = $9, idade = $10, turnos = $11, status = $12, imagem = $13 
    WHERE id_cursos = $14
  `;
  
  const values = [
    titulo, 
    modalidade, 
    carga_horaria, 
    nivel, 
    descricao, 
    descricao_requisitos, 
    programacao, 
    modalidade_aula, 
    metodologia_ensino, 
    idade, 
    turnos, 
    status, 
    imagem, 
    id
  ];

  try {
    await pool.query(query, values);
    res.send('Curso atualizado com sucesso');
  } catch (err) {
    console.error('Erro ao atualizar curso:', err);
    res.status(500).send('Erro ao atualizar curso');
  }
});


app.delete('/cursos/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM cursos WHERE id_cursos=$1 ';

  try {
    await pool.query(query, [id]);
    res.send('curso deletado com sucesso');
  } catch (err) {
    console.error('Erro ao deletar curso:', err);
    res.status(500).send('Erro ao deletar curso');
  }
});


app.listen(PORT, () => {
  console.log('Servidor rodando na porta ${PORT} 👨‍🏫👨‍🎓');
});