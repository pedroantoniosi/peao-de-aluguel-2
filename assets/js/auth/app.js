document.addEventListener('DOMContentLoaded', () => {
    const formularios = document.querySelectorAll('form');

    formularios.forEach(formulario => {
        const etapas = formulario.querySelectorAll('.form-step');
        if (etapas.length === 0) return;

        let etapaAtual = 0;

        function mostrarEtapa(indice) {
            etapas.forEach((etapa, i) => {
                etapa.style.display = i === indice ? 'flex' : 'none';
            });
            atualizarBotoes(indice);
        }

        function atualizarBotoes(indice) {
            etapas.forEach((etapa, i) => {
                const btnNext = etapa.querySelector('.btn-next');
                const btnPrev = etapa.querySelector('.btn-prev');

                if (btnNext) {
                    if (indice === etapas.length - 1) {
                        btnNext.textContent = 'Finalizar Cadastro';
                        btnNext.type = 'submit';
                        btnNext.onclick = null;
                    } else {
                        btnNext.textContent = 'Próxima Etapa';
                        btnNext.type = 'button';
                        btnNext.onclick = () => proximaEtapa();
                    }
                }

                if (btnPrev) {
                    btnPrev.style.display = indice === 0 ? 'none' : 'inline-flex';
                    btnPrev.onclick = () => etapaAnterior();
                }
            });
        }

        function proximaEtapa() {
            // Validação de campos obrigatórios na etapa atual
            const inputsObrigatorios = etapas[etapaAtual].querySelectorAll('[required]');
            for (const input of inputsObrigatorios) {
                if (!input.value.trim()) {
                    alert(`Por favor, preencha o campo "${input.previousElementSibling?.textContent || input.name}" corretamente.`);
                    input.focus();
                    return;
                }
            }

            // Validação especial de senha na etapa 0
            if (etapaAtual === 0 && !window.validarSenhaIgual(formulario)) {
                return; // não avançar se as senhas não baterem
            }

            if (etapaAtual < etapas.length - 1) {
                etapaAtual++;
                mostrarEtapa(etapaAtual);
            }
        }

        function etapaAnterior() {
            if (etapaAtual > 0) {
                etapaAtual--;
                mostrarEtapa(etapaAtual);
            }
        }

        mostrarEtapa(etapaAtual);
        window.configurarAlternanciaSenha(formulario);
    });
});

const idadeMinima = 18;

function validarIdade(inputId, erroId) {
    const input = document.getElementById(inputId);
    const erro = document.getElementById(erroId);
    if (!input) return true;

    const valor = input.value;
    if (!valor) {
        erro.style.display = 'none';
        return true;
    }

    const hoje = new Date();
    const nascimento = new Date(valor);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    if (idade < idadeMinima) {
        erro.style.display = 'inline';
        input.focus();
        return false;
    } else {
        erro.style.display = 'none';
        return true;
    }
}

// Atualiza o atributo max dos inputs de data para impedir datas futuras
document.querySelectorAll('input[type="date"]').forEach(input => {
    input.max = new Date().toISOString().split('T')[0];
});

// Adiciona validação ao avançar de etapa
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form').forEach(formulario => {
        formulario.addEventListener('submit', function (e) {
            const validoContratante = validarIdade('dataNascimentoContratante', 'erroIdadeContratante');
            const validoProfissional = validarIdade('dataNascimentoProfissional', 'erroIdadeProfissional');
            if (!validoContratante || !validoProfissional) {
                e.preventDefault();
            }
        });
    });
});
