// Инициализация AOS
AOS.init({
    duration: 600,
    once: true,
    offset: 50,
    easing: 'ease-out'
});

// Инициализация particles.js только на десктопах
if (window.innerWidth > 768) {
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#6c63ff" },
            shape: { type: "circle" },
            opacity: {
                value: 0.5,
                random: false,
                anim: { enable: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#6c63ff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

const initTextAnimation = () => {
    const phrases = [
        "SQL Developer",
        "Data Analyst",
        "Python Developer",
    ];

    const textElement = document.querySelector('.typing-text');
    let currentPhraseIndex = 0;

    // Сразу устанавливаем первую фразу без задержки
    textElement.textContent = phrases[2];
    textElement.style.opacity = '1';

    const updateText = () => {
        textElement.style.opacity = '0';
        setTimeout(() => {
            textElement.textContent = phrases[currentPhraseIndex];
            textElement.style.opacity = '1';
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        }, 500);
    };

    setTimeout(() => {
        setInterval(updateText, 2800);
    });
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

// Функцию для отслеживания направления прокрутки
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';

    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // Элемент входит в область видимости
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.classList.add('animate');

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