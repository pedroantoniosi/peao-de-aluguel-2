
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.btn-user');
    const cards = document.querySelectorAll('#steps-container .card');

    const showCards = (type) => {
        cards.forEach((card, index) => {
            if (type === 'profissional') {
                card.style.display = index < 4 ? 'flex' : 'none';
            } else {
                card.style.display = index >= 4 ? 'flex' : 'none';
            }
        });
    };

    // Inicializa com cards do tipo "profissional"
    showCards('profissional');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Alterna classe active
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Alterna os cards
            const type = button.getAttribute('data-type');
            showCards(type);
        });
    });
});



console.log('teste')