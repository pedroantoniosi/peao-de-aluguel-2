if (typeof todosUsuarios === 'undefined') {
    var todosUsuarios = [];
}

window.usuariosFiltrados = [];
window.offsetFiltro = 0;
const limite = 30;

const activeFiltersContainer = document.getElementById('active-filters');
const estadoSelect = document.getElementById('estadoProfissional');
const precoMinInput = document.getElementById('precoMin');
const precoMaxInput = document.getElementById('precoMax');
const searchInput = document.getElementById('search-bar');
const jobListContainer = document.getElementById('job-list');
const ordenarSelectList = document.getElementById('select-list');
const ordenarSelectToggle = document.getElementById('order-selector');

const filtros = {
    estado: '',
    precoMin: '',
    precoMax: '',
    profissao: [],
    busca: '',
    ordenacao: ''
};

// =====================
// EVENTOS DE FILTROS
// =====================

if (estadoSelect) {
    estadoSelect.addEventListener('change', e => {
        filtros.estado = e.target.value;
        updateActiveFilter('estado', e.target.options[e.target.selectedIndex].text);
        aplicarFiltros();
    });
}

if (precoMinInput) {
    precoMinInput.addEventListener('input', e => {
        filtros.precoMin = e.target.value;
        updateActiveFilter('precoMin', `Min: R$ ${e.target.value}`);
        aplicarFiltros();
    });
}

if (precoMaxInput) {
    precoMaxInput.addEventListener('input', e => {
        filtros.precoMax = e.target.value;
        updateActiveFilter('precoMax', `Max: R$ ${e.target.value}`);
        aplicarFiltros();
    });
}

if (searchInput) {
    searchInput.addEventListener('input', e => {
        filtros.busca = e.target.value.trim().toLowerCase();
        updateActiveFilter('busca', `Busca: ${e.target.value}`);
        aplicarFiltros();
    });
}

// Profissões (botões)
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('job-btn')) {
        const job = e.target.dataset.job;

        if (filtros.profissao.includes(job)) {
            filtros.profissao = filtros.profissao.filter(j => j !== job);
            removeActiveFilter('profissao-' + job);
            e.target.classList.remove('active');
        } else {
            filtros.profissao.push(job);
            updateActiveFilter('profissao-' + job, job);
            e.target.classList.add('active');
        }

        aplicarFiltros();
    }
});

// =====================
// ORDENAR (custom select)
// =====================

ordenarSelectToggle.addEventListener('click', () => {
    ordenarSelectList.style.display = 'flex';
});

document.getElementById('sortPriceLowest').addEventListener('click', () => {
    filtros.ordenacao = 'menor';
    updateActiveFilter('ordenacao', 'Ordenação: Menor preço');
    ordenarSelectList.style.display = 'none';
    aplicarFiltros();
});

document.getElementById('sortPricehigher').addEventListener('click', () => {
    filtros.ordenacao = 'maior';
    updateActiveFilter('ordenacao', 'Ordenação: Maior preço');
    ordenarSelectList.style.display = 'none';
    aplicarFiltros();
});

document.getElementById('btnCloseSelect').addEventListener('click', () => {
    ordenarSelectList.style.display = 'none';
});

// =====================
// APLICAR FILTROS
// =====================

function aplicarFiltros() {
    let resultado = [...todosUsuarios];

    // Somente profissionais com serviços
    resultado = resultado.filter(u => u.servicos && u.servicos.length > 0);

    if (filtros.estado) {
        resultado = resultado.filter(u => u.estado === filtros.estado);
    }

    if (filtros.precoMin) {
        resultado = resultado.filter(u =>
            parseFloat(u.servicos[0].preco) >= parseFloat(filtros.precoMin)
        );
    }

    if (filtros.precoMax) {
        resultado = resultado.filter(u =>
            parseFloat(u.servicos[0].preco) <= parseFloat(filtros.precoMax)
        );
    }

    if (filtros.profissao.length > 0) {
        resultado = resultado.filter(u =>
            filtros.profissao.includes(u.servicos[0].nome)
        );
    }

    if (filtros.busca) {
        const busca = filtros.busca;
        resultado = resultado.filter(u =>
            u.nome.toLowerCase().includes(busca) ||
            (u.cidade && u.cidade.toLowerCase().includes(busca)) ||
            (u.servicos[0].nome && u.servicos[0].nome.toLowerCase().includes(busca))
        );
    }

    if (filtros.ordenacao === 'menor') {
        resultado.sort((a, b) => parseFloat(a.servicos[0].preco) - parseFloat(b.servicos[0].preco));
    } else if (filtros.ordenacao === 'maior') {
        resultado.sort((a, b) => parseFloat(b.servicos[0].preco) - parseFloat(a.servicos[0].preco));
    }

    // Aplica paginação
    window.usuariosFiltrados = resultado;
    window.offsetFiltro = 0;

    const container = document.getElementById('user-dashboard');
    container.innerHTML = '';
    carregarUsuariosFiltrados();
}

// =====================
// CARREGAR USUÁRIOS FILTRADOS (paginados)
// =====================

function carregarUsuariosFiltrados() {
    const container = document.getElementById('user-dashboard');
    const slice = window.usuariosFiltrados.slice(window.offsetFiltro, window.offsetFiltro + limite);
    container.innerHTML = '';  // limpa antes de renderizar

    slice.forEach(usuario => {
        renderizarUsuarioCard(usuario);
    });
}

// Função para renderizar um único card de usuário (opcional separar para reutilizar)
function renderizarUsuarioCard(usuario) {
    const container = document.getElementById('user-dashboard');
    const { nome, imagem_url: imagem, endereco, numero, cidade, estado: uf, servicos } = usuario;
    const rua = endereco + (numero ? ', ' + numero : '');
    const servico = servicos && servicos.length > 0
        ? servicos[0]
        : { nome: 'Sem serviço', preco: '0', tipo_precificacao: '' };

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-img">
            <img class="user-img" src="${imagem || '/assets/img/default-user.png'}" alt="${nome}">
        </div>
        <div class="card-caption col p-05 gap-05 h-100">
            <h2 class="user-name">${nome}</h2>
            <div class="user-job">
                <i class="bi bi-briefcase me-05"></i>${servico.nome || 'Sem serviço'}
            </div>
            <p class="user-adress">
                <i class="bi bi-geo-alt me-05"></i>${rua}, ${cidade}/${uf}
            </p>
            <div class="user-price">
                R$ ${servico.preco} <span class="ms-05 mt-auto">${servico.tipo_precificacao || ''}</span>
            </div>
            <button class="btn-conect">
                <i class="bi bi-whatsapp me-05"></i>Quero contratar
            </button>
        </div>
    `;
    container.appendChild(card);
}

// =====================
// FILTROS ATIVOS
// =====================

function updateActiveFilter(key, label) {
    const existing = activeFiltersContainer.querySelector(`[data-key="${key}"]`);
    if (existing) existing.remove();

    if (label && label.trim() !== '') {
        const el = document.createElement('div');
        el.className = 'filter-tag';
        el.dataset.key = key;
        el.innerHTML = `${label} <button class="btn-remove" data-remove="${key}">x</button>`;
        activeFiltersContainer.appendChild(el);
    }
}

function removeActiveFilter(key) {
    const el = activeFiltersContainer.querySelector(`[data-key="${key}"]`);
    if (el) el.remove();
}

// =====================
// REMOVER FILTRO (X)
// =====================

activeFiltersContainer.addEventListener('click', function (e) {
    const key = e.target.dataset.remove;
    if (!key) return;

    if (key.startsWith('profissao-')) {
        const job = key.replace('profissao-', '');
        filtros.profissao = filtros.profissao.filter(j => j !== job);

        const btn = document.querySelector(`.job-btn[data-job="${job}"]`);
        if (btn) btn.classList.remove('active');
    } else {
        filtros[key] = '';

        if (key === 'estado') estadoSelect.value = '';
        if (key === 'precoMin') precoMinInput.value = '';
        if (key === 'precoMax') precoMaxInput.value = '';
        if (key === 'busca') searchInput.value = '';
        if (key === 'ordenacao') filtros.ordenacao = '';
    }

    removeActiveFilter(key);
    aplicarFiltros();
});

// =====================
// CARREGAR PROFISSÕES
// =====================

async function carregarProfissoes() {
    try {
        const resposta = await fetch('https://raw.githubusercontent.com/pedroantoniosi/peao-de-aluguel-2/refs/heads/main/assets/js/api/jobs.json');
        const dados = await resposta.json();
        renderizarProfissoes(dados);
    } catch (erro) {
        console.error('Erro ao carregar profissões:', erro);
    }
}

function renderizarProfissoes(categorias) {
    jobListContainer.innerHTML = '';

    categorias.forEach(categoria => {
        const grupo = document.createElement('div');
        grupo.classList.add('job-group', 'col', 'gap-05');

        const titulo = document.createElement('h3');
        titulo.classList.add('job-group-title');
        titulo.textContent = categoria.categoria;
        grupo.appendChild(titulo);

        const lista = document.createElement('div');
        lista.classList.add('job-buttons', 'row', 'gap-05', 'flex-wrap');

        categoria.servico.forEach(servico => {
            const botao = document.createElement('button');
            botao.classList.add('job-btn', 'filter-item');
            botao.dataset.job = servico.nome;
            botao.textContent = servico.nome;
            lista.appendChild(botao);
        });

        grupo.appendChild(lista);
        jobListContainer.appendChild(grupo);
    });
}

// Chama ao carregar a página
carregarProfissoes();
