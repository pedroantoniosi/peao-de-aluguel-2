const cepInput = document.getElementById("cep");
const enderecoInput = document.getElementById("endereco");
const cidadeInput = document.getElementById("cidade");
const estadoInput = document.getElementById("estado");

cepInput.addEventListener("blur", () => {
    const cep = cepInput.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                return;
            }
            enderecoInput.value = data.logradouro || "";
            cidadeInput.value = data.localidade || "";
            estadoInput.value = data.uf || "";
        })
        .catch(() => {
            alert("Erro ao buscar CEP.");
        });
});
