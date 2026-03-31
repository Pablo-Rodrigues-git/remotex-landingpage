// Reveal Elements on Scroll
const reveals = document.querySelectorAll('.reveal');

function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);
checkReveal();

// Form Submission Feedback
const leadForm = document.getElementById('leadForm');

if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
        const btn = leadForm.querySelector('.form-submit-btn');
        btn.textContent = 'ENVIANDO...';
        btn.style.opacity = '0.7';
        btn.style.pointerEvents = 'none';
    });
}
