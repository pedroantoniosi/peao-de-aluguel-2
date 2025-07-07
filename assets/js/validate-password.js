document.addEventListener('DOMContentLoaded', function () {
    const senhaInput = document.getElementById('senhaCliente');
    const confirmarSenhaInput = document.getElementById('confirmarSenhaCliente');
    const erroSenha = document.getElementById('erroSenhaCliente');
    const btnNext = document.querySelector('.btn-next');

    function validarSenhas() {
        const senha = senhaInput.value;
        const confirmarSenha = confirmarSenhaInput.value;
        if (senha.length >= 6 && confirmarSenha.length >= 6 && senha !== confirmarSenha) {
            erroSenha.style.display = 'block';
            return false;
        } else {
            erroSenha.style.display = 'none';
            return true;
        }
    }

    confirmarSenhaInput.addEventListener('input', validarSenhas);
    senhaInput.addEventListener('input', validarSenhas);

    btnNext.addEventListener('click', function (e) {
        if (!validarSenhas()) {
            confirmarSenhaInput.focus();
            return;
        }
        // Aqui você pode avançar para o próximo passo do formulário
        // Exemplo: document.querySelector('.form-step.step-register').style.display = 'none';
        // Mostre o próximo passo do formulário conforme sua lógica
    });
});