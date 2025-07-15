let categorias = []; // Dados carregados da API

// Carrega dados da API
async function carregarCategorias() {
    try {
        const resposta = await fetch(
            'https://raw.githubusercontent.com/pedroantoniosi/peao-de-aluguel-2/refs/heads/main/assets/js/api/jobs.json'
        );
        if (!resposta.ok) throw new Error(`Erro ao buscar dados: ${resposta.status}`);
        categorias = await resposta.json();
    } catch (erro) {
        console.error('Erro ao carregar a API:', erro);
    }
}

// Busca por serviços com mais inteligência
function buscarServicos(termo) {
    const termoLower = termo.toLowerCase();

    return categorias.flatMap(categoria =>
        categoria.servico
            .filter(servico =>
                servico.nome.toLowerCase().startsWith(termoLower) ||
                servico.nome.toLowerCase().includes(termoLower)
            )
            .map(servico => ({
                categoria: categoria.categoria,
                nome: servico.nome
            }))
    );
}

// Exibe os serviços filtrados
function exibirServicos(servicos) {
    const lista = document.getElementById('service-list');
    lista.innerHTML = '';

    if (servicos.length === 0) {
        lista.style.display = 'none';
        return;
    }

    for (const servico of servicos) {
        const item = document.createElement('li');
        item.className = 'service-item p-05';
        item.innerHTML = `
            <h3 class="service-tag">${servico.categoria}</h3>
            <p class="service-name">${servico.nome}</p>
        `;
        lista.appendChild(item);
    }

    lista.style.display = 'block';
}

// Função debounce para evitar múltiplas execuções rápidas
function debounce(func, delay = 300) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

// Lógica de input com estilo e busca
const input = document.getElementById('service-input');
const lista = document.getElementById('service-list');
const inputItem = input.closest('.input-item');

input.addEventListener(
    'input',
    debounce((e) => {
        const termo = e.target.value.trim();

        if (termo.length > 1) {
            const resultados = buscarServicos(termo);
            exibirServicos(resultados);
            inputItem && (inputItem.style.borderColor = '#0267FC');
        } else {
            lista.innerHTML = '';
            lista.style.display = 'none';
            inputItem && (inputItem.style.borderColor = '');
        }
    }, 300)
);

// Botão para limpar o campo e esconder a lista
document.getElementById('closeServiceList').addEventListener('click', () => {
    input.value = '';
    lista.innerHTML = '';
    lista.style.display = 'none';
    inputItem && (inputItem.style.borderColor = '');
});

// Inicia
carregarCategorias();
