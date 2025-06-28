
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


const plansSlider = document.getElementById('plans-slider');
if (plansSlider) {
    function updateSlidesPerView() {
        if (window.innerWidth < 768) {
            plansSlider.setAttribute('slides-per-view', '1');
        } else {
            plansSlider.setAttribute('slides-per-view', '2');
        }
    }
    window.addEventListener('resize', updateSlidesPerView);
    updateSlidesPerView();
}


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
    if (window.scrollY >= 10) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
});




const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const switchToLogin = () => {
    loginForm.classList.remove("hidden");
    loginForm.setAttribute("aria-hidden", "false");
    registerForm.classList.add("hidden");
    registerForm.setAttribute("aria-hidden", "true");

    toggleInputs(registerForm, true);
    toggleInputs(loginForm, false);

    btnLogin.classList.add("active");
    btnRegister.classList.remove("active");
};

const switchToRegister = () => {
    loginForm.classList.add("hidden");
    loginForm.setAttribute("aria-hidden", "true");
    registerForm.classList.remove("hidden");
    registerForm.setAttribute("aria-hidden", "false");

    toggleInputs(loginForm, true);
    toggleInputs(registerForm, false);

    btnRegister.classList.add("active");
    btnLogin.classList.remove("active");
};

const toggleInputs = (form, disabled) => {
    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => input.disabled = disabled);
};

btnLogin.addEventListener("click", switchToLogin);
btnRegister.addEventListener("click", switchToRegister);
