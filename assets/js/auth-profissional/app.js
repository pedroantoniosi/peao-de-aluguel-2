
// let etapaAtual = 0;
// const etapas = document.querySelectorAll('.form-step');

// // Inicializa exibindo a primeira etapa
// function mostrarEtapa(indice) {
//     etapas.forEach((etapa, i) => {
//         etapa.style.display = i === indice ? 'flex' : 'none';
//     });

//     atualizarBotoes(indice);
// }

// // Inicializa exibindo a primeira etapa
// function atualizarBotoes(indice) {
//     etapas.forEach((etapa, i) => {
//         const btnNext = etapa.querySelector('.btn-next');
//         const btnPrev = etapa.querySelector('.btn-prev');

//         // Texto do botão "Avançar" ou "Finalizar"
//         if (btnNext) {
//             if (indice === etapas.length - 1) {
//                 btnNext.textContent = 'Finalizar Cadastro';
//                 btnNext.type = 'submit';
//                 btnNext.onclick = null; // remove função onclick
//             } else {
//                 btnNext.textContent = 'Próxima Etapa';
//                 btnNext.type = 'button';
//                 btnNext.onclick = () => proximaEtapa();
//             }
//         }

//         // Oculta o botão "Voltar" na primeira tela
//         if (btnPrev) {
//             btnPrev.style.display = indice === 0 ? 'none' : 'inline-flex';
//             btnPrev.onclick = () => etapaAnterior();
//         }
//     });
// }

// // Inicializa exibindo a primeira etapa
// function proximaEtapa() {
//     // Exemplo de validação da primeira etapa
//     if (etapaAtual === 0) {
//         const email = document.getElementById('emailProfissional');
//         const senha = document.getElementById('senhaProfissional');
//         const confirmarSenha = document.getElementById('confirmarSenhaProfissional');
//         const erroSenha = document.getElementById('erroSenhaProfissional');

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if (!email.value.trim() || !emailRegex.test(email.value)) {
//             alert('Por favor, insira um e-mail válido.');
//             email.focus();
//             return;
//         }

//         if (!senha.value.trim()) {
//             alert('Por favor, insira uma senha.');
//             senha.focus();
//             return;
//         }

//         if (senha.value !== confirmarSenha.value) {
//             erroSenha.style.display = 'inline';
//             confirmarSenha.focus();
//             return;
//         } else {
//             erroSenha.style.display = 'none';
//         }
//     }

//     if (etapaAtual < etapas.length - 1) {
//         etapaAtual++;
//         mostrarEtapa(etapaAtual);
//     }
// }

// // Inicializa exibindo a primeira etapa
// function etapaAnterior() {
//     if (etapaAtual > 0) {
//         etapaAtual--;
//         mostrarEtapa(etapaAtual);
//     }
// }

// // Inicializa exibindo a primeira etapa
// document.addEventListener('DOMContentLoaded', () => {
//     mostrarEtapa(etapaAtual);
// });

// // Inicializa exibindo a primeira etapa
// document.getElementById('galeria-imagens').addEventListener('change', function () {
//     console.log('Evento change disparado.');
//     const maxFiles = 4;
//     console.log('Arquivos selecionados:', this.files.length); // Verifique quantos arquivos estão aqui
//     const fileListContainer = document.getElementById('file-names-list');
//     fileListContainer.innerHTML = '';

//     if (this.files.length > maxFiles) {
//         console.log('Limite excedido! Limpando seleção.'); // Verifique se esta mensagem aparece
//         alert(`Você pode selecionar no máximo ${maxFiles} imagens. Por favor, selecione novamente.`);
//         this.value = ''; // Limpa a seleção de arquivos
//         fileListContainer.innerHTML = '<li>Nenhuma imagem selecionada.</li>';
//         return;
//     }
//     // ... restante do seu código
// });
