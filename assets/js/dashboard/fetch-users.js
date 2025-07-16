// Variáveis globais
window.todosUsuarios = [];
window.usuariosFiltrados = []; // Mantém os usuários filtrados
window.offsetFiltro = 0;       // Offset para scroll filtrado
window.limite = 30;
let carregando = false;

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

        // Mostra os primeiros 30
        window.usuariosFiltrados = dados;
        window.offsetFiltro = 0;
        document.getElementById('user-dashboard').innerHTML = '';
        carregarUsuariosFiltrados();

    } catch (erro) {
        console.error('Erro ao carregar os usuários:', erro.message);
    }
}

// Carrega os próximos usuários filtrados
function carregarUsuariosFiltrados() {
    if (carregando) return;
    carregando = true;

    const container = document.getElementById('user-dashboard');
    const usuarios = window.usuariosFiltrados.slice(window.offsetFiltro, window.offsetFiltro + window.limite);
    window.offsetFiltro += window.limite;

    renderizarUsuarios(usuarios);
    carregando = false;
}

// Renderiza usuários no DOM
function renderizarUsuarios(usuarios) {
    const container = document.getElementById('user-dashboard');

    usuarios.forEach(usuario => {
        const { nome, imagem, endereco, servicos } = usuario;
        const { rua, cidade, uf } = endereco;
        const servico = servicos[0];

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

// Exporta globalmente
window.renderizarUsuarios = renderizarUsuarios;
window.carregarUsuariosFiltrados = carregarUsuariosFiltrados;

// Scroll infinito para usuários filtrados
window.addEventListener('scroll', () => {
    const scrollFinal = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    const aindaTemUsuarios = window.offsetFiltro < window.usuariosFiltrados.length;

    if (scrollFinal && aindaTemUsuarios) {
        carregarUsuariosFiltrados();
    }
});
