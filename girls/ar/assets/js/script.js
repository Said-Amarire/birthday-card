/* ==================== 1. Core Functions ==================== */

// Function to check if an element is in the viewport
/* function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
} */

// Function to check if an element is in the viewport (improved)
function isElementInViewport(el, threshold = 0.2) {
    const rect = el.getBoundingClientRect();
    const viewportHeight = (window.innerHeight || document.documentElement.clientHeight);
    
    // Calculate the trigger point
    const triggerPoint = viewportHeight * (1 - threshold);
    
    // Check if the element's top is visible or its bottom is above the trigger point
    return rect.top <= triggerPoint && rect.bottom >= 0;
}


// Function to handle the "reveal" effect on scroll
function revealOnScroll() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        if (isElementInViewport(reveals[i])) {
            reveals[i].classList.add('shown');
        }
    }
    var tiles = document.querySelectorAll('.tile, .polaroid, .moment');
    for (var i = 0; i < tiles.length; i++) {
        if (isElementInViewport(tiles[i])) {
            tiles[i].classList.add('revealed');
        }
    }
}



// Function to generate confetti
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

        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${x}vw`;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.transform = `rotate(${rotation}deg)`;
        confetti.style.setProperty('--duration', `${duration}s`);
        
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), duration * 1000);
    }
}

// Function to generate balloons
function generateBalloons() {
    const colors = ['#f06292', '#ffcdd2', '#ffb3d1', '#e1bee7', '#fff8e1'];
    const numBalloons = 10;
    for (let i = 0; i < numBalloons; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.setProperty('--balloon-color', colors[Math.floor(Math.random() * colors.length)]);
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.setProperty('--duration', `${Math.random() * 5 + 8}s`);
        document.body.appendChild(balloon);
        setTimeout(() => balloon.remove(), 15000);
    }
}

// Function to handle the music player
function handleMusicPlayer() {
    const audio = document.getElementById('audio');
    const musicBtn = document.getElementById('musicBtn');
    const icon = musicBtn.querySelector('i');
    let isPlaying = false;
    audio.volume = 0.5;

    function toggleMusic() {
        if (isPlaying) {
            audio.pause();
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            musicBtn.classList.remove('playing');
        } else {
            audio.play();
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    }

    musicBtn.addEventListener('click', toggleMusic);
}

// Function to add parallax effect to the main card
function handleCardParallax() {
    const mainCard = document.getElementById('mainCard');
    if (!mainCard) return;

    mainCard.addEventListener('mousemove', (e) => {
        const rect = mainCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const sensitivity = 0.05;
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

// Function to handle image captions on click
function handleImageCaptions() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            tile.classList.toggle('tapped');
        });
    });
}

// Function for copy to clipboard
function handleShare() {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const url = window.location.href;
            try {
                await navigator.clipboard.writeText(url);
                alert(' تم نسخ الرابط! يمكنك الآن مشاركة البطاقة❤️');
            } catch (err) {
                console.error('Failed to copy: ', err);
                alert('فشل نسخ الرابط. يرجى المحاولة يدوياً.');
            }
        });
    }
}

// 3. قلوب متحركة (Heart Emitter)
function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'heart';
    const x = Math.random() * window.innerWidth;
    const size = 14 + Math.random() * 10;
    h.style.left = x + 'px';
    h.style.bottom = '-20px'; // Start from below the screen
    h.style.width = size + 'px';
    h.style.height = size + 'px';
    h.style.background = Math.random() > .5 ? '#ff94c2' : '#ffb3d1'; // Use colors that match the theme
    h.style.setProperty('--dur', (5 + Math.random() * 4) + 's');
    document.body.appendChild(h);
    // Remove the heart after a certain duration to prevent memory leaks
    setTimeout(() => h.remove(), (5 + Math.random() * 4) * 1000);
}

/* ==================== 2. Event Listeners & Initializers ==================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initial reveal on page load
    revealOnScroll();

    // Event listener for scroll to reveal elements
    window.addEventListener('scroll', revealOnScroll);

    // Attach event listeners to buttons and features
    document.getElementById('confettiBtn')?.addEventListener('click', generateConfetti);
    document.getElementById('balloonBtn')?.addEventListener('click', generateBalloons);

    // Initialise other page features
    handleMusicPlayer();
    handleCardParallax();
    handleImageCaptions();
    handleShare();
    
    // Start the hearts animation
    setInterval(() => requestAnimationFrame(spawnHeart), 1100);
});