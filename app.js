document.getElementById('btn-toggle').onclick = () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
}

document.getElementById('btn-close-navbar').onclick = () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.remove('active')
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-container');
    if (window.scrollY >= 50) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
});



