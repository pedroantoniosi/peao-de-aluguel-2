<?php
require_once 'conexao.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Método inválido.");
}

// --- 1. Coletar e sanitizar dados ---
$email       = trim($_POST['emailContratante'] ?? '');
$senha       = trim($_POST['senhaContratante'] ?? '');
$confSenha   = trim($_POST['confirmarSenha'] ?? '');
$nome        = trim($_POST['nomeContratante'] ?? '');
$dataNasc    = trim($_POST['dataNascimentoContratante'] ?? '');
$telefone    = trim($_POST['telefoneContratante'] ?? '');
$estado      = trim($_POST['estadoContratante'] ?? '');
$cidade      = trim($_POST['cidadeContratante'] ?? '');
$endereco    = trim($_POST['enderecoContratante'] ?? '');
$numero      = trim($_POST['numeroContratante'] ?? '');

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

// --- 3. Verificar email duplicado ---
$stmt = $conn->prepare("SELECT id FROM contratantes WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    die("Este email já está cadastrado.");
}
$stmt->close();

// --- 4. Upload da imagem ---
$imagem_url = null;
$uploadDir = __DIR__ . '/../pasta_uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if (isset($_FILES['imagemPerfil']) && $_FILES['imagemPerfil']['error'] === UPLOAD_ERR_OK) {
    $ext = strtolower(pathinfo($_FILES['imagemPerfil']['name'], PATHINFO_EXTENSION));
    $permitidos = ['jpg', 'jpeg', 'png', 'gif'];

    if (!in_array($ext, $permitidos)) {
        die("Formato de imagem inválido. Use jpg, jpeg, png ou gif.");
    }

    $novoNome = uniqid('img_', true) . '.' . $ext;
    $destino = $uploadDir . $novoNome;

    if (!move_uploaded_file($_FILES['imagemPerfil']['tmp_name'], $destino)) {
        die("Erro ao salvar a imagem.");
    }

    // Salva caminho relativo para o banco
    $imagem_url = 'pasta_uploads/' . $novoNome;
}

// --- 5. Inserir no banco ---
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

$stmt = $conn->prepare("
    INSERT INTO contratantes 
    (nome, data_nascimento, email, senha_hash, telefone, estado, cidade, endereco, numero, imagem_url, criado_em)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
");

$stmt->bind_param(
    "ssssssssss",
    $nome,
    $dataNasc,
    $email,
    $senhaHash,
    $telefone,
    $estado,
    $cidade,
    $endereco,
    $numero,
    $imagem_url
);

if (!$stmt->execute()) {
    die("Erro ao cadastrar: " . $stmt->error);
}

$stmt->close();
$conn->close();

echo "Cadastro realizado com sucesso!";
