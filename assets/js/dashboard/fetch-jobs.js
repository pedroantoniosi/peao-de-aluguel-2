let Jobs = [];

// Carrega os dados via fetch
fetch('https://raw.githubusercontent.com/pedroantoniosi/peao-de-aluguel-2/refs/heads/main/assets/js/dashboard/api/categories.json')
    .then(res => res.json()) // <- parse JSON corretamente
    .then(data => {
        Jobs = data; // agora data é um array de objetos
        renderizarUsuarios(Jobs);
    })
    .catch(error => console.error('Erro ao carregar usuários:', error));


