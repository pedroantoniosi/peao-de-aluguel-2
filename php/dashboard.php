<?php
session_start();

// Verifica se o usuário está logado
if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    header("Location: ../pages/auth-login.html");
    exit();
}

// Aqui você pode capturar mais dados do usuário logado, se desejar
$nomeUsuario = $_SESSION['nome'] ?? 'Usuário';

?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard - Peão de Aluguel</title>
    <link rel="stylesheet" href="../assets/css/style.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
</head>
<body id="dashboard" class="position-relative">
    <div class="dashboard-container">

        <div class="menu-bar justify-between align-center">
            <a href="" class="row">
                <img src="../assets/img/logo.png" alt="Peão de Aluguel" />
            </a>
            <div class="col gap-05">
                <a href="../pages/user-interface.html" title="Perfil"><i class="bi bi-person-circle"></i></a>
                <form id="logout-form" action="../php/logout.php" method="POST" style="display:inline;">
                    <button id="btn-logout" type="submit" style="font-size: 1rem; background:none; border:none; cursor:pointer;" title="Sair">
                        <i class="bi bi-box-arrow-left"></i>
                    </button>
                </form>
            </div>
        </div>

        <div class="container gap-1">
            <div id="user-filter" class="user-filter col">
                <!-- filtros aqui (igual ao seu HTML atual) -->
                <!-- seu código HTML para filtros permanece igual -->
            </div>

            <div class="user-hero col gap-1">
                <div class="row-md gap-2">
                    <div class="user-search row flex-1">
                        <div class="search-ico row align-center justify-center p-05"><i class="bi bi-search"></i></div>
                        <input
                            class="search-bar w-100 p-05"
                            type="text"
                            id="search-bar"
                            placeholder="Buscar por nome, profissão ou serviço ex: Ana Souza, eletricista, pintura..."
                        />
                    </div>
                    <nav class="user-navbar">
                        <ul class="nav-list row justify-center gap-05 align-center">
                            <li id="resize-selector" class="nav-item row">
                                <i class="bi bi-layout-split me-05"></i>
                                <p class="nav-text">Exibir</p>
                            </li>
                            <li class="nav-item row align-center gap-05">
                                <div id="order-selector" class="row p-05">
                                    <i class="bi bi-sort-alpha-up me-05"></i>
                                    <p class="nav-text">Ordenar</p>
                                </div>
                                <div id="select-list" class="select-list">
                                    <div class="caption col">
                                        <button id="sortPriceLowest" value="menor" class="btn-order">Menor preço</button>
                                        <button id="sortPricehigher" value="maior" class="btn-order">Maior preço</button>
                                        <button id="btnCloseSelect" class="btn-close mt-auto ms-auto p-1" style="color: #d9534f;">
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </li>
                            <li class="nav-item row">
                                <div id="filter-selector" class="d-none-lg">
                                    <i class="bi bi-funnel-fill me-05"></i>
                                    <p id="btn-filter" class="nav-text">Filtrar</p>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div id="user-dashboard" class="user-dashboard">
                    <!-- Usuários renderizados via JS aqui -->
                </div>
            </div>
        </div>
    </div>
    <div class="user-settings"></div>

    <script src="../assets/js/dashboard/app.js"></script>
    <script src="../assets/js/dashboard/fetch-usuarios.js"></script>
    <script src="../assets/js/dashboard/filtros.js"></script>
</body>
</html>
