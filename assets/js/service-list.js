const categorias = [
    {
        category: "Casa & Construção",
        services: ["Eletricistas", "Encanadores", "Pedreiros", "Pintores", "Gesseiros", "Azulejistas", "Marceneiros", "Serralheiros", "Vidraceiros"]
    },
    {
        category: "Limpeza & Conservação",
        services: ["Diaristas e Faxineiras", "Limpeza de estofados e carpetes", "Jardineiros"]
    },
    {
        category: "Manutenção & Reparos",
        services: ["Técnicos em eletrodomésticos", "Técnicos em ar-condicionado", "Chaveiros", "Desentupidores", "Montadores e instaladores de móveis"]
    },
    {
        category: "Educação & Aulas Particulares",
        services: ["Professores particulares (todas as matérias)", "Reforço escolar", "Aulas de idiomas", "Aulas de música", "Personal trainers"]
    },
    {
        category: "Suporte & Tecnologia",
        services: ["Técnicos em informática", "Instalação de equipamentos eletrônicos", "Suporte técnico remoto ou presencial"]
    },
    {
        category: "Beleza & Cuidados Pessoais",
        services: ["Cabeleireiros e manicures (domicílio)", "Barbeiros", "Serviços de salão de beleza"]
    },
    {
        category: "Cuidados Automotivos",
        services: ["Mecânicos móveis", "Lavagem e higienização de veículos", "Funileiros e reparadores de pintura"]
    },
    {
        category: "Eventos & Serviços Especiais",
        services: ["Fotógrafos", "Cozinheiros e chefs domiciliares", "Garçons e copeiras", "Recreadores e animadores de festas"]
    },
    {
        category: "Serviços para Pets",
        services: ["Banho e tosa móvel", "Hospedagem para pets"]
    },
    {
        category: "Entregas & Transporte",
        services: ["Motoboys e entregadores", "Fretes pequenos", "Serviços de mudança"]
    }
];

// CORREÇÃO AQUI — ID atualizado conforme o HTML
const servicoSelect = document.getElementById("servicoProfissional");
const addServicoBtn = document.getElementById("addServicoBtn");
const servicosList = document.getElementById("service-list");
const servicosAdicionados = new Set();

// Popula todos os serviços com optgroup
categorias.forEach(cat => {
    const group = document.createElement("optgroup");
    group.label = cat.category;

    cat.services.sort().forEach(service => {
        const opt = document.createElement("option");
        opt.value = service;
        opt.textContent = service;
        opt.dataset.categoria = cat.category;
        group.appendChild(opt);
    });

    servicoSelect.appendChild(group);
});

// Habilita botão somente quando serviço é escolhido
servicoSelect.addEventListener("change", () => {
    addServicoBtn.disabled = !servicoSelect.value;
});

// Função de formatação monetária
function aplicarMascaraMonetaria(input) {
    input.addEventListener("input", () => {
        let value = input.value.replace(/\D/g, "");

        if (value.length < 3) {
            value = value.padStart(3, "0");
        }

        const reais = value.slice(0, -2);
        const centavos = value.slice(-2);

        input.value = `R$ ${Number(reais)}.${centavos}`.replace(".", ",");
    });

    input.addEventListener("blur", () => {
        if (!input.value.includes(",")) {
            input.value += ",00";
        }
    });
}

// Adiciona serviço à lista
addServicoBtn.addEventListener("click", () => {
    const servico = servicoSelect.value;

    if (!servico || servicosAdicionados.has(servico) || servicosAdicionados.size >= 3) return;

    servicosAdicionados.add(servico);

    const div = document.createElement("div");
    div.innerHTML = `
        <div class="service-item">
            <div class="service-title form-item">
                <strong>${servico}</strong>
            </div>
            <div class="caption row gap-1">
                <div class="service-value form-item row gap-1">
                    <div class="form-item col">
                        <input type="text" class="service-input currency-input" placeholder="R$ 0,00"
                            required inputmode="decimal">
                    </div>
                    <div class="form-item col">
                        <select name="cobranca" class="cobranca-select" required>
                            <option value="hora">por hora</option>
                            <option value="visita">por visita</option>
                            <option value="fixo">fixo</option>
                        </select>
                    </div>
                </div>
                <div class="form-item row">
                    <button type="button" class="remove-servico btn-small" title="Remover">
                        <i class="bi bi-x-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    const inputValor = div.querySelector(".currency-input");
    aplicarMascaraMonetaria(inputValor);

    div.querySelector(".remove-servico").addEventListener("click", () => {
        servicosList.removeChild(div);
        servicosAdicionados.delete(servico);
    });

    servicosList.appendChild(div);

    // Resetar seleção
    servicoSelect.value = "";
    addServicoBtn.disabled = true;
});
