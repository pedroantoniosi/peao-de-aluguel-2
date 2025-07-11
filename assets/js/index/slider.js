const swiperEl = document.getElementById('plans-slider');

let currentSlidesPerView = window.innerWidth <= 768 ? 1 : 2;
swiperEl.setAttribute('slides-per-view', currentSlidesPerView);

// Garante que o componente seja definido antes da inicialização
customElements.whenDefined('swiper-container').then(() => {
    swiperEl.initialize();

    // Função de atualização com reinicialização
    const update = () => {
        const newSlidesPerView = window.innerWidth <= 768 ? 1 : 2;
        if (newSlidesPerView !== currentSlidesPerView) {
            currentSlidesPerView = newSlidesPerView;

            // Atualiza atributo e reinicializa Swiper
            swiperEl.setAttribute('slides-per-view', newSlidesPerView);

            // Destroi e reinicia Swiper para aplicar nova config
            swiperEl.swiper.destroy(true, true);
            swiperEl.initialize();
        }
    };

    // Escuta redimensionamento da janela
    window.addEventListener('resize', update);
});
