
let todosUsuarios = [];

carregarUsuarios();

// Consume API de usuarios
async function carregarUsuarios() {
    try {
        const resposta = await fetch('https://raw.githubusercontent.com/pedroantoniosi/peao-de-aluguel-2/refs/heads/main/assets/js/api/users.json');

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText}`);
        }

        const dados = await resposta.json();
        todosUsuarios = dados; // Armazena os usuários para busca
        renderizarUsuarios(todosUsuarios);
    } catch (erro) {
        console.error('Erro ao carregar os usuários:', erro.message);
    }
}

//Renderiza usuarios na tela
function renderizarUsuarios(usuarios) {
    const container = document.getElementById('user-dashboard');
    container.innerHTML = ''; // Limpa o conteúdo anterior

    usuarios.forEach(usuario => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-img">
                <img class="user-img" src="${usuario.imagem}" alt="">
            </div>
            <div class="card-caption col p-05 gap-05 h-100">
                <h2 class="user-name">${usuario.nome}</h2>
                <div class="user-job">
                    <i class="bi bi-briefcase me-05"></i>${usuario.profissao}
                </div>
                <p class="user-adress"><i class="bi bi-geo-alt me-05"></i>${usuario.endereco}</p>
                <div class="user-price">R$ ${usuario.preco},00<span class="ms-05 mt-auto"> ${usuario.tipoPreco}</span></div>
                <button class="btn-conect"><i class="bi bi-whatsapp me-05"></i>Quero contratar</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

const input = document.getElementById('search-bar');

// Busca e renderiza os usuários com base no termo digitado
const buscarUsuarios = debounce(() => {
    const termo = input.value.trim().toLowerCase();

    const resultados = todosUsuarios.filter(usuario =>
        usuario.nome.toLowerCase().includes(termo) ||
        usuario.profissao.toLowerCase().includes(termo) ||
        usuario.endereco.toLowerCase().includes(termo) ||
        (usuario.servicos?.join(' ').toLowerCase().includes(termo) || false)
    );

    renderizarUsuarios(resultados);
}, 300);
input.addEventListener('input', buscarUsuarios);


//Filtra usuarios por preços
document.addEventListener('DOMContentLoaded', () => {
    const precoMinInput = document.getElementById('precoMin');
    const precoMaxInput = document.getElementById('precoMax');

    precoMinInput.addEventListener('input', aplicarFiltroPreco);
    precoMaxInput.addEventListener('input', aplicarFiltroPreco);

    function aplicarFiltroPreco() {
        const precoMin = parseInt(precoMinInput.value) || 0;
        const precoMax = parseInt(precoMaxInput.value) || Infinity;

        const resultados = todosUsuarios.filter(usuario => {
            const precoUsuario = usuario.preco; // já é número inteiro

            return precoUsuario >= precoMin && precoUsuario <= precoMax;
        });

        renderizarUsuarios(resultados);
    }
});

//Filtra usuarios pelo Estado
document.addEventListener('DOMContentLoaded', () => {
    const estadoSelect = document.getElementById('estadoProfissional');

    estadoSelect.addEventListener('change', aplicarFiltroEstado);

    function aplicarFiltroEstado() {
        const estadoSelecionado = estadoSelect.value;

        const resultados = todosUsuarios.filter(usuario => {
            return !estadoSelecionado || usuario.UF === estadoSelecionado;
        });

        renderizarUsuarios(resultados);
    }
});


document.getElementById('btn-filter').onclick = () => {
    document.querySelector('.user-filter').classList.toggle('active');
};
