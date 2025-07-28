<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $host = "127.0.0.1";  // Tente 127.0.0.1 se localhost falhar
    $user = "root";
    $pass = "";
    $db   = "peao_de_aluguel";

    $conn = new mysqli($host, $user, $pass, $db);
    $conn->set_charset("utf8mb4");
} catch (mysqli_sql_exception $e) {
    die("Erro ao conectar ao banco: " . $e->getMessage());
}
