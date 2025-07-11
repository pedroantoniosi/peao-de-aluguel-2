const btnToggle = document.getElementById('btn-toggle');
const btnClose = document.getElementById('btn-close-navbar');
const navbar = document.getElementById('navbar');

btnToggle.onclick = () => {
    navbar.classList.toggle('active');
    document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
}

btnClose.onclick = () => {
    navbar.classList.remove('active');
    document.body.style.overflow = '';
}


window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-container');
    if (window.scrollY >= 50) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
});



