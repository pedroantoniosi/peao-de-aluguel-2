function renderizarJobs(jobs) {
    const jobList = document.getElementById('job-list');
    let jobHtml = '';

    jobs.forEach(job => {
        const servicesHtml = job.services
            .map(service => `<p class="job-service" data-service="${service}">${service}</p>`)
            .join('');

        jobHtml += `
            <div class="job-item col gap-05">
                <h2 class="job-category">${job.category}</h2>
                <div class="caption row gap-1 flex-wrap">
                    ${servicesHtml}
                </div>
            </div>
        `;
    });

    jobList.innerHTML = jobHtml;

    // Após renderizar, adiciona os eventos de clique
    adicionarEventosServicos();
}

function adicionarEventosServicos() {
    const serviceItems = document.querySelectorAll('.job-service');
    const activeFilters = document.getElementById('active-filters');

    serviceItems.forEach(item => {
        item.addEventListener('click', () => {
            const service = item.dataset.service;

            // Verifica se já existe esse filtro
            const jaExiste = [...activeFilters.querySelectorAll('.filter p')]
                .some(p => p.textContent === service);

            if (jaExiste) return;

            const filter = document.createElement('div');
            filter.className = 'filter row gap-1';
            filter.innerHTML = `
                <p>${service}</p>
                <div class="remove-filter"><i class="bi bi-x"></i></div>
            `;

            // Adiciona evento para remover filtro
            filter.querySelector('.remove-filter').addEventListener('click', () => {
                filter.remove();
            });

            activeFilters.appendChild(filter);
        });
    });
}

async function carregarJobs() {
    try {
        const resposta = await fetch('https://raw.githubusercontent.com/pedroantoniosi/peao-de-aluguel-2/refs/heads/main/assets/js/api/jobs.json');

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText}`);
        }

        const dados = await resposta.json();
        renderizarJobs(dados);

    } catch (erro) {
        console.error('Erro ao carregar os jobs:', erro.message);
    }
}

carregarJobs();
