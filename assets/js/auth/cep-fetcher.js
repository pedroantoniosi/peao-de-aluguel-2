document.addEventListener('DOMContentLoaded', function () {
    const cepInput = document.getElementById('cepProfissional');

    // Formatação automática do CEP
    cepInput.addEventListener('input', function () {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 5) {
            value = value.slice(0, 5) + '-' + value.slice(5, 8);
        }
        this.value = value;
    });

    // Busca e preenche os campos após o usuário sair do campo de CEP
    cepInput.addEventListener('blur', function () {
        const cep = this.value.replace(/\D/g, '');

        if (cep.length !== 8) {
            alert('CEP inválido. Certifique-se de digitar 8 dígitos.');
            return;
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                if (!response.ok) throw new Error('Erro ao buscar CEP');
                return response.json();
            })
            .then(data => {
                if (data.erro) {
                    alert('CEP não encontrado.');
                    return;
                }

                // IDs corrigidos aqui:
                document.getElementById('estadoContratante').value = data.uf;
                document.getElementById('cidadeContratante').value = data.localidade;
                document.getElementById('enderecoContratante').value = data.logradouro;
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao buscar o CEP.');
            });
    });
});
