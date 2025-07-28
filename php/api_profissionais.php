<?php
header('Content-Type: application/json; charset=utf-8');
require_once 'conexao.php';

// Consulta principal incluindo todos os campos da tabela profissionais
$sql = "SELECT 
            p.id,
            p.nome,
            p.data_nascimento,
            p.email,
            p.telefone,
            p.estado,
            p.cidade,
            p.endereco,
            p.numero,
            p.imagem_url,
            p.criado_em,
            p.rating
        FROM profissionais p";

$result = $conn->query($sql);

$profissionais = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $idProfissional = $row['id'];

        // Buscar serviços vinculados ao profissional
        $sqlServicos = "SELECT nome, preco, tipo_precificacao FROM servicos_profissional WHERE profissional_id = ?";
        $stmt = $conn->prepare($sqlServicos);
        if ($stmt) {
            $stmt->bind_param('i', $idProfissional);
            $stmt->execute();
            $resServicos = $stmt->get_result();

            $servicos = [];
            while ($serv = $resServicos->fetch_assoc()) {
                $servicos[] = [
                    'nome' => $serv['nome'],
                    'preco' => $serv['preco'],
                    'tipo_precificacao' => $serv['tipo_precificacao']
                ];
            }
            $stmt->close();
        } else {
            $servicos = [];
        }

        // Monta o array final
        $profissionais[] = [
            'id'             => $row['id'],
            'nome'           => $row['nome'],
            'data_nascimento'=> $row['data_nascimento'],
            'email'          => $row['email'],
            'telefone'       => $row['telefone'],
            'estado'         => $row['estado'],
            'cidade'         => $row['cidade'],
            'endereco'       => $row['endereco'],
            'numero'         => $row['numero'],
            'imagem_url'     => $row['imagem_url'],
            'criado_em'      => $row['criado_em'],
            'rating'         => $row['rating'],
            'servicos'       => $servicos
        ];
    }
}

echo json_encode($profissionais, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

$conn->close();
