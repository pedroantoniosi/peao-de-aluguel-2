document.addEventListener('DOMContentLoaded', () => {
    // Alternância da visibilidade da senha
    function toggleSenhaVisibility(icoSenha) {
        let inputSenha = icoSenha.previousElementSibling;
        if (!inputSenha || inputSenha.tagName !== 'INPUT') {
            inputSenha = icoSenha.parentElement.querySelector('input[type="password"], input[type="text"]');
        }
        if (!inputSenha) return;

        if (inputSenha.type === 'password') {
            inputSenha.type = 'text';
            icoSenha.querySelector('i').classList.replace('bi-eye', 'bi-eye-slash');
        } else {
            inputSenha.type = 'password';
            icoSenha.querySelector('i').classList.replace('bi-eye-slash', 'bi-eye');
        }
    }

    // Aplica evento para todos os ícones de olho de todos os formulários
    const iconesOlho = document.querySelectorAll('.ico-password');
    iconesOlho.forEach(icoSenha => {
        icoSenha.style.cursor = 'pointer';
        icoSenha.addEventListener('click', () => toggleSenhaVisibility(icoSenha));
    });

    // Função para validar se senhas iguais dentro de um form
    window.validarSenhaIgual = function (form) {
        // Busca inputs de senha e confirmação dentro do form dinamicamente
        const senha = form.querySelector('input[type="password"][name*="senha"]:not([name*="confirmar"])');
        const confirmarSenha = form.querySelector('input[type="password"][name*="confirmar"]');
        // Busca o span de erro que comece com 'erroSenha' dentro do form
        const erroSenha = form.querySelector('span[id^="erroSenha"]');

        if (!senha || !confirmarSenha || !erroSenha) {
            // Se algum elemento não existir, assume válido
            return true;
        }

        if (senha.value !== confirmarSenha.value) {
            erroSenha.style.display = 'inline';
            confirmarSenha.focus();
            return false;
        } else {
            erroSenha.style.display = 'none';
            return true;
        }
    };
});
