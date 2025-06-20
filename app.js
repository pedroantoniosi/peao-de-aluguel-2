
const stepsContainer = document.getElementById('steps-container');
const buttons = document.querySelectorAll('.btn-user');

const steps = {
    profissional: [
        {
            icon: 'bi bi-person-badge',
            text: 'Crie seu perfil profissional completo',
        },
        {
            icon: 'bi bi-search',
            text: 'Seja encontrado por contratantes na sua região',
        },
        {
            icon: 'bi bi-chat-dots',
            text: 'Negocie os detalhes diretamente com o contratante',
        },
        {
            icon: 'bi bi-star-fill',
            text: 'Ganhe avaliações e destaque-se na plataforma',
        },
    ],
    contratante: [
        {
            icon: 'bi bi-search',
            text: 'Busque profissionais qualificados para o seu serviço',
        },
        {
            icon: 'bi bi-person-check',
            text: 'Veja avaliações e escolha com segurança',
        },
        {
            icon: 'bi bi-chat-dots',
            text: 'Entre em contato direto com o profissional',
        },
        {
            icon: 'bi bi-check-circle',
            text: 'Contrate e avalie após a conclusão do serviço',
        },
    ]
};

function renderSteps(type) {
    stepsContainer.innerHTML = '';
    steps[type].forEach(step => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
    <span class="ico"><i class="${step.icon}"></i></span>
    <h3 class="card-title">${step.text}</h3>
    `;
        stepsContainer.appendChild(card);
    });
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const type = btn.dataset.type;
        renderSteps(type);
    });
});

// Renderiza por padrão os passos para 'profissional'
renderSteps('profissional');




document.addEventListener("DOMContentLoaded", function () {
    const toggleButtons = document.querySelectorAll(".plan-toggle");
    const planGroups = document.querySelectorAll(".plans-group");

    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const type = button.dataset.type;

            planGroups.forEach(group => {
                if (group.dataset.group === type) {
                    group.style.display = "block";
                } else {
                    group.style.display = "none";
                }
            });

            // Atualiza aparência dos botões
            toggleButtons.forEach(btn => btn.classList.remove("btn-square"));
            button.classList.add("btn-square");
        });
    });
});



function updateSlidesPerView() {
    const swiperContainer = document.querySelector('.mySwiper.slider-container');
    if (!swiperContainer) return;
    if (window.innerWidth > 768) {
        swiperContainer.setAttribute('slides-per-view', '2');
    } else {
        swiperContainer.setAttribute('slides-per-view', '1');
    }
}

window.addEventListener('resize', updateSlidesPerView);
document.addEventListener('DOMContentLoaded', updateSlidesPerView);


document.addEventListener('click', function (e) {
    const card = e.target.closest('.card');
    if (!card) return;
    // Remove .active de todos os .card
    document.querySelectorAll('.card.active').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
});



const toggle = document.getElementById('toggle');
const navbar = document.querySelector('.navbar');

if (toggle && navbar) {
    toggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
}


window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-container');
    if (!header) return;
    if (window.scrollY >= 200) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
});