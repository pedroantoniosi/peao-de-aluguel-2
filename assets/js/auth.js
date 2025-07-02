
document.addEventListener("DOMContentLoaded", function () {
    const dashboard = document.getElementById("dashboard");

    // Botões principais da tela inicial
    const btnCliente = dashboard.querySelector(".btn-client");
    const btnProfissional = dashboard.querySelector(".btn-profissional");

    // Telas principais
    const clientScreen = document.getElementById("client-screen");
    const profissionalScreen = document.getElementById("profissional-screen");

    // Container da tela inicial
    const authButtons = dashboard.querySelector(".auth-buttons");

    // Oculta todas as etapas
    function hideAllSteps() {
        const allSteps = dashboard.querySelectorAll(".form-step");
        allSteps.forEach(step => step.style.display = "none");
    }

    // Oculta todas as telas principais
    function hideAllScreens() {
        clientScreen.style.display = "none";
        profissionalScreen.style.display = "none";
    }

    // Mostra tela inicial
    function showInitialScreen() {
        authButtons.style.display = "flex";
        hideAllScreens();
        hideAllSteps();
    }

    // Mostra a primeira etapa de uma tela
    function showFirstStep(screen) {
        const firstStep = screen.querySelector(".form-step");
        if (firstStep) {
            hideAllSteps();
            firstStep.style.display = "flex";
        }
    }

    // Alterna para tela do cliente
    btnCliente.addEventListener("click", () => {
        authButtons.style.display = "none";
        clientScreen.style.display = "flex";
        showFirstStep(clientScreen);
    });

    // Alterna para tela do profissional
    btnProfissional.addEventListener("click", () => {
        authButtons.style.display = "none";
        profissionalScreen.style.display = "flex";
        showFirstStep(profissionalScreen);
    });

    // Botões de voltar (um para cliente, um para profissional)
    const backButtons = dashboard.querySelectorAll(".btn-voltar");
    backButtons.forEach(btn => {
        btn.addEventListener("click", showInitialScreen);
    });

    // Avança para a próxima etapa
    function nextStep(currentStep) {
        const next = currentStep.nextElementSibling;
        if (next && next.classList.contains("form-step")) {
            hideAllSteps();
            next.style.display = "flex";
        }
    }

    // Volta para etapa anterior
    function prevStep(currentStep) {
        const prev = currentStep.previousElementSibling;
        if (prev && prev.classList.contains("form-step")) {
            hideAllSteps();
            prev.style.display = "flex";
        }
    }

    // Lógica para avançar/voltar etapas
    const allSteps = dashboard.querySelectorAll(".form-step");
    allSteps.forEach(step => {
        const nextBtn = step.querySelector(".btn-next");
        const prevBtn = step.querySelector(".btn-prev");

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                const senha = step.querySelector("#senha");
                const confirmarSenha = step.querySelector("#confirmarSenha");
                const erroSenha = step.querySelector("#erroSenha");

                if (senha && confirmarSenha && erroSenha) {
                    if (senha.value !== confirmarSenha.value) {
                        erroSenha.style.display = "flex";
                        return;
                    } else {
                        erroSenha.style.display = "none";
                    }
                }

                nextStep(step);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                prevStep(step);
            });
        }
    });

    // Inicializa ocultando tudo, exceto tela inicial
    showInitialScreen();
});


// Exibe ou oculta o campo de CNPJ conforme o checkbox
const temCnpjCheckbox = document.getElementById("temCnpjCliente");
const cnpjField = document.getElementById("cnpjFieldCliente");

if (temCnpjCheckbox && cnpjField) {
    temCnpjCheckbox.addEventListener("change", function () {
        if (this.checked) {
            cnpjField.style.display = "flex";
        } else {
            cnpjField.style.display = "none";
        }
    });
}