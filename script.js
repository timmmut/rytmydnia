// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Получаем все навигационные ссылки
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Добавляем обработчики событий для навигационных ссылок
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Получаем текст ссылки для определения действия
            const linkText = this.textContent;
            
            // Временные заглушки для навигационных кнопок
            switch(linkText) {
                case 'Kontakt':
                    alert('Strona kontaktowa będzie wkrótce dostępna!');
                    break;
                case 'O stronie':
                    alert('Informacje o stronie będą wkrótce dostępne!');
                    break;
                case 'Blog':
                    alert('Blog będzie wkrótce dostępny!');
                    break;
                default:
                    alert('Strona w budowie!');
            }
        });
    });
    
    // Простая анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за главным изображением
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        mainImage.style.opacity = '0';
        mainImage.style.transform = 'translateY(30px)';
        mainImage.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(mainImage);
    }

    // Carousel functionality
    class Carousel {
        constructor() {
            this.currentSlide = 0;
            this.slides = document.querySelectorAll('.carousel-slide');
            this.totalSlides = this.slides.length;
            this.track = document.querySelector('.carousel-track');
            this.indicators = document.querySelectorAll('.indicator');
            this.prevBtn = document.getElementById('prevBtn');
            this.nextBtn = document.getElementById('nextBtn');
            
            if (this.slides.length > 0) {
                this.init();
            }
        }
        
        init() {
            this.updateCarousel();
            this.bindEvents();
        }
        
        bindEvents() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.nextSlide());
            }
            
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToSlide(index));
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            });
            
            // Touch support for mobile
            let startX = 0;
            let endX = 0;
            
            if (this.track) {
                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });
                
                this.track.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    const difference = startX - endX;
                    
                    if (Math.abs(difference) > 50) {
                        if (difference > 0) {
                            this.nextSlide();
                        } else {
                            this.prevSlide();
                        }
                    }
                });
            }
        }
        
        updateCarousel() {
            // Просто обновляем активные классы - позиционирование теперь через CSS
            this.slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === this.currentSlide);
            });
            
            // Update indicators
            this.indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentSlide);
            });
        }
        
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
            this.updateCarousel();
        }
        
        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
            this.updateCarousel();
        }
        
        goToSlide(index) {
            this.currentSlide = index;
            this.updateCarousel();
        }

    }

    // Initialize carousel
    new Carousel();

    // Lopez News Modal functionality
    const lopezNewsImage = document.getElementById('lopezNewsImage');
    const lopezNewsModal = document.getElementById('lopezNewsModal');
    const lopezModalClose = document.getElementById('lopezModalClose');

    if (lopezNewsImage && lopezNewsModal) {
        lopezNewsImage.addEventListener('click', function() {
            lopezNewsModal.style.display = 'block';
        });
    }

    if (lopezModalClose) {
        lopezModalClose.addEventListener('click', function() {
            lopezNewsModal.style.display = 'none';
        });
    }

    // Lopez Info Modal functionality
    const infoLopezImage = document.getElementById('infoLopezImage');
    const lopezInfoModal = document.getElementById('lopezInfoModal');
    const lopezInfoModalClose = document.getElementById('lopezInfoModalClose');
    const clickableTexts = document.querySelectorAll('.clickable-text');

    if (infoLopezImage && lopezInfoModal) {
        infoLopezImage.addEventListener('click', function() {
            lopezInfoModal.style.display = 'block';
        });
    }

    // Add click functionality to GŁÓWKA words
    clickableTexts.forEach(function(text) {
        text.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    if (lopezInfoModalClose) {
        lopezInfoModalClose.addEventListener('click', function() {
            lopezInfoModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === lopezNewsModal) {
            lopezNewsModal.style.display = 'none';
        }
        if (event.target === lopezInfoModal) {
            lopezInfoModal.style.display = 'none';
        }
    });

    // Получаем элементы блоков и модальных окон
    const block1Image = document.getElementById('block1Image');
    const block2Image = document.getElementById('block2Image');
    const block3Image = document.getElementById('block3Image');
    
    const block1Modal = document.getElementById('block1Modal');
    const block2Modal = document.getElementById('block2Modal');
    const block3Modal = document.getElementById('block3Modal');
    
    const block1ModalClose = document.getElementById('block1ModalClose');
    const block2ModalClose = document.getElementById('block2ModalClose');
    const block3ModalClose = document.getElementById('block3ModalClose');
    
    // Добавляем обработчики событий для открытия модальных окон
    if (block1Image && block1Modal) {
        block1Image.addEventListener('click', function() {
            block1Modal.style.display = 'block';
        });
    }
    
    if (block2Image && block2Modal) {
        block2Image.addEventListener('click', function() {
            block2Modal.style.display = 'block';
        });
    }
    
    if (block3Image && block3Modal) {
        block3Image.addEventListener('click', function() {
            block3Modal.style.display = 'block';
        });
    }
    
    // Добавляем обработчики событий для закрытия модальных окон
    if (block1ModalClose) {
        block1ModalClose.addEventListener('click', function() {
            block1Modal.style.display = 'none';
        });
    }
    
    if (block2ModalClose) {
        block2ModalClose.addEventListener('click', function() {
            block2Modal.style.display = 'none';
        });
    }
    
    if (block3ModalClose) {
        block3ModalClose.addEventListener('click', function() {
            block3Modal.style.display = 'none';
        });
    }
    
    // Закрытие модальных окон при клике вне их содержимого
    window.addEventListener('click', function(event) {
        if (event.target === block1Modal) {
            block1Modal.style.display = 'none';
        }
        if (event.target === block2Modal) {
            block2Modal.style.display = 'none';
        }
        if (event.target === block3Modal) {
            block3Modal.style.display = 'none';
        }
    });
});

// Функция для плавного скролла
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
        behavior: 'smooth'
    });
    }
} 