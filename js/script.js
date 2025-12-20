document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.getElementById('carousel-track');
    const slides = carouselTrack.children;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    const autoplayIntervalTime = 4000; // 4 segundos

    // Función para obtener el ancho actual de un slide
    function getSlideWidth() {
        // Obtenemos el ancho calculado por el navegador en tiempo real
        return slides[0].clientWidth;
    }

    // --- Funciones del Carrusel ---

    function updateCarousel() {
        const slideWidth = getSlideWidth(); // Recalcula el ancho cada vez que se mueve
        carouselTrack.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        updateIndicators();
    }

    function updateIndicators() {
        indicators.forEach(indicator => {
            indicator.classList.remove('bg-white');
            indicator.classList.add('bg-white/50');
        });
        if (indicators[currentIndex]) {
            indicators[currentIndex].classList.remove('bg-white/50');
            indicators[currentIndex].classList.add('bg-white');
        }
    }

    // --- Navegación Manual (Botones) y Autoplay ---

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
        resetAutoplay();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
        resetAutoplay();
    }

    let autoplayTimer = setInterval(nextSlide, autoplayIntervalTime);

    function resetAutoplay() {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(nextSlide, autoplayIntervalTime);
    }

    // --- Event Listeners ---

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    indicators.forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            currentIndex = parseInt(e.target.getAttribute('data-index'));
            updateCarousel();
            resetAutoplay();
        });
    });

    // Evento clave para la responsividad: recalcular y reposicionar al cambiar tamaño de ventana
    window.addEventListener('resize', updateCarousel);
    
    // Inicialización
    updateCarousel(); 
});

// Manejo del menú responsive
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    // clase 'hidden' para mostrar u ocultar
    navMenu.classList.toggle('hidden');
});

// Opcional: Cerrar el menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.add('hidden');
        }
    });
});
