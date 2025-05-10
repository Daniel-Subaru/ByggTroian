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

    // Бургер-меню
    const burgerBtn = document.querySelector('.burger-btn');
    const mainNav = document.querySelector('.main-nav');

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : 'auto';
    });

    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Фільтрація проектів
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
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

    // Слайдер "до/після"
    document.querySelectorAll('.before-after-slider').forEach(slider => {
        const before = slider.querySelector('.before');
        const after = slider.querySelector('.after');
        const handle = slider.querySelector('.slider-handle');
        const button = slider.querySelector('.slider-button');

        let isDragging = false;
        let startX = 0;
        let startY = 0;

        function moveSlider(clientX) {
            const sliderRect = slider.getBoundingClientRect();
            let position = clientX - sliderRect.left;
            position = Math.max(0, Math.min(position, sliderRect.width));
            const percent = (position / sliderRect.width) * 100;
            after.style.width = `${percent}%`;
            handle.style.left = `${percent}%`;
            button.style.left = `${percent}%`;
        }

        function preventSelection(e) {
            e.preventDefault();
        }

        button.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            document.addEventListener('selectstart', preventSelection);
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

        button.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            button.style.cursor = 'grabbing';
        });

        button.addEventListener('touchmove', (e) => {
            if (!startX) return;
            const touch = e.touches[0];
            const diffX = Math.abs(touch.clientX - startX);
            const diffY = Math.abs(touch.clientY - startY);
            if (diffY > diffX) {
                isDragging = false;
                return;
            }
            isDragging = true;
            e.preventDefault();
            moveSlider(touch.clientX);
        }, { passive: false });

        document.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            button.style.cursor = 'ew-resize';
            startX = 0;
            startY = 0;
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

    document.querySelectorAll('.about-content, .project-card, .contact-info').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Кнопка до початку сторінки
    const toTopBtn = document.querySelector('.to-top-btn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            toTopBtn.classList.add('visible');
        } else {
            toTopBtn.classList.remove('visible');
        }
    });
    toTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Обробка форми
    //document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    //    e.preventDefault();
    //    const name = this.querySelector('#name').value;
    //    const email = this.querySelector('#email').value;
    //    const message = this.querySelector('#message').value;
    //    alert(`Tack, ${name}! Ditt meddelande har skickats.`);
    //    this.reset();
    //});

    // Анімація завантаження
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });


    // Модальне вікно для галереї
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modal = document.querySelector('.modal');
    const modalImg = modal?.querySelector('img');
    const closeBtn = modal?.querySelector('.modal-close');

    if (galleryItems && modal && modalImg && closeBtn) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                modalImg.src = item.src;
                modalImg.alt = item.alt;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
    
    //Стрілки для гортання фоток
    
    document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modal = document.querySelector('.modal');
    const modalImg = modal?.querySelector('img');
    const closeBtn = modal?.querySelector('.modal-close');
    const prevBtn = modal?.querySelector('.modal-prev');
    const nextBtn = modal?.querySelector('.modal-next');

    if (galleryItems && modal && modalImg && closeBtn && prevBtn && nextBtn) {
        let currentIndex = 0;

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                modalImg.src = item.src;
                modalImg.alt = item.alt;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            modalImg.src = galleryItems[currentIndex].src;
            modalImg.alt = galleryItems[currentIndex].alt;
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            modalImg.src = galleryItems[currentIndex].src;
            modalImg.alt = galleryItems[currentIndex].alt;
        });

        // Гортання стрілками клавіатури
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    prevBtn.click();
                } else if (e.key === 'ArrowRight') {
                    nextBtn.click();
                } else if (e.key === 'Escape') {
                    closeBtn.click();
                }
            }
        });
    }
});
    
});
