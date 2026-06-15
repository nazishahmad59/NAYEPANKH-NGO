const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('top-2');
            navbar.classList.remove('top-[32px]');
        } else {
            navbar.classList.add('top-[32px]');
            navbar.classList.remove('top-2');
        }
    });
}

const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

document.querySelectorAll('.counter').forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/,/g, '');
        const inc = target / 40;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc).toLocaleString('en-IN');
            setTimeout(updateCount, 40);
        } else {
            counter.innerText = target.toLocaleString('en-IN');
        }
    };

    const statObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            updateCount();
            statObserver.disconnect();
        }
    });
    statObserver.observe(counter);
});

const sliderTrack = document.getElementById('slider-track');
const prevBtn = document.getElementById('slider-prev');
const nextBtn = document.getElementById('slider-next');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
// Make sure dots exist before checking length
const totalSlides = dots ? dots.length : 0; 
let autoPlayInterval;

function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
        if(index === currentSlide) {
            dot.classList.remove('bg-slate-700');
            dot.classList.add('bg-[#ff7300]', 'shadow-[0_0_10px_rgba(255,115,0,0.5)]');
        } else {
            dot.classList.remove('bg-[#ff7300]', 'shadow-[0_0_10px_rgba(255,115,0,0.5)]');
            dot.classList.add('bg-slate-700');
        }
    });
}

function nextSlide() {
    if (totalSlides === 0) return;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000); 
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

if(nextBtn && prevBtn && sliderTrack && totalSlides > 0) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
        resetAutoPlay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
            resetAutoPlay();
        });
    });

    startAutoPlay();
}