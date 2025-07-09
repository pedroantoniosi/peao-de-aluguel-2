let todosUsuarios = [];

carregarUsuarios();

// Carrega dados da API
async function carregarUsuarios() {
    try {
        const resposta = await fetch('https://raw.githubusercontent.com/pedroantoniosi/peao-de-aluguel-2/refs/heads/main/assets/js/api/users.json');
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText}`);
        }
        const dados = await resposta.json();
        todosUsuarios = dados;
        renderizarUsuarios(todosUsuarios);
    } catch (erro) {
        console.error('Erro ao carregar os usuários:', erro.message);
    }
}

// Renderiza usuários no DOM
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

// Debounce para busca
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Busca usuários
const input = document.getElementById('search-bar');

const buscarUsuarios = debounce(() => {
    const termo = input.value.trim().toLowerCase();

    const resultados = todosUsuarios.filter(usuario => {
        const { nome, endereco, servicos } = usuario;
        const { rua, cidade, uf } = endereco;

        // Procura em todos os serviços do usuário
        const servicoMatch = servicos.some(servico =>
            servico.nome.toLowerCase().includes(termo) ||
            servico.categoria.toLowerCase().includes(termo) ||
            servico.tipoPreco.toLowerCase().includes(termo)
        );

        return (
            nome.toLowerCase().includes(termo) ||
            rua.toLowerCase().includes(termo) ||
            cidade.toLowerCase().includes(termo) ||
            uf.toLowerCase().includes(termo) ||
            servicoMatch
        );
    });

    renderizarUsuarios(resultados);
}, 300);

input.addEventListener('input', buscarUsuarios);



// Filtro por faixa de preço
document.addEventListener('DOMContentLoaded', () => {
    const precoMinInput = document.getElementById('precoMin');
    const precoMaxInput = document.getElementById('precoMax');

    precoMinInput.addEventListener('input', aplicarFiltroPreco);
    precoMaxInput.addEventListener('input', aplicarFiltroPreco);

    function aplicarFiltroPreco() {
        const precoMin = parseInt(precoMinInput.value) || 0;
        const precoMax = parseInt(precoMaxInput.value) || Infinity;

        const resultados = todosUsuarios.filter(usuario => {
            const preco = usuario.servicos[0].preco;
            return preco >= precoMin && preco <= precoMax;
        });

        renderizarUsuarios(resultados);
    }
});


// Filtro por estado (UF)
document.addEventListener('DOMContentLoaded', () => {
    const estadoSelect = document.getElementById('estadoProfissional');
    estadoSelect.addEventListener('change', aplicarFiltroEstado);

    function aplicarFiltroEstado() {
        const estadoSelecionado = estadoSelect.value;

        const resultados = todosUsuarios.filter(usuario => {
            return !estadoSelecionado || usuario.endereco.uf === estadoSelecionado;
        });

        renderizarUsuarios(resultados);
    }
});

// Toggle do botão de filtro
document.getElementById('btn-filter').onclick = () => {
    const filter = document.querySelector('.user-filter');
    filter.classList.toggle('active');
    if (filter.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};

//Botão para fechar o filtro
document.getElementById('btn-close-filter').onclick = () => {
    document.querySelector('.user-filter').classList.remove('active')
}