document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.notification-container');
    const allowBtn = document.querySelector('.btn-allow');
    const denyBtn = document.querySelector('.btn-deny');

    // Mostrar o card apenas se o usuário ainda não respondeu
    if (!localStorage.getItem('notificationPromptShown')) {
        container.style.display = 'flex';
    } else {
        container.style.display = 'none';
    }

    allowBtn?.addEventListener('click', () => {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    // Mostra notificação real
                    new Notification('Notificações ativadas!', {
                        body: 'Você receberá atualizações do site.',
                        icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827370.png' // opcional
                    });

                    alert('Notificações ativadas!');
                } else {
                    alert('Permissão negada ou não concedida.');
                }
            });
        } else {
            alert('Este navegador não suporta notificações.');
        }

        container.style.display = 'none';
        localStorage.setItem('notificationPromptShown', 'true');
    });

    denyBtn?.addEventListener('click', () => {
        container.style.display = 'none';
        localStorage.setItem('notificationPromptShown', 'true');
    });
});
