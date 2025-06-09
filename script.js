// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Инициализация компонентов
    initNewsTicker();
    initNavigationArrows();
    initCarousel();
    initModals();
    initNavLinks();
    
    // === NEWS TICKER ===
    function initNewsTicker() {
        const tickerContent = document.getElementById('tickerContent');
        if (!tickerContent) return;
        
        const newsItems = [
            "Beyoncé bez wysiłku radzi sobie z nieszczęściem w szafie podczas swojego pokazu Cowboy Carter London",
            "Sabrina Carpenter Summer 2.0 Rozpoczyna Się Nowym Singlem \"Manchild\": Streamuj Teraz",
            "Ed Sheeran mówi po Pendżabsku w nowej piosence \"Sapphire,\" jego \"ulubiony\" utwór na nadchodzącym albumie \"Play\""
        ];
        
        let currentIndex = 0;
        
        function switchNews() {
            // Change to next news
            currentIndex = (currentIndex + 1) % newsItems.length;
            tickerContent.textContent = newsItems[currentIndex];
        }
        
        // Determine animation duration based on screen size
        function getAnimationDuration() {
            const width = window.innerWidth;
            if (width <= 360) return 8000;
            if (width <= 480) return 10000;
            if (width <= 768) return 12000;
            return 15000;
        }
        
        // Switch news based on animation duration
        setInterval(switchNews, getAnimationDuration());
        
        // Update interval on window resize
        let newsInterval = setInterval(switchNews, getAnimationDuration());
        window.addEventListener('resize', () => {
            clearInterval(newsInterval);
            newsInterval = setInterval(switchNews, getAnimationDuration());
        });
    }
    
    // === НАВИГАЦИОННЫЕ СТРЕЛКИ ===
    function initNavigationArrows() {
        const navArrows = document.querySelectorAll('.nav-arrow');
        const sections = document.querySelectorAll('section, footer');
        
        // Smooth scroll для навигационных стрелок
        navArrows.forEach(arrow => {
            arrow.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Активация стрелок при скролле
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-10% 0px -10% 0px'
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionId = entry.target.id;
                const correspondingArrow = document.querySelector(`[data-section="${sectionId}"]`);
                
                if (correspondingArrow) {
                    if (entry.isIntersecting) {
                        correspondingArrow.classList.add('active');
                    } else {
                        correspondingArrow.classList.remove('active');
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            if (section.id) {
                sectionObserver.observe(section);
            }
        });
    }
    
    // === FLICKITY КАРУСЕЛЬ ===
    function initCarousel() {
        const mainGallery = document.querySelector('.gallery-main');
        if (mainGallery) {
            new Flickity(mainGallery, {
                wrapAround: true,
                cellAlign: 'center',
                pageDots: true,
                prevNextButtons: true,
                contain: false,
                groupCells: false,
                freeScroll: false,
                percentPosition: false
            });
            console.log('Главная карусель инициализирована');
            
            // Добавляем обработчики кликов для всех фото в карусели
            const carouselCells = mainGallery.querySelectorAll('.gallery-cell');
            
            // Первое фото
            if (carouselCells.length >= 1) {
                const firstCell = carouselCells[0];
                firstCell.addEventListener('click', function() {
                    const modal = document.getElementById('carousel1Modal');
                    if (modal) {
                        modal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    }
                });
                firstCell.style.cursor = 'pointer';
                
                const firstImage = firstCell.querySelector('.carousel-image');
                if (firstImage) {
                    firstImage.style.cursor = 'pointer';
                }
            }
            
            // Второе фото (с видео)
            if (carouselCells.length >= 2) {
                const secondCell = carouselCells[1];
                secondCell.addEventListener('click', function() {
                    const videoModal = document.getElementById('carouselVideoModal');
                    if (videoModal) {
                        videoModal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    }
                });
                secondCell.style.cursor = 'pointer';
                
                const secondImage = secondCell.querySelector('.carousel-image');
                if (secondImage) {
                    secondImage.style.cursor = 'pointer';
                }
            }
            
            // Третье фото
            if (carouselCells.length >= 3) {
                const thirdCell = carouselCells[2];
                thirdCell.addEventListener('click', function() {
                    const modal = document.getElementById('carousel3Modal');
                    if (modal) {
                        modal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    }
                });
                thirdCell.style.cursor = 'pointer';
                
                const thirdImage = thirdCell.querySelector('.carousel-image');
                if (thirdImage) {
                    thirdImage.style.cursor = 'pointer';
                }
            }
        }
    }
    
    // === МОДАЛЬНЫЕ ОКНА ===
    function initModals() {
        const modals = document.querySelectorAll('.modal');
        const modalTriggers = document.querySelectorAll('[id$="Image"], #image22-clickable');
        const closeButtons = document.querySelectorAll('.close');
        
        // Открытие модальных окон
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const triggerId = this.id;
                let modalId = '';
                
                // Определяем соответствующее модальное окно
                if (triggerId.includes('block1')) {
                    modalId = 'block1Modal';
                } else if (triggerId.includes('block2')) {
                    modalId = 'block2Modal';
                } else if (triggerId.includes('block3')) {
                    modalId = 'block3Modal';
                } else if (triggerId === 'image22-clickable') {
                    modalId = 'image22Modal';
                }
                
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Закрытие модальных окон
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Останавливаем видео при закрытии модального окна
                const video = modal.querySelector('video');
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
        });
        
        // Закрытие по клику вне модального окна
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    
                    // Останавливаем видео при закрытии модального окна
                    const video = this.querySelector('video');
                    if (video) {
                        video.pause();
                        video.currentTime = 0;
                    }
                }
            });
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal[style*="block"]');
                if (openModal) {
                    openModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    
                    // Останавливаем видео при закрытии модального окна
                    const video = openModal.querySelector('video');
                    if (video) {
                        video.pause();
                        video.currentTime = 0;
                    }
                }
            }
        });
    }
    
    // === НАВИГАЦИОННЫЕ ССЫЛКИ В HEADER ===
    function initNavLinks() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const linkText = this.textContent;
                
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
    }

    // === ДОПОЛНИТЕЛЬНАЯ ЛОГИКА МОДАЛЬНЫХ ОКОН ===
    // Modal logic for photo blocks
    const block1Image = document.getElementById('block1Image');
    const block1Modal = document.getElementById('block1Modal');
    const block1ModalClose = document.getElementById('block1ModalClose');
    
    const block2Image = document.getElementById('block2Image');
    const block2Modal = document.getElementById('block2Modal');
    const block2ModalClose = document.getElementById('block2ModalClose');
    
    const block3Image = document.getElementById('block3Image');
    const block3Modal = document.getElementById('block3Modal');
    const block3ModalClose = document.getElementById('block3ModalClose');
    
    if (block1Image && block1Modal && block1ModalClose) {
        block1Image.addEventListener('click', () => {
            block1Modal.style.display = 'block';
        });

        block1ModalClose.addEventListener('click', () => {
            block1Modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === block1Modal) {
                block1Modal.style.display = 'none';
            }
        });
    }

    if (block2Image && block2Modal && block2ModalClose) {
        block2Image.addEventListener('click', () => {
            block2Modal.style.display = 'block';
        });

        block2ModalClose.addEventListener('click', () => {
            block2Modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === block2Modal) {
                block2Modal.style.display = 'none';
            }
        });
    }

    if (block3Image && block3Modal && block3ModalClose) {
        block3Image.addEventListener('click', () => {
            block3Modal.style.display = 'block';
        });

        block3ModalClose.addEventListener('click', () => {
            block3Modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === block3Modal) {
                block3Modal.style.display = 'none';
            }
        });
    }
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