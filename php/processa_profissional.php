<?php
require_once 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nome = $_POST["nomeProfissional"];
    $email = $_POST["emailProfissional"];
    $senha = $_POST["senhaProfissional"];
    $telefone = $_POST["telefoneProfissional"];
    $cep = $_POST["cepProfissional"];
    $estado = $_POST["estadoProfissional"];
    $cidade = $_POST["cidadeProfissional"];
    $endereco = $_POST["enderecoProfissional"];
    $numero = $_POST["numeroProfissional"];

    // Verifica e trata imagem
    $imagemUrl = null;
    if (isset($_FILES["minhasImagens"]) && $_FILES["minhasImagens"]["error"][0] == 0) {
        $pastaDestino = "../assets/img/uploads/";
        if (!file_exists($pastaDestino)) {
            mkdir($pastaDestino, 0777, true);
        }

        $nomeArquivo = uniqid() . "_" . basename($_FILES["minhasImagens"]["name"][0]);
        $caminhoCompleto = $pastaDestino . $nomeArquivo;

        if (move_uploaded_file($_FILES["minhasImagens"]["tmp_name"][0], $caminhoCompleto)) {
            $imagemUrl = "assets/img/uploads/" . $nomeArquivo; // Caminho para salvar no banco
        }
    }

    // Hash da senha
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    $sql = "INSERT INTO profissionais 
        (nome, email, senha_hash, telefone, cep, estado, cidade, endereco, numero, imagem_url, criado_em)
        VALUES 
        (:nome, :email, :senha_hash, :telefone, :cep, :estado, :cidade, :endereco, :numero, :imagem_url, NOW())";

    try {
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ":nome" => $nome,
            ":email" => $email,
            ":senha_hash" => $senhaHash,
            ":telefone" => $telefone,
            ":cep" => $cep,
            ":estado" => $estado,
            ":cidade" => $cidade,
            ":endereco" => $endereco,
            ":numero" => $numero,
            ":imagem_url" => $imagemUrl
        ]);

        header("Location: ../sucesso.html");
        exit;
    } catch (PDOException $e) {
        echo "Erro ao cadastrar profissional: " . $e->getMessage();
    }
}
?>
