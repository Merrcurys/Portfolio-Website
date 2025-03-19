// Инициализация AOS
AOS.init({
    duration: 1000,
    once: true
});

// Настройка particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#6C63FF'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00D4FF',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Заменяем старую функцию typeText на более плавную анимацию
const initTextAnimation = () => {
    const phrases = [
        "SQL Developer",
        "Python Developer",
        "Data Analyst",
    ];

    const textElement = document.querySelector('.typing-text');
    let currentPhraseIndex = 0;

    const updateText = () => {
        textElement.style.opacity = '0';
        setTimeout(() => {
            textElement.textContent = phrases[currentPhraseIndex];
            textElement.style.opacity = '1';
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        }, 500);
    };

    updateText();
    setInterval(updateText, 3000);
};

// Анимация прогресс-баров навыков
const animateSkills = () => {
    const skills = document.querySelectorAll('.skill-progress');
    skills.forEach(skill => {
        const target = skill.getAttribute('data-progress');
        let width = 0;
        const interval = setInterval(() => {
            if (width >= target) {
                clearInterval(interval);
            } else {
                width++;
                skill.style.width = width + '%';
            }
        }, 10);
    });
};

// Обновляем инициализацию
document.addEventListener('DOMContentLoaded', () => {
    initTextAnimation();
    animateSkills();
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Добавляем новую функцию для отслеживания направления прокрутки
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';

    // Находим все элементы, которые нужно анимировать
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // Элемент входит в область видимости
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.classList.add('animate');

            // Добавляем специальные классы в зависимости от направления прокрутки
            if (scrollDirection === 'up') {
                element.classList.add('scroll-up');
            } else {
                element.classList.add('scroll-down');
            }
        } else {
            element.classList.remove('animate', 'scroll-up', 'scroll-down');
        }
    });

    lastScrollTop = scrollTop;
});

// Функции для работы с модальным окном сертификата
function showCertificate(imagePath) {
    const modal = document.querySelector('.certificate-modal');
    const modalImg = modal.querySelector('img');
    modalImg.src = imagePath;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertificate() {
    const modal = document.querySelector('.certificate-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Закрытие модального окна при нажатии Escape
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeCertificate();
    }
});

// Предотвращение закрытия при клике на изображение
document.querySelector('.certificate-modal img').addEventListener('click', function (event) {
    event.stopPropagation();
}); 