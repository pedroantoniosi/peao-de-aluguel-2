function validateStep(step) {
    const inputs = step.querySelectorAll("input, select, textarea");
    const erroSenha = step.querySelector("#erroSenha");
    const senha = step.querySelector("#senha");
    const confirmarSenha = step.querySelector("#confirmarSenha");

    let isValid = true;

    // Validação HTML5 de todos os campos
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.reportValidity();
            isValid = false;
        }
    });

    // Validação extra: senha === confirmarSenha
    if (senha && confirmarSenha) {
        if (senha.value !== confirmarSenha.value) {
            if (erroSenha) erroSenha.style.display = "block";
            isValid = false;
        } else {
            if (erroSenha) erroSenha.style.display = "none";
        }
    }

    return isValid;
}
