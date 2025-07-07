let todosUsuarios = [];

// Carrega os dados via fetch
fetch('https://raw.githubusercontent.com/pedroantoniosi/peao-de-aluguel-2/main/assets/js/dashboard/users.js')
    .then(res => res.text())
    .then(code => {
        todosUsuarios = (new Function(code + '; return usuarios;'))(); // captura a variável `usuarios`
        renderizarUsuarios(todosUsuarios);
    })
    .catch(error => console.error('Erro ao carregar usuários:', error));

// Função para renderizar os cards
function renderizarUsuarios(lista) {
    const userCard = document.getElementById('user-dashboard');
    let html = '';
    lista.forEach(usuario => {
        html += `
                    <div class="card">
                    <div class="card-img">
                        <img class="user-img" src="${usuario.imagem}" alt="">
                    </div>
                    <div class="card-caption col p-05 gap-05 h-100">
                        <h2 class="user-name">${usuario.nome}</h2>
                        <div class="user-job">
                        <i class="bi bi-briefcase me-05"></i>${usuario.profissao}
                        </div>
                        <p class="user-adress"><i class="bi bi-geo-alt me-05"></i>${usuario.endereco}</p>
                        <div class="user-price">${usuario.preco}<span class="ms-05 mt-auto">${usuario.tipoPreco}</span></div>
                        <button class="btn-conect"><i class="bi bi-whatsapp me-05"></i>Quero contratar</button>
                    </div>
                </div>
            `;
    });
    userCard.innerHTML = html;
}

const input = document.getElementById('search-bar');

input.addEventListener('input', () => {
    const termo = input.value.trim().toLowerCase();

    const resultados = todosUsuarios.filter(usuario => {
        return (
            usuario.nome.toLowerCase().includes(termo) ||
            usuario.profissao.toLowerCase().includes(termo) ||
            (usuario.servicos?.join(' ').toLowerCase().includes(termo) || false) ||
            usuario.endereco.toLowerCase().includes(termo)
        );
    });

    renderizarUsuarios(resultados);
});

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

const buscarUsuarios = debounce(() => {
    const termo = input.value.trim().toLowerCase();
    const resultados = todosUsuarios.filter(usuario =>
        usuario.nome.toLowerCase().includes(termo) ||
        usuario.profissao.toLowerCase().includes(termo) ||
        usuario.endereco.toLowerCase().includes(termo)
    );
    renderizarUsuarios(resultados);
}, 300);

input.addEventListener('input', buscarUsuarios);

// input.addEventListener('input', () => {
//     const termo = input.value.trim().toLowerCase();
//     const sugestoes = todosUsuarios
//         .filter(u => u.nome.toLowerCase().includes(termo) || u.profissao.toLowerCase().includes(termo))
//         .slice(0, 5);

//     const lista = document.getElementById('sugestoes');
//     lista.innerHTML = sugestoes.map(s =>
//         `<li class="list-item" onclick="selecionarSugestao('${s.nome}')">${s.nome} – ${s.profissao}</li>`
//     ).join('');
// });

// function selecionarSugestao(texto) {
//     input.value = texto;
//     document.getElementById('sugestoes').innerHTML = '';
//     input.dispatchEvent(new Event('input')); // força nova busca
// }
