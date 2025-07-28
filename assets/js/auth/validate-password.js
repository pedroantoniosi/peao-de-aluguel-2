document.addEventListener("DOMContentLoaded", () => {
    const allSteps = document.querySelectorAll(".form-step");

    allSteps.forEach((step) => {
        const nextBtn = step.querySelector(".btn-next");
        const prevBtn = step.querySelector(".btn-prev");

        if (nextBtn) {
            nextBtn.addEventListener("click", async (e) => {
                e.preventDefault();

                // Se esta etapa tem campo email, faz a validação do email duplicado
                const emailInput = step.querySelector("#emailProfissional");
                const erroEmailSpan = step.querySelector("#erroEmailDuplicado");

                // Validar senha (se for a etapa que tem senha)
                const senhaValida = validarSenhaIgual(step);
                if (!senhaValida) return; // Senhas não batem, já mostra erro e não avança

                if (emailInput && erroEmailSpan) {
                    const email = emailInput.value.trim();

                    if (!email) {
                        erroEmailSpan.style.display = "inline";
                        erroEmailSpan.textContent = "Digite um email válido.";
                        emailInput.focus();
                        return; // Não avança
                    }

                    try {
                        const res = await fetch("../php/verifica_email.php", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                            body: "email=" + encodeURIComponent(email),
                        });

                        const text = (await res.text()).trim();

                        if (text === "email_duplicado") {
                            erroEmailSpan.style.display = "inline";
                            erroEmailSpan.textContent = "Este email já está cadastrado.";
                            emailInput.focus();
                            return; // Não avança!
                        } else if (text === "email_livre") {
                            erroEmailSpan.style.display = "none";

                            // Avança para próxima etapa
                            const next = step.nextElementSibling;
                            if (next && next.classList.contains("form-step")) {
                                allSteps.forEach((s) => (s.style.display = "none"));
                                next.style.display = "flex";
                            }
                        } else {
                            alert("Erro inesperado na validação do email");
                        }
                    } catch (error) {
                        alert("Erro na comunicação com o servidor");
                        console.error(error);
                    }
                } else {
                    // Se não tem campo email nesta etapa, avança normalmente
                    const next = step.nextElementSibling;
                    if (next && next.classList.contains("form-step")) {
                        allSteps.forEach((s) => (s.style.display = "none"));
                        next.style.display = "flex";
                    }
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const prev = step.previousElementSibling;
                if (prev && prev.classList.contains("form-step")) {
                    allSteps.forEach((s) => (s.style.display = "none"));
                    prev.style.display = "flex";
                }
            });
        }
    });
});
