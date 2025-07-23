<?php
require __DIR__ . '/conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recebe e limpa dados
    $nome = trim($_POST['nome']);
    $email = trim($_POST['email']);
    $senha = $_POST['senha'];
    $telefone = trim($_POST['telefone']);
    $cnpj = trim($_POST['cnpj'] ?? '');
    $cep = trim($_POST['cep'] ?? '');
    $estado = trim($_POST['estado'] ?? '');
    $cidade = trim($_POST['cidade'] ?? '');
    $endereco = trim($_POST['endereco'] ?? '');
    $numero = trim($_POST['numero'] ?? '');
    $imagem_url = trim($_POST['imagem_url'] ?? '');

    // Validação básica
    if (empty($nome) || empty($email) || empty($senha) || empty($telefone)) {
        die("Preencha os campos obrigatórios.");
    }

    // Hash da senha
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    // Prepara consulta para evitar SQL Injection
    $stmt = $conn->prepare("INSERT INTO contratantes (nome, email, senha_hash, telefone, cnpj, cep, estado, cidade, endereco, numero, imagem_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssssss", $nome, $email, $senha_hash, $telefone, $cnpj, $cep, $estado, $cidade, $endereco, $numero, $imagem_url);

    if ($stmt->execute()) {
        echo "Cadastro do contratante realizado com sucesso!";
    } else {
        if ($conn->errno === 1062) { // chave duplicada
            echo "Email já cadastrado.";
        } else {
            echo "Erro: " . $conn->error;
        }
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Método inválido.";
}
?>
