const categorias = [
    {
        category: "Casa & Construção",
        services: [
            "Eletricistas", "Encanadores", "Pedreiros", "Pintores",
            "Gesseiros", "Azulejistas", "Marceneiros", "Serralheiros", "Vidraceiros"
        ]
    },
    {
        category: "Limpeza & Conservação",
        services: [
            "Diaristas e Faxineiras", "Limpeza de estofados e carpetes", "Jardineiros"
        ]
    },
    {
        category: "Manutenção & Reparos",
        services: [
            "Técnicos em eletrodomésticos", "Técnicos em ar-condicionado",
            "Chaveiros", "Desentupidores", "Montadores e instaladores de móveis"
        ]
    },
    {
        category: "Educação & Aulas Particulares",
        services: [
            "Professores particulares (todas as matérias)", "Reforço escolar",
            "Aulas de idiomas", "Aulas de música", "Personal trainers"
        ]
    },
    {
        category: "Suporte & Tecnologia",
        services: [
            "Técnicos em informática", "Instalação de equipamentos eletrônicos",
            "Suporte técnico remoto ou presencial"
        ]
    },
    {
        category: "Beleza & Cuidados Pessoais",
        services: [
            "Cabeleireiros e manicures (domicílio)", "Barbeiros", "Serviços de salão de beleza"
        ]
    },
    {
        category: "Cuidados Automotivos",
        services: [
            "Mecânicos móveis", "Lavagem e higienização de veículos",
            "Funileiros e reparadores de pintura"
        ]
    },
    {
        category: "Eventos & Serviços Especiais",
        services: [
            "Fotógrafos", "Cozinheiros e chefs domiciliares",
            "Garçons e copeiras", "Recreadores e animadores de festas"
        ]
    },
    {
        category: "Serviços para Pets",
        services: [
            "Banho e tosa móvel", "Hospedagem para pets"
        ]
    },
    {
        category: "Entregas & Transporte",
        services: [
            "Motoboys e entregadores", "Fretes pequenos", "Serviços de mudança"
        ]
    }
];

const categoriaSelect = document.getElementById("categoria");
const servicoSelect = document.getElementById("servico");

// Preencher categorias
categorias.forEach(item => {
    const option = document.createElement("option");
    option.value = item.category;
    option.textContent = item.category;
    categoriaSelect.appendChild(option);
});

// Atualizar serviços ao selecionar categoria
categoriaSelect.addEventListener("change", () => {
    const selecionado = categoriaSelect.value;
    servicoSelect.innerHTML = '<option value="">Selecione um serviço</option>';

    if (selecionado) {
        const dados = categorias.find(cat => cat.category === selecionado);
        dados.services.forEach(servico => {
            const opt = document.createElement("option");
            opt.value = servico;
            opt.textContent = servico;
            servicoSelect.appendChild(opt);
        });
        servicoSelect.disabled = false;
    } else {
        servicoSelect.disabled = true;
    }
});