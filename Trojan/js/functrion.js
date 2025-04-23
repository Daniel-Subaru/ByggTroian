document.addEventListener('DOMContentLoaded', function() {
    // Плавна прокрутка для навігації
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Фільтрація проектів
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Видалити активний клас з усіх кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Додати активний клас до поточної кнопки
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Анімація при скролі
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.about-content, .project-card, .contact-info');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    //початкові стилі для анімації
    document.querySelectorAll('.about-content, .project-card, .contact-info').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Викликати один раз при завантаженні сторінки
    animateOnScroll();



// Слайдер "до/після"
const slider = document.querySelector('.before-after-slider');
const before = slider.querySelector('.before');
const after = slider.querySelector('.after');
const handle = slider.querySelector('.slider-handle');
const button = slider.querySelector('.slider-button');

let isDragging = false;

function moveSlider(clientX) {
    const sliderRect = slider.getBoundingClientRect();
    let position = clientX - sliderRect.left;
    position = Math.max(0, Math.min(position, sliderRect.width));
    const percent = (position / sliderRect.width) * 100;
    
    after.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;
    button.style.left = `${percent}%`;
}

// Запобігання виділенню тексту при перетягуванні
function preventSelection(e) {
    e.preventDefault();
}

// Миша
button.addEventListener('mousedown', (e) => {
    isDragging = true;
    document.addEventListener('selectstart', preventSelection); // Блокуємо виділення
    button.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    document.removeEventListener('selectstart', preventSelection);
    button.style.cursor = 'ew-resize';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    moveSlider(e.clientX);
});

// Сенсорні екрани
button.addEventListener('touchstart', (e) => {
    isDragging = true;
    e.preventDefault(); // Запобігаємо скролу сторінки
    button.style.cursor = 'grabbing';
});

document.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    button.style.cursor = 'ew-resize';
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Запобігаємо скролу
    moveSlider(e.touches[0].clientX);
});

});