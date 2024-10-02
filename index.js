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

app.get('/administrador', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM administrador');
    res.json({
      total: result.rowCount,
      administrador: result.rows,
    });
  } catch (error) {
    console.error('Erro ao obter administrador:', error);
    res.status(500).send('Erro ao obter administrador');
  }
});

app.post('/administrador', async (req, res) => {
  console.log("Teste");
  
  try {
    const {
     nome, login, senha
    } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (

      !nome ||
      !login ||
      !senha 
    ) {
      res.status(400).send({ message: 'Preencha todos os campos' });
      return;
    }

    // Inserção no banco de dados
    const result = await pool.query(
      'INSERT INTO administrador (nome, login, senha) VALUES ($1, $2, $3) RETURNING *',
      [
        nome, 
        login,
        senha
      ]
    );
    if (result.rowCount > 0) {
      res.status(201).send({ message: 'administrador cadastrado com sucesso' });
    } else {
      res.status(400).send({ message: 'Erro ao cadastrar o administrador' });
    }
  } catch (e) {
    console.error('Erro ao criar administrador:', e.message, e.stack);
    res.status(500).send({ mensagem: 'Não foi possível cadastrar o administrador' });
  }
});

app.put('/administrador/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { 
    nome,
    login,
    senha
  } = req.body;

  const query = `
    UPDATE administrador 
    SET nome = $1, login = $2, senha = $3 WHERE id_administrador = $4 `;
  
  const values = [
   nome,
   login,
   senha,
    id
  ];

  try {
    await pool.query(query, values);
    res.send('administrador atualizado com sucesso');
  } catch (err) {
    console.error('Erro ao atualizar administrador:', err);
    res.status(500).send('Erro ao atualizar administrador');
  }
});

app.delete('/administrador/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM administrador WHERE id_administrador =$1 ';

  try {
    await pool.query(query, [id]);
    res.send('administrador deletado com sucesso');
  } catch (err) {
    console.error('Erro ao deletar administrador:', err);
    res.status(500).send('Erro ao deletar administrador');
  }
});

app.get('/palavras_chaves', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM palavras_chaves');
    res.json({
      total: result.rowCount,
      palavras_chaves: result.rows,
    });
  } catch (error) {
    console.error('Erro ao obter palavra_chave:', error);
    res.status(500).send('Erro ao obter palavra_chave');
  }
});

app.post('/palavras-chaves', async (req, res) => {
  console.log("Teste");
  
  try {
    const {
    palavra
    } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (

      !palavra 
    ) {
      res.status(400).send({ message: 'Preencha todos os campos' });
      return;
    }

    // Inserção no banco de dados
    const result = await pool.query(
      'INSERT INTO palavras_chaves (palavra) VALUES ($1) RETURNING *',
      [
        nome
      ]
    );
    if (result.rowCount > 0) {
      res.status(201).send({ message: 'palavra-chave cadastrada com sucesso' });
    } else {
      res.status(400).send({ message: 'Erro ao cadastrar a palavra-chave' });
    }
  } catch (e) {
    console.error('Erro ao criar palavra-chave:', e.message, e.stack);
    res.status(500).send({ mensagem: 'Não foi possível cadastrar a palavra-chave' });
  }
});

app.put('/palavras_chaves/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { 
    nome
  } = req.body;

  const query = `
    UPDATE palavras_chaves SET palavra = $1 WHERE id_palavrasChaves = $2 `;
  
  const values = [
   nome,
    id
  ];

  try {
    await pool.query(query, values);
    res.send('palavra-chave atualizada com sucesso');
  } catch (err) {
    console.error('Erro ao atualizar palavra-chave:', err);
    res.status(500).send('Erro ao atualizar palavra-chave');
  }
});

app.delete('/palavras_chaves/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM palavras_chaves WHERE id_palavrasChaves = $1 ';

  try {
    await pool.query(query, [id]);
    res.send('palavra-chave deletada com sucesso');
  } catch (err) {
    console.error('Erro ao deletar palavra-chave:', err);
    res.status(500).send('Erro ao deletar palavra-chave');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 👨‍🏫👨‍🎓`);
});