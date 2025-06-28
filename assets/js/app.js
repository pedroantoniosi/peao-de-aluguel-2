document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".btn-next");
    const prevBtns = document.querySelectorAll(".btn-prev");
    const progressText = document.createElement("div");

    let currentStep = 0;

    // Criar barra de progresso textual
    progressText.className = "text align-self-center mb-1";
    document.querySelector(".wrapper").insertBefore(progressText, steps[0]);

    function showStep(index) {
        steps.forEach((step, i) => {
            step.style.display = i === index ? "flex" : "none";
        });
        progressText.textContent = `Etapa ${index + 1} de ${steps.length}`;
    }

    function validateStep(step) {
        const inputs = step.querySelectorAll("input, select, textarea");
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
            if (validateStep(steps[currentStep])) {
                currentStep++;
                if (currentStep < steps.length) {
                    showStep(currentStep);
                } else {
                    // Simular envio
                    alert("Cadastro finalizado com sucesso!");
                    // Aqui você poderia enviar os dados via fetch/AJAX
                }
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    showStep(currentStep); // Mostrar primeira etapa
});
