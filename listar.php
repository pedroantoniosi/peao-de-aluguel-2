<?php
// Conexão com o banco
$conn = new mysqli("localhost", "root", "", "cadastro_contratantes");
if ($conn->connect_error) {
    die("Erro: " . $conn->connect_error);
}

// Consulta à tabela
$resultado = $conn->query("SELECT * FROM contratantes");

echo "<h2>Lista de Contratantes</h2>";
echo "<table border='1' cellpadding='10' cellspacing='0'>";
echo "<thead>
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>CNPJ</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Endereço</th>
            <th>Número</th>
            <th>Imagens</th>
        </tr>
      </thead><tbody>";

while ($row = $resultado->fetch_assoc()) {
    echo "<tr>";
    echo "<td>{$row['id']}</td>";
    echo "<td>{$row['nome_completo']}</td>";
    echo "<td>{$row['email']}</td>";
    echo "<td>{$row['telefone']}</td>";
    echo "<td>{$row['cnpj']}</td>";
    echo "<td>{$row['cidade']}</td>";
    echo "<td>{$row['estado']}</td>";
    echo "<td>{$row['endereco']}</td>";
    echo "<td>{$row['numero']}</td>";

    // Exibir imagens (se houver)
    $imagens = explode(',', $row['imagens']);
    echo "<td>";
    foreach ($imagens as $img) {
        if (!empty($img)) {
            echo "<img src='uploads/$img' alt='img' width='60' style='margin: 5px; border-radius: 4px;'>";
        }
    }
    echo "</td>";

    echo "</tr>";
}

echo "</tbody></table>";

$conn->close();
?>
