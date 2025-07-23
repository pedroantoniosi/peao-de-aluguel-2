<?php
$host = 'localhost';
$usuario = 'root'; // ou seu usuário do MySQL
$senha = '';       // ou sua senha do MySQL
$banco = 'peao_de_aluguel';

// Conecta ao MySQL
$conn = new mysqli($host, $usuario, $senha);

// Verifica conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Cria banco
$sql = "CREATE DATABASE IF NOT EXISTS $banco";
if ($conn->query($sql) === TRUE) {
    echo "Banco de dados criado com sucesso.<br>";
} else {
    die("Erro ao criar banco: " . $conn->error);
}

// Seleciona o banco
$conn->select_db($banco);

// Comando SQL para criar tabelas
$script = "
-- Tabela: categorias
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE
);

-- Tabela: servicos
CREATE TABLE IF NOT EXISTS servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    categoria_id INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE
);

-- Tabela: profissionais
CREATE TABLE IF NOT EXISTS profissionais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cep VARCHAR(9),
    estado CHAR(2),
    cidade VARCHAR(100),
    endereco VARCHAR(255),
    numero VARCHAR(10),
    imagem_url VARCHAR(255),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: contratantes
CREATE TABLE IF NOT EXISTS contratantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cnpj VARCHAR(18),
    cep VARCHAR(9),
    estado CHAR(2),
    cidade VARCHAR(100),
    endereco VARCHAR(255),
    numero VARCHAR(10),
    imagem_url VARCHAR(255),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela intermediária: profissionais_servicos
CREATE TABLE IF NOT EXISTS profissionais_servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profissional_id INT NOT NULL,
    servico_id INT NOT NULL,
    preco DECIMAL(10,2),
    descricao TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (profissional_id) REFERENCES profissionais(id) ON DELETE CASCADE,
    FOREIGN KEY (servico_id) REFERENCES servicos(id) ON DELETE CASCADE
);

-- Tabela: avaliacoes
CREATE TABLE IF NOT EXISTS avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contratante_id INT NOT NULL,
    profissional_id INT NOT NULL,
    nota INT CHECK(nota BETWEEN 1 AND 5),
    comentario TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contratante_id) REFERENCES contratantes(id) ON DELETE CASCADE,
    FOREIGN KEY (profissional_id) REFERENCES profissionais(id) ON DELETE CASCADE
);
";

// Executa múltiplos comandos
if ($conn->multi_query($script)) {
    echo "Tabelas criadas com sucesso.";
} else {
    echo "Erro ao criar tabelas: " . $conn->error;
}

$conn->close();
?>
