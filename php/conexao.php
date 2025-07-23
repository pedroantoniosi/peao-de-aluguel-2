<?php
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nomeProfissional'] ?? '';
    $email = $_POST['emailProfissional'] ?? '';
    $senha = $_POST['senhaProfissional'] ?? '';
    $telefone = $_POST['telefoneProfissional'] ?? '';
    $cep = $_POST['cepProfissional'] ?? '';
    $estado = $_POST['estadoProfissional'] ?? '';
    $cidade = $_POST['cidadeProfissional'] ?? '';
    $endereco = $_POST['enderecoProfissional'] ?? '';
    $numero = $_POST['numeroProfissional'] ?? '';

    if (empty($nome) || empty($email) || empty($senha)) {
        die("Preencha todos os campos obrigatórios.");
    }

    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    $imagemUrl = null;
    if (isset($_FILES['minhasImagens']) && $_FILES['minhasImagens']['error'][0] === 0) {
        $imagem = $_FILES['minhasImagens'];
        $extensao = strtolower(pathinfo($imagem['name'][0], PATHINFO_EXTENSION));
        $nomeUnico = uniqid() . '.' . $extensao;
        $diretorio = 'pasta_uploads/';
        $caminhoDestino = $diretorio . $nomeUnico;

        if (!file_exists($diretorio)) {
            mkdir($diretorio, 0755, true);
        }

        if (move_uploaded_file($imagem['tmp_name'][0], $caminhoDestino)) {
            $imagemUrl = $caminhoDestino;
        }
    }

    try {
        $stmt = $conn->prepare("INSERT INTO profissionais 
        (nome, email, senha_hash, telefone, cep, estado, cidade, endereco, numero, imagem_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        $stmt->bind_param("ssssssssss", $nome, $email, $senhaHash, $telefone, $cep, $estado, $cidade, $endereco, $numero, $imagemUrl);
        $stmt->execute();

        header("Location: /pages/sucesso.html");
        exit;
    } catch (Exception $e) {
        die("Erro ao cadastrar profissional: " . $e->getMessage());
    }
} else {
    echo "Método inválido.";
}
