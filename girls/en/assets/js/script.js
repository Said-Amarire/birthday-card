/* ==================== 1. Core Functions ==================== */

/**
 * Checks if an element is within the viewport.
 * @param {HTMLElement} el The element to check.
 * @param {number} [threshold=0.2] The threshold for visibility (0.0 to 1.0).
 * @returns {boolean} True if the element is in the viewport, false otherwise.
 */
function isElementInViewport(el, threshold = 0.2) {
    const rect = el.getBoundingClientRect();
    const viewportHeight = (window.innerHeight || document.documentElement.clientHeight);
    const triggerPoint = viewportHeight * (1 - threshold);
    
    // An element is considered in the viewport if its top is above the trigger point
    // or if any part of it is visible on the screen.
    return rect.top <= triggerPoint && rect.bottom >= 0;
}

/**
 * Handles the "reveal" effect on scroll for elements with specific classes.
 */
function revealOnScroll() {
    const elementsToReveal = document.querySelectorAll('.reveal, .tile, .polaroid, .moment');
    elementsToReveal.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('shown', 'revealed');
        }
    });
}

/**
 * Generates and animates confetti falling across the screen.
 */
function generateConfetti() {
    const colors = ['#f06292', '#ffcdd2', '#ffb3d1', '#e1bee7', '#fff8e1'];
    const numConfetti = 150;

    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        const size = Math.random() * 8 + 4;
        const x = Math.random() * 100;
        const rotation = Math.random() * 360;
        const duration = Math.random() * 2.5 + 2;

        confetti.style.cssText = `
            background-color: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${x}vw;
            width: ${size}px;
            height: ${size}px;
            transform: rotate(${rotation}deg);
            --duration: ${duration}s;
        `;
        
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), duration * 1000);
    }
}

/**
 * Generates and animates balloons floating up the screen.
 */
function generateBalloons() {
    const colors = ['#f06292', '#ffcdd2', '#ffb3d1', '#e1bee7', '#fff8e1'];
    const numBalloons = 10;

    for (let i = 0; i < numBalloons; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.cssText = `
            --balloon-color: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            --duration: ${Math.random() * 5 + 8}s;
        `;
        document.body.appendChild(balloon);
        setTimeout(() => balloon.remove(), 15000);
    }
}

/**
 * Toggles the music player and updates the button's icon and state.
 */
function handleMusicPlayer() {
    const audio = document.getElementById('audio');
    const musicBtn = document.getElementById('musicBtn');
    if (!audio || !musicBtn) return;

    const icon = musicBtn.querySelector('i');
    let isPlaying = false;
    audio.volume = 0.5;

    function toggleMusic() {
        if (isPlaying) {
            audio.pause();
            icon.classList.replace('fa-pause', 'fa-play');
            musicBtn.classList.remove('playing');
        } else {
            audio.play();
            icon.classList.replace('fa-play', 'fa-pause');
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    }

    musicBtn.addEventListener('click', toggleMusic);
}

/**
 * Adds a subtle parallax effect to the main card on mouse movement.
 */
function handleCardParallax() {
    const mainCard = document.getElementById('mainCard');
    if (!mainCard) return;

    const sensitivity = 0.05;

    mainCard.addEventListener('mousemove', (e) => {
        const rect = mainCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const xRot = y * sensitivity;
        const yRot = -x * sensitivity;
        mainCard.style.setProperty('--x-rot', `${xRot}deg`);
        mainCard.style.setProperty('--y-rot', `${yRot}deg`);
    });

    mainCard.addEventListener('mouseleave', () => {
        mainCard.style.setProperty('--x-rot', `0deg`);
        mainCard.style.setProperty('--y-rot', `0deg`);
    });
}

/**
 * Toggles the visibility of image captions on click for gallery tiles.
 */
function handleImageCaptions() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            tile.classList.toggle('tapped');
        });
    });
}

/**
 * Handles copying the current page URL to the clipboard.
 */
function handleShare() {
    const shareBtn = document.getElementById('shareBtn');
    if (!shareBtn) return;

    shareBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            alert('تم نسخ الرابط! يمكنك الآن مشاركة البطاقة ❤️');
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('فشل نسخ الرابط. يرجى المحاولة يدوياً.');
        }
    });
}

/**
 * Spawns a heart element that floats up the screen.
 */
function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'heart';
    const x = Math.random() * window.innerWidth;
    const size = 14 + Math.random() * 10;
    const duration = 5 + Math.random() * 4;

    h.style.cssText = `
        left: ${x}px;
        bottom: -20px;
        width: ${size}px;
        height: ${size}px;
        background: ${Math.random() > .5 ? '#ff94c2' : '#ffb3d1'};
        --dur: ${duration}s;
    `;
    
    document.body.appendChild(h);
    setTimeout(() => h.remove(), duration * 1000);
}

/* ==================== 2. Event Listeners & Initializers ==================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initial reveal of elements on page load
    revealOnScroll();

    // Event listener for scroll to reveal elements
    window.addEventListener('scroll', revealOnScroll);

    // Attach event listeners to buttons and features
    document.getElementById('confettiBtn')?.addEventListener('click', generateConfetti);
    document.getElementById('balloonBtn')?.addEventListener('click', generateBalloons);

    // Initialize other page features
    handleMusicPlayer();
    handleCardParallax();
    handleImageCaptions();
    handleShare();
    
    // Start the hearts animation
    setInterval(() => requestAnimationFrame(spawnHeart), 1100);
});