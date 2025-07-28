document.addEventListener('DOMContentLoaded', () => {
    // Use a chave pública de TESTE para evitar erro 401 no localhost
    const mp = new MercadoPago('TEST-cd97478d-ebbc-4e32-9e2c-f63577d435b2', { locale: 'pt-BR' });

    const btnPagar = document.getElementById('btn-pagar');
    const valorServicoInput = document.getElementById('valorServico');

    btnPagar.addEventListener('click', () => {
        let valorStr = valorServicoInput.value.replace(/[^\d,.-]/g, '').replace(',', '.');
        let valor = parseFloat(valorStr);

        if (isNaN(valor) || valor <= 0) {
            alert('Informe um valor válido para o serviço.');
            return;
        }

        fetch('../php/create_preference.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `valor=${valor}&descricao=${encodeURIComponent('Serviço Premium')}`
        })
            .then(response => {
                if (!response.ok) throw new Error("Erro no servidor.");
                return response.json();
            })
            .then(data => {
                if (!data.id) {
                    alert('Erro ao criar preferência de pagamento.');
                    console.error("Resposta inválida:", data);
                    return;
                }

                // Nova API do MP
                mp.checkout({
                    preference: { id: data.id },
                    autoOpen: true
                });
            })
            .catch(error => {
                console.error("Erro:", error);
                alert('Erro ao comunicar com o servidor.');
            });
    });
});
