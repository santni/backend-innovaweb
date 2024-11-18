-- criação do banco
CREATE DATABASE innovaweb

-- comando para entrar no banco 
\c innova_web;


CREATE TABLE administrador (
    id_administrador SERIAL PRIMARY KEY,
    email VARCHAR(255),
    login VARCHAR(100),
    senha VARCHAR(255)
);

CREATE TABLE area (
    id_area SERIAL PRIMARY KEY,
    nome_area VARCHAR(255),
    imagem VARCHAR(255),
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



INSERT INTO area (nome_area, imagem, descricao)
VALUES 
('Tecnologia da informação e informática', 'https://online.pucrs.br/hs-fs/hubfs/Generated%20images/imagem%20de%20uma%20pessoa%20trabalhando%20com%20tecnologia%20em%20um%20escrit%C3%B3rio.jpeg?width=871&height=443&name=imagem%20de%20uma%20pessoa%20trabalhando%20com%20tecnologia%20em%20um%20escrit%C3%B3rio.jpeg', 'Ainda que possa ser compreendida de várias formas, a TI é entendida como o conjunto de todas as atividades e soluções produzidas por meio de recursos tecnológicos da computação para realizar o armazenamento, processamento, utilização e transmissão da informação');

INSERT INTO area (nome_area, imagem, descricao)
VALUES 
('Administração e Gestão', 'https://academiadeexecutivos.com/wp-content/uploads/2023/04/Adm.png', 'Resumidamente, a Gestão é uma prática voltada ao aspecto político-administrativo de uma equipe ou empresa, em que as relações pessoais e de rotina estão envolvidas no processo como um todo. A Administração, por sua vez, é usada para guiar um projeto ou uma empresa a objetivos específicos');

INSERT INTO area (nome_area, imagem, descricao)
VALUES 
('Alimentos e Bebidas', 'https://sebrae.com.br/Sebrae/Portal%20Sebrae/Artigos/Imagens/imagem_alimentos_e_bebidas_tendencias-do-setor-de-alimentos-e-bebidas-para-2023.jpg', 'A cadeia de Alimentos e Bebidas compreende atividades relacionadas à fabricação de produtos alimentares, incluindo massas, laticínios, gelados comestíveis, carnes e derivados, cereais e farináceos, produtos de panificação, bebidas alcoólicas e não alcoólicas, dentre outros. O setor atravessa um período desafiador');

INSERT INTO area (nome_area, imagem, descricao)
VALUES 
('Construção Civil e Design de Mobiliário', 'https://decorehome.com.br/wp-content/uploads/2017/02/architecture-400x250.jpg', 'Os cursos do SENAI-SP nas áreas de Construção Civil e Design Mobiliário abrangem: Construção Pesada, Edificações, Instalações, entre outros. O objetivo é formar profissionais com sólida base teórico-metodológica e prática');

INSERT INTO area (nome_area, imagem, descricao)
VALUES 
('Fabricação Mecânica e Manutenção Industrial.', 'https://www.abecom.com.br/wp-content/uploads/2022/04/tecnico-mecanico-de-manutencao-industrial.jpg', 'É o profissional que vai atuar no reparo e manutenções de máquinas industriais. Por exemplo, envazadoras, agitadores, motores elétricos, compressores e uma infinidade de outros equipamentos');



CREATE EXTENSION unaccent;
