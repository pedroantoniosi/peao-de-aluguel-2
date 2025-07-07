// auth.js
document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".btn-next");
    const prevBtns = document.querySelectorAll(".btn-prev");
    let currentStep = 0;

    function showStep(index) {
        steps.forEach((step, i) => {
            step.style.display = i === index ? "flex" : "none";
        });
    }

    function validateStep(stepElement) {
        const inputs = stepElement.querySelectorAll("input[required]");
        for (let input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return false;
            }
        }
        return true;
    }

    nextBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const stepElement = steps[currentStep];

            if (!validateStep(stepElement)) return;

            // Se a etapa atual contém o campo de senha, validar a igualdade
            const isSenhaStep = stepElement.querySelector("#senha") !== null;

            if (isSenhaStep) {
                // Busca os campos de senha e confirmação dentro do step atual
                const senhaInput = stepElement.querySelector("#senha");
                const confirmarSenhaInput = stepElement.querySelector("#confirmarSenha");
                const erroSenha = stepElement.querySelector("#erroSenha");

                if (senhaInput && confirmarSenhaInput && erroSenha) {
                    if (senhaInput.value !== confirmarSenhaInput.value) {
                        erroSenha.style.display = "block";
                        confirmarSenhaInput.setCustomValidity("As senhas não coincidem.");
                        confirmarSenhaInput.reportValidity();
                        return; // bloqueia avanço
                    } else {
                        erroSenha.style.display = "none";
                        confirmarSenhaInput.setCustomValidity("");
                    }
                }
            }

            currentStep++;
            if (currentStep < steps.length) {
                showStep(currentStep);
            } else {
                alert("Cadastro finalizado com sucesso!");
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            currentStep--;
            if (currentStep >= 0) {
                showStep(currentStep);
            }
        });
    });

    showStep(currentStep); // Exibe o primeiro passo ao carregar
});
