document.addEventListener('DOMContentLoaded', function () {
    // Функция расчета возраста
    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    }

    // Обновление возраста
    function updateAge() {
        const birthDate = '2006-06-04'; // 4 июня 2006
        const age = calculateAge(birthDate);

        // Обновляем основной счетчик возраста
        const ageCounter = document.getElementById('ageCounter');
        const ageDisplay = document.getElementById('ageDisplay');

        if (ageCounter) {
            ageCounter.textContent = age;
        }

        if (ageDisplay) {
            ageDisplay.textContent = age;
        }

        // Анимированное обновление лет в IT (с 1 октября 2021)
        const codingYears = document.getElementById('codingYears');
        if (codingYears) {
            const itStartDate = new Date('2020-10-01'); // 1 октября 2021
            const now = new Date();

            // Рассчитываем точное количество лет с дробями
            const diffTime = Math.abs(now - itStartDate);
            const msPerYear = 1000 * 60 * 60 * 24 * 365.25; // Миллисекунд в году
            const yearsInIT = diffTime / msPerYear;

            // Округляем до одного знака после запятой
            const displayYears = Math.round(yearsInIT * 10) / 10;

            animateDecimalNumber(codingYears, 0, displayYears, 4000);
        }
    }

    // Анимация десятичного числа
    function animateDecimalNumber(element, start, end, duration) {
        const startTime = performance.now();

        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = start + (end - start) * easeOutQuart;

            element.textContent = current.toFixed(1);

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }

        requestAnimationFrame(updateNumber);
    }

    // Projects section animation
    function initProjectsAnimation() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const projectsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const projectCards = entry.target.querySelectorAll('.project-card');

                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animationPlayState = 'running';
                        }, index * 200);
                    });
                }
            });
        }, observerOptions);

        const projectsSection = document.querySelector('.projects-grid');
        if (projectsSection) {
            projectsObserver.observe(projectsSection);
        }
    }

    // Initialize projects animation
    initProjectsAnimation();

    // Experience section animation
    function initExperienceAnimation() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const experienceObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const experienceItems = entry.target.querySelectorAll('.experience-item');

                    experienceItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.animationPlayState = 'running';
                        }, index * 300);
                    });
                }
            });
        }, observerOptions);

        const experienceSection = document.querySelector('.experience-timeline');
        if (experienceSection) {
            experienceObserver.observe(experienceSection);
        }
    }

    // Initialize experience animation
    initExperienceAnimation();

    // Education timeline animation
    function initEducationTimeline() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const timelineObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timeline = entry.target;
                    const bars = timeline.querySelectorAll('.education-bar');
                    const details = timeline.querySelectorAll('.education-detail-item');

                    // Animate bars
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.animationPlayState = 'running';
                        }, index * 200);
                    });

                    // Animate details
                    details.forEach((detail, index) => {
                        setTimeout(() => {
                            detail.style.animationPlayState = 'running';
                        }, 800 + index * 200);
                    });
                }
            });
        }, observerOptions);

        const educationSection = document.querySelector('.education-timeline');
        if (educationSection) {
            timelineObserver.observe(educationSection);
        }
    }

    // Initialize education timeline
    initEducationTimeline();

    // Запускаем обновление возраста
    updateAge();

    // Обновляем возраст каждый час (на случай если сайт открыт долго)
    setInterval(updateAge, 3600000); // 1 час
    // Анимация смены ролей
    const roleText = document.getElementById('roleText');
    const roles = ['Python Developer', 'SQL Developer', 'Android Developer', 'Data Analyst'];
    let currentRoleIndex = 0;
    let isTyping = false;

    function typeWriter(text, element, callback) {
        isTyping = true;
        element.innerHTML = '&nbsp;'; // Очищаем контейнер, но оставляем невидимый символ
        let i = 0;

        function type() {
            if (i === 0) {
                element.textContent = ''; // Очищаем перед началом печати
            }
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 80);
            } else {
                isTyping = false;
                if (callback) callback();
            }
        }

        type();
    }

    function eraseText(element, callback) {
        const text = element.textContent;
        let i = text.length;

        function erase() {
            if (i > 0) {
                element.textContent = text.substring(0, i - 1);
                i--;
                setTimeout(erase, 50);
            } else {
                // Добавляем невидимый символ для сохранения высоты
                element.innerHTML = '&nbsp;';
                if (callback) callback();
            }
        }

        erase();
    }

    function switchRole() {
        if (isTyping) return;

        eraseText(roleText, function () {
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            setTimeout(function () {
                typeWriter(roles[currentRoleIndex], roleText);
            }, 300);
        });
    }

    // Запуск анимации смены ролей каждые 3.5 секунды
    setInterval(switchRole, 3500);

    // Анимация навигации при скролле
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.7)';
            navbar.style.backdropFilter = 'blur(18px) saturate(140%)';
            navbar.style.webkitBackdropFilter = 'blur(18px) saturate(140%)';
            navbar.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            navbar.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.35)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.6)';
            navbar.style.backdropFilter = 'blur(15px) saturate(120%)';
            navbar.style.webkitBackdropFilter = 'blur(15px) saturate(120%)';
            navbar.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            navbar.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.3)';
        }

        // Скрытие/показ навигации при скролле
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });

    // Intersection Observer для анимации элементов
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Добавляем наблюдение за элементами
    const animatedElements = document.querySelectorAll('.section-header, .about-info, .stat-card');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(element);
    });





    // Плавная прокрутка для навигации
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Убираем активное состояние со всех ссылок
            navLinks.forEach(l => l.classList.remove('active'));
        });
    });

    // Параллакс эффект для фоновых элементов
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');

        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Добавление CSS стилей
    const style = document.createElement('style');
    style.textContent = `
        .navbar {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);

    // Инициализация всех анимаций
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Certificate Modal Functionality
    const modal = document.getElementById('certificateModal');
    const modalTitle = document.getElementById('modalTitle');
    const certificateImage = document.getElementById('certificateImage');
    const modalClose = document.querySelector('.modal-close');

    const certificates = {
        'python': {
            title: 'Сертификат Python',
            image: 'img/certificates/python-certificat.jpg'
        },
        'javascript': {
            title: 'Сертификат JavaScript',
            image: 'img/certificates/js-certificate.png'
        }
    };

    // Open modal when clicking on clickable tech cards
    const clickableTechCards = document.querySelectorAll('.tech-card-clickable');
    clickableTechCards.forEach(card => {
        card.addEventListener('click', function () {
            const certificateType = this.dataset.certificate;
            const certificate = certificates[certificateType];

            if (certificate) {
                modalTitle.textContent = certificate.title;
                certificateImage.src = certificate.image;
                certificateImage.alt = certificate.title;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal functionality
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Close modal when clicking the X button
    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Prevent modal content click from closing modal
    const modalContent = document.querySelector('.modal-content');
    modalContent.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});