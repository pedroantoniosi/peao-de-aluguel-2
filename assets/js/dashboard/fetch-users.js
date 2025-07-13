// Torna a variável global para que filters.js tenha acesso
window.todosUsuarios = [];

// Carrega dados da API
carregarUsuarios();

async function carregarUsuarios() {
    try {
        const resposta = await fetch('https://raw.githubusercontent.com/pedroantoniosi/peao-de-aluguel-2/refs/heads/main/assets/js/api/users.json');
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText}`);
        }
        const dados = await resposta.json();
        window.todosUsuarios = dados;

        // Aplica os filtros automaticamente após carregar os dados
        if (typeof aplicarFiltros === 'function') {
            aplicarFiltros();
        } else {
            renderizarUsuarios(dados); // fallback
        }
    } catch (erro) {
        console.error('Erro ao carregar os usuários:', erro.message);
    }
}

// Função para renderizar os usuários no DOM
function renderizarUsuarios(usuarios) {
    const container = document.getElementById('user-dashboard');
    container.innerHTML = '';

    usuarios.forEach(usuario => {
        const { nome, imagem, endereco, servicos } = usuario;
        const { rua, cidade, uf } = endereco;
        const servico = servicos[0]; // exibe o primeiro serviço

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-img">
                <img class="user-img" src="${imagem}" alt="${nome}">
            </div>
            <div class="card-caption col p-05 gap-05 h-100">
                <h2 class="user-name">${nome}</h2>
                <div class="user-job">
                    <i class="bi bi-briefcase me-05"></i>${servico.nome}
                </div>
                <p class="user-adress">
                    <i class="bi bi-geo-alt me-05"></i>${rua}, ${cidade}/${uf}
                </p>
                <div class="user-price">
                    R$ ${servico.preco},00<span class="ms-05 mt-auto"> ${servico.tipoPreco}</span>
                </div>
                <button class="btn-conect">
                    <i class="bi bi-whatsapp me-05"></i>Quero contratar
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Exporta a função globalmente caso filters.js precise chamá-la
window.renderizarUsuarios = renderizarUsuarios;
