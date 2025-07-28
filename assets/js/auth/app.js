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
                        btnNext.onclick = () => avancarEtapa();
                    }
                }

                if (btnPrev) {
                    btnPrev.style.display = indice === 0 ? 'none' : 'inline-flex';
                    btnPrev.onclick = () => etapaAnterior();
                }
            });
        }

        function validarSenhasIguais() {
            // Seleciona os inputs de senha e confirmação na etapa 0
            const etapa = etapas[0];
            const senha = etapa.querySelector('input[name="senhaProfissional"]');
            const confirmarSenha = etapa.querySelector('input[name="confirmarSenhaProfissional"]');
            const erroSenha = document.getElementById('erroSenhaProfissional');

            if (!senha || !confirmarSenha || !erroSenha) return true; // se algo não existir, permite seguir

            if (senha.value !== confirmarSenha.value) {
                erroSenha.style.display = 'inline';
                confirmarSenha.focus();
                return false;
            } else {
                erroSenha.style.display = 'none';
                return true;
            }
        }

        function avancarEtapa() {
            // Validação básica: campos obrigatórios preenchidos
            const inputsObrigatorios = etapas[etapaAtual].querySelectorAll('[required]');
            for (const input of inputsObrigatorios) {
                if (!input.value.trim()) {
                    alert(`Por favor, preencha o campo "${input.previousElementSibling?.textContent || input.name}" corretamente.`);
                    input.focus();
                    return;
                }
            }

            // Na etapa 0, validar se as senhas batem
            if (etapaAtual === 0 && !validarSenhasIguais()) {
                return; // não avança se senhas diferentes
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
    });
});
