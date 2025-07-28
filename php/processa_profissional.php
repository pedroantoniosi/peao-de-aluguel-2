<?php
require_once 'conexao.php'; // Deve criar $conn como mysqli

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Método inválido.");
}

// --- 1. Coleta e sanitiza os dados ---
$email      = trim($_POST['emailProfissional'] ?? '');
$senha      = trim($_POST['senhaProfissional'] ?? '');
$confSenha  = trim($_POST['confirmarSenhaProfissional'] ?? '');
$nome       = trim($_POST['nomeProfissional'] ?? '');
$dataNasc   = trim($_POST['dataNascimentoProfissional'] ?? '');
$telefone   = trim($_POST['telefoneProfissional'] ?? '');
$estado     = trim($_POST['estadoProfissional'] ?? '');
$cidade     = trim($_POST['cidadeProfissional'] ?? '');
$endereco   = trim($_POST['enderecoProfissional'] ?? '');
$numero     = trim($_POST['numeroEnderecoProfissional'] ?? '');
$servico    = trim($_POST['servico'] ?? '');
$valor      = trim($_POST['valorServico'] ?? '');
$tipoPrec   = trim($_POST['tipoPrecificacao'] ?? '');
$sobre      = trim($_POST['sobre'] ?? '');

// --- 2. Validações básicas ---
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Email inválido.");
}

if ($senha !== $confSenha) {
    die("As senhas não coincidem.");
}

if (strlen($senha) < 6) {
    die("A senha deve ter pelo menos 6 caracteres.");
}

$tiposValidos = ['Hora', 'Diaria', 'Semanal', 'Mensal', 'Preço Fixo'];
if (!in_array($tipoPrec, $tiposValidos, true)) {
    die("Tipo de precificação inválido.");
}

// --- 3. Verifica se o email já existe ---
$stmt = $conn->prepare("SELECT id FROM profissionais WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    die("Este email já está cadastrado.");
}
$stmt->close();

// --- 4. Insere o profissional ---
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);
$stmt = $conn->prepare("
    INSERT INTO profissionais
    (nome, data_nascimento, email, senha_hash, telefone, estado, cidade, endereco, numero)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
");
$stmt->bind_param("sssssssss", $nome, $dataNasc, $email, $senhaHash, $telefone, $estado, $cidade, $endereco, $numero);

if (!$stmt->execute()) {
    die("Erro ao cadastrar profissional: " . $stmt->error);
}

$profissional_id = $stmt->insert_id;
$stmt->close();

// --- 5. Insere o serviço ---
$valorDecimal = preg_replace('/[^\d,]/', '', $valor);
$valorDecimal = str_replace(',', '.', $valorDecimal);

$stmt = $conn->prepare("
    INSERT INTO servicos_profissional
    (profissional_id, nome, preco, descricao, tipo_precificacao)
    VALUES (?, ?, ?, ?, ?)
");
$stmt->bind_param("isdss", $profissional_id, $servico, $valorDecimal, $sobre, $tipoPrec);

if (!$stmt->execute()) {
    die("Erro ao cadastrar serviço: " . $stmt->error);
}

$stmt->close();
$conn->close();

echo "Cadastro realizado com sucesso!";
