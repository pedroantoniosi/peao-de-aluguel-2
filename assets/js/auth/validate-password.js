// document.addEventListener('DOMContentLoaded', function () {
//     const senhaInput = document.getElementById('senhaCliente');
//     const confirmarSenhaInput = document.getElementById('confirmarSenhaCliente');
//     const erroSenha = document.getElementById('erroSenhaCliente');
//     const btnNext = document.querySelector('.btn-next');

//     function validarSenhas() {
//         const senha = senhaInput.value;
//         const confirmarSenha = confirmarSenhaInput.value;
//         if (senha.length >= 6 && confirmarSenha.length >= 6 && senha !== confirmarSenha) {
//             erroSenha.style.display = 'block';
//             return false;
//         } else {
//             erroSenha.style.display = 'none';
//             return true;
//         }
//     }

//     confirmarSenhaInput.addEventListener('input', validarSenhas);
//     senhaInput.addEventListener('input', validarSenhas);

//     btnNext.addEventListener('click', function (e) {
//         if (!validarSenhas()) {
//             confirmarSenhaInput.focus();
//             return;
//         }
//         // Aqui você pode avançar para o próximo passo do formulário
//         // Exemplo: document.querySelector('.form-step.step-register').style.display = 'none';
//         // Mostre o próximo passo do formulário conforme sua lógica
//     });
// });


document.querySelectorAll('.ico-password').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        const icon = btn.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const senhaInput = document.getElementById('senhaContratante');
    const confirmarSenhaInput = document.getElementById('confirmarSenhaContratante');
    const erroSpan = document.getElementById('erroSenhaCliente');

    function verificarSenhas() {
        const senha = senhaInput.value;
        const confirmarSenha = confirmarSenhaInput.value;

        if (senha && confirmarSenha && senha !== confirmarSenha) {
            erroSpan.style.display = 'block';
        } else {
            erroSpan.style.display = 'none';
        }
    }

    senhaInput.addEventListener('input', verificarSenhas);
    confirmarSenhaInput.addEventListener('input', verificarSenhas);
    senhaInput.addEventListener('blur', verificarSenhas);
    confirmarSenhaInput.addEventListener('blur', verificarSenhas);
});
