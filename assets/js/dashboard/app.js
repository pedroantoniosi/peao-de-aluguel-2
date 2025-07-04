fetch('/data/users.json') // ou './assets/js/dashboard/users.json' dependendo da estrutura do seu projeto
    .then(response => response.json())
    .then(usuarios => {
        const userCard = document.getElementById('user-dashboard'); // ou outro ID correto
        usuarios.forEach(usuario => {
            userCard.innerHTML += `
        <div class="card">
            <div class="card-img">
                <img class="user-img" src="${usuario.imagem}" alt="">
            </div>
            <div class="card-caption col p-05 gap-05 h-100">
                <h2 class="user-name">${usuario.nome}</h2>
                <div class="user-job"><i class="bi bi-briefcase me-05"></i>${usuario.profissao}</div>
                <p class="user-adress"><i class="bi bi-geo-alt me-05"></i>${usuario.endereco}</p>
                <div class="user-price">${usuario.preco}<span class="ms-05 mt-auto">${usuario.tipoPreco}</span></div>
                <button class="btn-conect"><i class="bi bi-whatsapp me-05"></i>Quero contratar</button>
            </div>
        </div>
      `;
        });
    })
    .catch(error => console.error('Erro ao carregar usuários:', error));
