let categorias = []; // Para armazenar os dados carregados da API

// Função para carregar os dados da API
async function carregarCategorias() {
    try {
        const resposta = await fetch('https://raw.githubusercontent.com/pedroantoniosi/peao-de-aluguel-2/refs/heads/main/assets/js/api/jobs.json');
        if (!resposta.ok) throw new Error(`Erro ao buscar dados: ${resposta.status}`);

        categorias = await resposta.json(); // Salva os dados em uma variável global
    } catch (erro) {
        console.error('Erro ao carregar a API:', erro);
    }
}

// Função para buscar e filtrar os serviços
function buscarServicos(termo) {
    const termoLower = termo.toLowerCase();
    const resultados = [];

    categorias.forEach(categoria => {
        categoria.servico.forEach(servico => {
            if (servico.nome.toLowerCase().includes(termoLower)) {
                resultados.push({
                    categoria: categoria.categoria,
                    nome: servico.nome
                });
            }
        });
    });

    return resultados;
}

document.getElementById('service-input').addEventListener('input', (e) => {
    const termo = e.target.value.trim();
    const lista = document.getElementById('service-list');
    const inputItem = e.target.closest('.input-item'); // pega o elemento pai com a classe .input-item

    if (termo.length > 1) {
        const resultados = buscarServicos(termo);
        exibirServicos(resultados);
        if (inputItem) {
            inputItem.style.borderColor = '#0267FC'; // cor azul ativa
        }
    } else {
        lista.innerHTML = '';
        lista.style.display = 'none';
        if (inputItem) {
            inputItem.style.borderColor = ''; // remove estilo inline e usa o padrão do CSS
        }
    }
});


document.getElementById('service-input').addEventListener('input', (e) => {
    const termo = e.target.value.trim();
    const lista = document.getElementById('service-list');

    if (termo.length > 1) {
        const resultados = buscarServicos(termo);
        exibirServicos(resultados);
    } else {
        lista.innerHTML = '';
        lista.style.display = 'none'; // Oculta a lista se não tiver busca válida
    }
});


// Função para exibir os resultados
function exibirServicos(servicos) {
    const lista = document.getElementById('service-list');
    lista.innerHTML = ''; // Limpa os resultados anteriores

    if (servicos.length === 0) {
        lista.style.display = 'none'; // Esconde se não houver resultados
        return;
    }

    servicos.forEach(servico => {
        const item = document.createElement('li');
        item.className = 'service-item p-05';
        item.innerHTML = `
      <h3 id="service-tag">${servico.categoria}</h3>
      <p class="service-name">${servico.nome}</p>
    `;
        lista.appendChild(item);
    });

    lista.style.display = 'block'; // Mostra se houver resultados
}


// Evento de input para buscar em tempo real
document.getElementById('service-input').addEventListener('input', (e) => {
    const termo = e.target.value.trim();
    if (termo.length > 1) {
        const resultados = buscarServicos(termo);
        exibirServicos(resultados);
    } else {
        document.getElementById('service-list').innerHTML = '';
    }
});

// Inicializa
carregarCategorias();
