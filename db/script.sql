CREATE TABLE administrador (
    id_administrador SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    login VARCHAR(100),
    senha VARCHAR(255)
);

CREATE TABLE area (
    id_area SERIAL PRIMARY KEY,
    nome_area VARCHAR(255),
    imagem VARCHAR(255),
    video VARCHAR(255),
    descricao TEXT
);

CREATE TABLE palavras_chaves (
    id_palavrasChaves SERIAL PRIMARY KEY,
    palavras VARCHAR(100)
);



CREATE TABLE cursos (
    id_cursos SERIAL PRIMARY KEY,
    titulo VARCHAR(255),
    modalidade VARCHAR(255),
    carga_horaria INT,
    nivel VARCHAR(50),
    descricao TEXT,
    descricao_requisitos TEXT,
    programacao TEXT,
    modalidade_aula VARCHAR(100),
    metodologia_ensino VARCHAR(100),
    idade INT,
    turnos VARCHAR(100),
    status VARCHAR(50),
    imagem VARCHAR(255),
    id_area INT REFERENCES area(id_area) ON DELETE CASCADE,
    id_palavraChave INT REFERENCES palavras_chaves(id_palavrasChaves) ON DELETE CASCADE
);