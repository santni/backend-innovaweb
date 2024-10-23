-- criação do banco
CREATE DATABASE innova_web

-- comando para entrar no banco 
\c innova_web;


CREATE TABLE administrador (
    id_administrador SERIAL PRIMARY KEY,
    email VARCHAR(255),
    login VARCHAR(100),
    senha VARCHAR(255),
    super_adm BOOLEAN DEFAULT FALSE
);

CREATE TABLE area (
    id_area SERIAL PRIMARY KEY,
    nome_area VARCHAR(255),
    imagem VARCHAR(255),
    video VARCHAR(255),
    descricao TEXT
);

CREATE TABLE cursos (
    id_curso SERIAL PRIMARY KEY,
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
    id_area INT REFERENCES area(id_area) ON DELETE CASCADE
);

CREATE TABLE palavras_chaves (
    id SERIAL PRIMARY KEY,
    palavras VARCHAR(100),
    id_curso_fk INT REFERENCES cursos(id_curso)
);




INSERT INTO cursos (titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos, programacao, modalidade_aula, metodologia_ensino, idade, turnos, status, imagem)
VALUES 
('Curso de Desenvolvimento Mobile', 'Online', 200, 'Avançado', 'Curso voltado para o desenvolvimento de aplicativos móveis.', 'Conhecimentos intermediários em programação.', 'Kotlin, Swift, React Native', 'Gravada', 'Aulas práticas e teóricas', 20, 'Noite', 'Ativo', 'imagem6.jpg');

INSERT INTO cursos (titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos, programacao, modalidade_aula, metodologia_ensino, idade, turnos, status, imagem)
VALUES 
('Curso de Data Science', 'Online', 180, 'Avançado', 'Curso completo de ciência de dados.', 'Experiência com programação e análise de dados.', 'Python, SQL, Machine Learning, Data Visualization', 'Ao vivo', 'Aulas interativas com projetos reais', 25, 'Manhã', 'Ativo', 'imagem7.jpg');

INSERT INTO cursos (titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos, programacao, modalidade_aula, metodologia_ensino, idade, turnos, status, imagem)
VALUES 
('Curso de Segurança da Informação', 'Presencial', 160, 'Intermediário', 'Curso focado em estratégias de segurança digital.', 'Noções básicas de redes de computadores.', 'Firewall, Criptografia, Ethical Hacking', 'Presencial', 'Laboratório prático e teoria', 23, 'Tarde', 'Ativo', 'imagem8.jpg');

INSERT INTO cursos (titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos, programacao, modalidade_aula, metodologia_ensino, idade, turnos, status, imagem)
VALUES 
('Curso de UX/UI Design', 'Online', 120, 'Iniciante', 'Curso introdutório sobre design de experiência do usuário.', 'Nenhuma experiência necessária.', 'Figma, Adobe XD, Design Thinking', 'Gravada', 'Aulas teóricas e projetos práticos', 18, 'Noite', 'Ativo', 'imagem9.jpg');

INSERT INTO cursos (titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos, programacao, modalidade_aula, metodologia_ensino, idade, turnos, status, imagem)
VALUES 
('Curso de E-commerce', 'Online', 100, 'Intermediário', 'Curso completo sobre como criar e gerenciar lojas online.', 'Conhecimento básico de marketing digital.', 'Shopify, Woocommerce, Estratégias de Venda', 'Ao vivo', 'Estudos de caso e workshops práticos', 22, 'Manhã', 'Ativo', 'imagem10.jpg');


CREATE EXTENSION unaccent;
