// Cursor Glow Effect
const glow = document.getElementById('glow');

document.addEventListener('mousemove', (e) => {
    // We use requestAnimationFrame for optimal performance
    requestAnimationFrame(() => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
});

// Reveal Elements on Scroll
const reveals = document.querySelectorAll('.reveal');

function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120; // When to reveal the element

    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
}

// Listen to scroll events
window.addEventListener('scroll', checkReveal);
// Trigger once on load to show elements already in view
checkReveal();
