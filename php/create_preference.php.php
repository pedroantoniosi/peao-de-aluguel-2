<?php
header('Content-Type: application/json');

// Inclui o SDK (certifique-se que o Composer foi instalado e o autoload está correto)
require __DIR__ . '/../vendor/autoload.php';

// Use o ACCESS TOKEN de TESTE se estiver no localhost
MercadoPago\SDK::setAccessToken("TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxx");

// Recebe valores do JavaScript
$valor = isset($_POST['valor']) ? floatval($_POST['valor']) : 0;
$descricao = $_POST['descricao'] ?? 'Serviço';

if ($valor <= 0) {
    echo json_encode(["error" => "Valor inválido"]);
    exit;
}

try {
    $preference = new MercadoPago\Preference();

    $item = new MercadoPago\Item();
    $item->title = $descricao;
    $item->quantity = 1;
    $item->unit_price = $valor;

    $preference->items = [$item];

    // URLs de retorno (necessário para funcionar corretamente)
    $preference->back_urls = [
        "success" => "http://localhost/sucesso.html",
        "failure" => "http://localhost/erro.html",
        "pending" => "http://localhost/pendente.html"
    ];
    $preference->auto_return = "approved";

    $preference->save();

    echo json_encode(["id" => $preference->id]);

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
