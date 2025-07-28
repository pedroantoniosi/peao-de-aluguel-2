<?php
session_start();
require_once 'conexao.php'; // arquivo que conecta ao banco

// Função para redirecionar com mensagem de erro
function redirectWithError($msg) {
  header("Location: /peao-de-aluguel/php/dashboard.php");
exit;

}

// Verifica se veio POST e os dados
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $senha = $_POST['usuarioSenha'] ?? '';

    if (!$email || empty($senha)) {
        redirectWithError('Por favor, preencha email e senha corretamente.');
    }

    // Busca usuário pelo email
    $sql = "SELECT id, nome, email, senha_hash FROM profissionais WHERE email = ? LIMIT 1";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        redirectWithError('Erro interno do servidor.');
    }
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows === 0) {
        redirectWithError('Email ou senha incorretos.');
    }

    $usuario = $res->fetch_assoc();

    // Verifica a senha
    if (!password_verify($senha, $usuario['senha_hash'])) {
        redirectWithError('Email ou senha incorretos.');
    }

    // Autenticação OK - Cria sessão
    $_SESSION['usuario_id'] = $usuario['id'];
    $_SESSION['usuario_nome'] = $usuario['nome'];
    $_SESSION['usuario_email'] = $usuario['email'];
    $_SESSION['logado'] = true;

    // Redireciona para dashboard.php
    header("Location: ../pages/dashboard.php");
    exit();
} else {
    redirectWithError('Requisição inválida.');
}
