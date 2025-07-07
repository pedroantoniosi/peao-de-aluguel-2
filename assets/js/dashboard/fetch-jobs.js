// URL of the JS file containing the jobs data
const url = 'https://raw.githubusercontent.com/pedroantoniosi/peao-de-aluguel-2/main/assets/js/dashboard/api/jobs.js';

fetch(url)
    .then(res => res.text())
    .then(jsCode => {
        // Use Function constructor to evaluate the code and return the `jobs` variable
        const jobs = (new Function(jsCode + '; return jobs;'))();

        // Reference to the list container
        const jobList = document.getElementById('job-list');

        // Render each job into the list
        jobs.forEach(job => {
            const li = document.createElement('li');
            li.innerHTML = `
          <strong>${job.nome}</strong><br>
          ${job.profissao}<br>
          ${job.endereco}<br>
          <em>${job.preco} por ${job.tipoPreco}</em>
        `;
            jobList.appendChild(li);
        });
    })
    .catch(err => {
        console.error('Erro ao carregar os dados:', err);
    });