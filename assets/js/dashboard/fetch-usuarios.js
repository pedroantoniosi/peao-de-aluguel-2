function renderizarUsuarios(usuarios) {
    const container = document.getElementById('user-dashboard');
    container.innerHTML = ''; // limpa antes

    usuarios.forEach(usuario => {
        // Extraia telefone junto com os outros campos
        const {
            nome,
            telefone,
            imagem_url: imagem,
            endereco,
            numero,
            cidade,
            estado: uf,
            servicos
        } = usuario;

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
                <a class="btn-conect text-center" href="https://wa.me/${telefone ? telefone.replace(/\D/g, '') : ''}" target="_blank">
                    <i class="bi bi-whatsapp me-05"></i>Quero contratar
                </a>
            </div>
        `;

        container.appendChild(card);
    });
}

// Fetch da API
fetch('/peao-de-aluguel/php/api_profissionais.php')
    .then(response => {
        if (!response.ok) {
            console.error(`Erro na requisição: ${response.status} (${response.statusText})`);
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados da API:', data);
        if (Array.isArray(data)) {
            renderizarUsuarios(data);
        } else if (data && Array.isArray(data.usuarios)) {
            renderizarUsuarios(data.usuarios);
        } else {
            console.error('Formato inesperado dos dados:', data);
        }
    })
    .catch(err => console.error('Erro ao carregar profissionais:', err));

