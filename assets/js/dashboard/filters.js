if (typeof todosUsuarios === 'undefined') {
    var todosUsuarios = [];
}

const activeFiltersContainer = document.getElementById('active-filters');
const estadoSelect = document.getElementById('estadoProfissional');
const precoMinInput = document.getElementById('precoMin');
const precoMaxInput = document.getElementById('precoMax');
const searchInput = document.getElementById('search-bar');
const jobListContainer = document.getElementById('job-list');
const ordenarSelect = document.getElementById('ordenarPreco');

const filtros = {
    estado: '',
    precoMin: '',
    precoMax: '',
    profissao: [],
    busca: '',
    ordenacao: ''
};

// ========== EVENTOS ==========
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

if (ordenarSelect) {
    ordenarSelect.addEventListener('change', e => {
        filtros.ordenacao = e.target.value;

        let label = '';
        if (filtros.ordenacao === 'maior') label = 'Maior preço';
        else if (filtros.ordenacao === 'menor') label = 'Menor preço';

        updateActiveFilter('ordenacao', `Ordenação: ${label}`);
        aplicarFiltros();
    });
}

// ========== APLICAR FILTROS ==========
function aplicarFiltros() {
    let resultado = [...todosUsuarios].filter(u => u.servicos && u.servicos.length > 0);

    if (filtros.estado) {
        resultado = resultado.filter(u => u.endereco.uf === filtros.estado);
    }

    if (filtros.precoMin) {
        resultado = resultado.filter(u => u.servicos[0].preco >= filtros.precoMin);
    }

    if (filtros.precoMax) {
        resultado = resultado.filter(u => u.servicos[0].preco <= filtros.precoMax);
    }

    if (filtros.profissao.length > 0) {
        resultado = resultado.filter(u => filtros.profissao.includes(u.servicos[0].nome));
    }

    if (filtros.busca) {
        const busca = filtros.busca;
        resultado = resultado.filter(u =>
            u.nome.toLowerCase().includes(busca) ||
            u.endereco.cidade.toLowerCase().includes(busca) ||
            u.servicos[0].nome.toLowerCase().includes(busca)
        );
    }

    if (filtros.ordenacao === 'menor') {
        resultado.sort((a, b) => a.servicos[0].preco - b.servicos[0].preco);
    } else if (filtros.ordenacao === 'maior') {
        resultado.sort((a, b) => b.servicos[0].preco - a.servicos[0].preco);
    }

    renderizarUsuarios(resultado);
}

// ========== ATUALIZAR UI DE FILTROS ==========
function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

function updateActiveFilter(key, label) {
    const existing = activeFiltersContainer.querySelector(`[data-key="${key}"]`);
    if (existing) existing.remove();

    if (label && label.trim() !== '') {
        const el = document.createElement('div');
        el.className = 'filter-tag';
        el.dataset.key = key;
        el.innerHTML = `${escapeHtml(label)} <button class="btn-remove" data-remove="${key}">x</button>`;
        activeFiltersContainer.appendChild(el);
    }
}

function removeActiveFilter(key) {
    const el = activeFiltersContainer.querySelector(`[data-key="${key}"]`);
    if (el) el.remove();
}

// ========== REMOVER FILTRO ==========
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

        if (key === 'estado' && estadoSelect) estadoSelect.value = '';
        if (key === 'precoMin' && precoMinInput) precoMinInput.value = '';
        if (key === 'precoMax' && precoMaxInput) precoMaxInput.value = '';
        if (key === 'busca' && searchInput) searchInput.value = '';
        if (key === 'ordenacao' && ordenarSelect) ordenarSelect.value = '';
    }

    removeActiveFilter(key);
    aplicarFiltros();
});

// ========== PROFISSÕES ==========
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

// ========== INICIALIZAR ==========
carregarProfissoes();
