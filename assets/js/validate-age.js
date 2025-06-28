
const inputData = document.getElementById("dataNascimento");
const form = document.getElementById("formCadastro");
const erroIdade = document.getElementById("erroIdade");

// Máscara automática para dd/mm/aaaa
inputData.addEventListener("input", () => {
    let valor = inputData.value.replace(/\D/g, "").slice(0, 8);
    if (valor.length >= 5) {
        inputData.value = valor.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
    } else if (valor.length >= 3) {
        inputData.value = valor.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    } else {
        inputData.value = valor;
    }
});

// Função para validar idade mínima de 18 anos
function validarIdadeMinima() {
    const valor = inputData.value.trim();
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = valor.match(regex);

    if (!match) {
        erroIdade.textContent = "Data inválida. Use o formato dd/mm/aaaa.";
        erroIdade.style.display = "block";
        return false;
    }

    const [_, dia, mes, ano] = match;
    const dataNascimento = new Date(`${ano}-${mes}-${dia}`);

    // Verifica se a data é válida
    if (
        dataNascimento.getFullYear() !== parseInt(ano) ||
        dataNascimento.getMonth() + 1 !== parseInt(mes) ||
        dataNascimento.getDate() !== parseInt(dia)
    ) {
        erroIdade.textContent = "Data inválida.";
        erroIdade.style.display = "block";
        return false;
    }

    const hoje = new Date();
    let idade = hoje.getFullYear() - parseInt(ano);
    const aniversarioEsteAno = new Date(hoje.getFullYear(), parseInt(mes) - 1, parseInt(dia));

    if (hoje < aniversarioEsteAno) {
        idade--;
    }

    if (idade < 18) {
        erroIdade.textContent = "Você precisa ter no mínimo 18 anos.";
        erroIdade.style.display = "block";
        return false;
    }

    erroIdade.style.display = "none"; // tudo certo
    return true;
}

// Bloqueia o envio se for inválido
form.addEventListener("submit", function (e) {
    if (!validarIdadeMinima()) {
        e.preventDefault();
    }
});
