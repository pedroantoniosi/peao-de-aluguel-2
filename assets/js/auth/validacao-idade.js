// Utilidade: retorna true se a idade for >= 18
function temMaisDe18Anos(dataNascimentoStr) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimentoStr);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    const dia = hoje.getDate() - nascimento.getDate();

    if (mes < 0 || (mes === 0 && dia < 0)) {
        return idade - 1 >= 18;
    }
    return idade >= 18;
}

// Lógica para validar os dois campos de data
function validarIdade(inputId, erroId) {
    const input = document.getElementById(inputId);
    const erro = document.getElementById(erroId);

    if (!input) return true; // Campo não existe, não validar

    const data = input.value;
    if (data && !temMaisDe18Anos(data)) {
        erro.style.display = 'block';
        return false;
    } else {
        erro.style.display = 'none';
        return true;
    }
}

// Função que deve ser chamada antes de avançar de tela
function validarIdadeAntesDeAvancar() {
    const idadeProfValida = validarIdade('dataNascimentoProfissional', 'erroIdadeProfissional');
    const idadeContValida = validarIdade('dataNascimentoContratante', 'erroIdadeContratante');

    return idadeProfValida && idadeContValida;
}

// Exemplo: usar isso ao tentar avançar para próxima etapa
document.querySelectorAll('.btn-next')?.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const formStepAtual = e.target.closest('.form-step');
        const inputs = formStepAtual.querySelectorAll('input, select');
        let valido = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                valido = false;
                input.reportValidity();
            }
        });

        // Verifica idade mínima também
        const idadeValida = validarIdadeAntesDeAvancar();

        if (valido && idadeValida) {
            formStepAtual.classList.remove('active');
            const proximoStep = formStepAtual.nextElementSibling;
            if (proximoStep?.classList.contains('form-step')) {
                proximoStep.classList.add('active');
            }
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const hoje = new Date();
    const maxDate = new Date(hoje.getFullYear() - 18, hoje.getMonth(), hoje.getDate());
    const maxDateStr = maxDate.toISOString().split("T")[0];

    const camposData = document.querySelectorAll('input[type="date"]');
    camposData.forEach(input => input.max = maxDateStr);
});
