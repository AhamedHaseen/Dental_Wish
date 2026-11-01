/**
 * ==============================================================================
 * DENTAL GRADUATION CONGRATULATIONS WEBSITE - JAVASCRIPT
 * University of Peradeniya, Sri Lanka &bull; Faculty of Dental Sciences
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. GLOBAL CONFIGURATION & EASY CUSTOMIZATION
     -------------------------------------------------------------------------- */
  const CONFIG = {
    // Graduate / Final Year Out Honoree
    graduateName: 'Sidheek Fathima Hima',
    nickname: 'Hima',
    title: 'Dr. Sidheek Fathima Hima',
    relationship: "Wife's Sister / Beloved Sister-in-Law",
    degree: 'Bachelor of Dental Surgery (BDS)',
    faculty: 'Faculty of Dental Sciences',
    university: 'University of Peradeniya, Sri Lanka',
    milestone: 'Final Year Completed • Stepping Out of University',

    // Colors matching CSS theme (Signature Dentist Light Blue & Sky Blue)
    colors: {
      gold: ['#38BDF8', '#0284C7', '#BAE6FD', '#D4AF37', '#ECC880'],
      sky: ['#38BDF8', '#7DD3FC', '#0284C7', '#0369A1', '#E0F2FE'],
      ivory: ['#F2F8FC', '#FFFFFF', '#F8FBFE'],
      balloonColors: ['#38BDF8', '#7DD3FC', '#0284C7', '#BAE6FD', '#D4AF37', '#ECC880']
    }
  };

  /* --------------------------------------------------------------------------
     2. NAVIGATION & SMOOTH SCROLLING
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveNavLink();
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('nav-open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav-open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section indicator in navigation
  const sections = document.querySelectorAll('section[id]');
  function highlightActiveNavLink() {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  /* --------------------------------------------------------------------------
     4. AMBIENT BACKGROUND PARTICLES (GOLDEN GLOW & FLOATING DENTAL STARS)
     -------------------------------------------------------------------------- */
  const ambientCanvas = document.getElementById('ambient-canvas');
  const ambientCtx = ambientCanvas.getContext('2d');
  let ambientWidth = ambientCanvas.width = window.innerWidth;
  let ambientHeight = ambientCanvas.height = window.innerHeight;

  let ambientParticles = [];
  const AMBIENT_COUNT = window.innerWidth < 768 ? 25 : 55;

  class AmbientParticle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * ambientWidth;
      this.y = Math.random() * ambientHeight;
      this.size = Math.random() * 3 + 1.2;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -Math.random() * 0.5 - 0.2;
      this.color = CONFIG.colors.gold[Math.floor(Math.random() * CONFIG.colors.gold.length)];
      this.opacity = Math.random() * 0.5 + 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulseVal = Math.random() * Math.PI;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.pulseVal += this.pulseSpeed;
      this.currentOpacity = this.opacity * (0.6 + 0.4 * Math.sin(this.pulseVal));

      // Wrap around edges
      if (this.y < -10) this.y = ambientHeight + 10;
      if (this.x < -10) this.x = ambientWidth + 10;
      if (this.x > ambientWidth + 10) this.x = -10;
    }

    draw(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.currentOpacity;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function initAmbientParticles() {
    ambientParticles = [];
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      ambientParticles.push(new AmbientParticle());
    }
  }

  function animateAmbientParticles() {
    ambientCtx.clearRect(0, 0, ambientWidth, ambientHeight);
    ambientParticles.forEach(p => {
      p.update();
      p.draw(ambientCtx);
    });
    requestAnimationFrame(animateAmbientParticles);
  }

  initAmbientParticles();
  animateAmbientParticles();

  window.addEventListener('resize', () => {
    ambientWidth = ambientCanvas.width = window.innerWidth;
    ambientHeight = ambientCanvas.height = window.innerHeight;
    initAmbientParticles();
  });

  /* --------------------------------------------------------------------------
     5. CELEBRATION PARTICLE ENGINE (CONFETTI, HEARTS, BALLOONS, STARS)
     -------------------------------------------------------------------------- */
  const celebCanvas = document.getElementById('celebration-canvas');
  const celebCtx = celebCanvas.getContext('2d');
  let celebWidth = celebCanvas.width = window.innerWidth;
  let celebHeight = celebCanvas.height = window.innerHeight;

  let activeParticles = [];
  let celebrationLoopRunning = false;

  window.addEventListener('resize', () => {
    celebWidth = celebCanvas.width = window.innerWidth;
    celebHeight = celebCanvas.height = window.innerHeight;
  });

  // Base Particle Class
  class Particle {
    constructor(x, y, type) {
      this.x = x || Math.random() * celebWidth;
      this.y = y || celebHeight * 0.8;
      this.type = type || 'confetti';
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 8;
      this.alpha = 1;

      if (this.type === 'confetti') {
        this.w = Math.random() * 10 + 6;
        this.h = Math.random() * 6 + 4;
        this.vx = (Math.random() - 0.5) * 12;
        this.vy = -Math.random() * 12 - 4;
        this.gravity = 0.28;
        this.color = CONFIG.colors.gold[Math.floor(Math.random() * CONFIG.colors.gold.length)];
        this.decay = Math.random() * 0.006 + 0.003;
      } else if (this.type === 'heart') {
        this.size = Math.random() * 18 + 14;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = -Math.random() * 7 - 3;
        this.gravity = 0.08;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.06 + 0.02;
        const heartPalette = ['#38BDF8', '#0284C7', '#7DD3FC', '#BAE6FD', '#D4AF37', '#FF6B81'];
        this.color = heartPalette[Math.floor(Math.random() * heartPalette.length)];
        this.decay = Math.random() * 0.005 + 0.003;
      } else if (this.type === 'balloon') {
        this.radiusX = Math.random() * 10 + 16;
        this.radiusY = this.radiusX * 1.25;
        this.x = Math.random() * (celebWidth - 100) + 50;
        this.y = celebHeight + 40;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = -Math.random() * 2.8 - 1.8;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.03;
        this.color = CONFIG.colors.balloonColors[Math.floor(Math.random() * CONFIG.colors.balloonColors.length)];
        this.decay = 0.002;
      }
    }

    update() {
      if (this.type === 'confetti') {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= 0.98;
        this.rotation += this.rotSpeed;
        this.alpha -= this.decay;
      } else if (this.type === 'heart') {
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 2 + this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.alpha -= this.decay;
      } else if (this.type === 'balloon') {
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 1.5 + this.vx;
        this.y += this.vy;
        if (this.y < -100) {
          this.alpha = 0;
        }
      }
    }

    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);

      if (this.type === 'confetti') {
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = this.color;
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
      } else if (this.type === 'heart') {
        ctx.translate(this.x, this.y);
        ctx.scale(this.size / 20, this.size / 20);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-5, -7, -12, -7, -12, 1);
        ctx.bezierCurveTo(-12, 7, 0, 14, 0, 18);
        ctx.bezierCurveTo(0, 14, 12, 7, 12, 1);
        ctx.bezierCurveTo(12, -7, 5, -7, 0, 0);
        ctx.fill();
      } else if (this.type === 'balloon') {
        ctx.translate(this.x, this.y);

        // Balloon string
        ctx.beginPath();
        ctx.moveTo(0, this.radiusY);
        ctx.quadraticCurveTo(8, this.radiusY + 20, 0, this.radiusY + 45);
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Balloon Body
        ctx.beginPath();
        ctx.ellipse(0, 0, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.3)';
        ctx.fill();

        // Balloon knot
        ctx.beginPath();
        ctx.moveTo(-4, this.radiusY);
        ctx.lineTo(4, this.radiusY);
        ctx.lineTo(0, this.radiusY + 5);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();

        // Shiny reflection
        ctx.beginPath();
        ctx.ellipse(-this.radiusX * 0.35, -this.radiusY * 0.35, this.radiusX * 0.25, this.radiusY * 0.4, -0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function startCelebrationLoop() {
    if (!celebrationLoopRunning) {
      celebrationLoopRunning = true;
      requestAnimationFrame(runCelebration);
    }
  }

  function runCelebration() {
    celebCtx.clearRect(0, 0, celebWidth, celebHeight);

    for (let i = activeParticles.length - 1; i >= 0; i--) {
      const p = activeParticles[i];
      p.update();
      p.draw(celebCtx);

      if (p.alpha <= 0) {
        activeParticles.splice(i, 1);
      }
    }

    if (activeParticles.length > 0) {
      requestAnimationFrame(runCelebration);
    } else {
      celebrationLoopRunning = false;
      celebCtx.clearRect(0, 0, celebWidth, celebHeight);
    }
  }

  // Trigger Generators
  function triggerConfetti(count = 70, originX = celebWidth / 2, originY = celebHeight * 0.5) {
    for (let i = 0; i < count; i++) {
      activeParticles.push(new Particle(originX + (Math.random() - 0.5) * 80, originY, 'confetti'));
    }
    startCelebrationLoop();
  }

  function triggerHearts(count = 35) {
    for (let i = 0; i < count; i++) {
      activeParticles.push(new Particle(Math.random() * celebWidth, celebHeight * 0.8 + Math.random() * 50, 'heart'));
    }
    startCelebrationLoop();
  }

  function triggerBalloons(count = 18) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        activeParticles.push(new Particle(0, 0, 'balloon'));
        startCelebrationLoop();
      }, i * 160);
    }
  }

  function triggerGrandCelebration() {
    triggerConfetti(120, celebWidth * 0.2, celebHeight * 0.6);
    triggerConfetti(120, celebWidth * 0.8, celebHeight * 0.6);
    triggerHearts(45);
    triggerBalloons(22);
  }

  /* --------------------------------------------------------------------------
     6. "OPEN YOUR SURPRISE" BUTTON BEHAVIOR
     -------------------------------------------------------------------------- */
  const openSurpriseBtn = document.getElementById('open-surprise-btn');

  if (openSurpriseBtn) {
    openSurpriseBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Trigger a magnificent burst of confetti & hearts
      triggerConfetti(90, window.innerWidth / 2, window.innerHeight * 0.45);
      triggerHearts(25);

      // Play celebratory chime & start background soundtrack
      playCelebrationChime();
      startBackgroundMusic(false);

      // Smooth scroll to Special Congratulations section
      const target = document.getElementById('congratulations');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Hook up Celebration buttons in the celebration station
  const btnConfetti = document.getElementById('btn-confetti');
  const btnHearts = document.getElementById('btn-hearts');
  const btnBalloons = document.getElementById('btn-balloons');
  const btnGrand = document.getElementById('btn-grand-celebration');

  if (btnConfetti) btnConfetti.addEventListener('click', () => {
    triggerConfetti(90);
    playSoftChimeNote(523.25); // C5
  });
  if (btnHearts) btnHearts.addEventListener('click', () => {
    triggerHearts(40);
    playSoftChimeNote(659.25); // E5
  });
  if (btnBalloons) btnBalloons.addEventListener('click', () => {
    triggerBalloons(20);
    playSoftChimeNote(783.99); // G5
  });
  if (btnGrand) btnGrand.addEventListener('click', () => {
    triggerGrandCelebration();
    playCelebrationChime();
  });

  // Interactive Golden Tooth click effect
  const interactiveTooth = document.getElementById('interactive-tooth');
  if (interactiveTooth) {
    interactiveTooth.addEventListener('click', (e) => {
      const rect = interactiveTooth.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      triggerConfetti(45, x, y);
      playSoftChimeNote(880); // A5 sparkling tooth chime
    });
  }

  /* --------------------------------------------------------------------------
     7. INTERACTIVE ENVELOPE & LETTER OPENING
     -------------------------------------------------------------------------- */
  const interactiveEnvelope = document.getElementById('interactive-envelope');
  const waxSeal = document.getElementById('wax-seal');
  const envelopeActionBtn = document.getElementById('envelope-action-btn');
  const envelopeBtnText = document.getElementById('envelope-btn-text');
  const enlargeLetterBtn = document.getElementById('enlarge-letter-btn');
  const letterModal = document.getElementById('letter-modal');
  const letterModalClose = document.getElementById('letter-modal-close');
  const letterModalBackdrop = document.getElementById('letter-modal-backdrop');

  let isEnvelopeOpen = false;

  function toggleEnvelope() {
    isEnvelopeOpen = !isEnvelopeOpen;
    if (isEnvelopeOpen) {
      interactiveEnvelope.classList.add('is-open');
      interactiveEnvelope.setAttribute('aria-expanded', 'true');
      if (envelopeBtnText) envelopeBtnText.textContent = 'Fold Envelope ✉️';

      // Gentle sparkle burst on open
      const rect = interactiveEnvelope.getBoundingClientRect();
      triggerConfetti(35, rect.left + rect.width / 2, rect.top + 60);
      playSoftChimeNote(659.25);
    } else {
      interactiveEnvelope.classList.remove('is-open');
      interactiveEnvelope.setAttribute('aria-expanded', 'false');
      if (envelopeBtnText) envelopeBtnText.textContent = 'Open Envelope ✉️';
    }
  }

  if (waxSeal) waxSeal.addEventListener('click', toggleEnvelope);
  if (interactiveEnvelope) {
    interactiveEnvelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleEnvelope();
      }
    });
  }
  if (envelopeActionBtn) envelopeActionBtn.addEventListener('click', toggleEnvelope);

  // Fullscreen Letter Modal
  if (enlargeLetterBtn) {
    enlargeLetterBtn.addEventListener('click', () => {
      letterModal.classList.add('active');
      letterModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      playSoftChimeNote(587.33); // D5
    });
  }

  function closeLetterModal() {
    letterModal.classList.remove('active');
    letterModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (letterModalClose) letterModalClose.addEventListener('click', closeLetterModal);
  if (letterModalBackdrop) letterModalBackdrop.addEventListener('click', closeLetterModal);

  /* --------------------------------------------------------------------------
     8. MEMORIES PHOTO GALLERY & LIGHTBOX
     -------------------------------------------------------------------------- */
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentGalleryIndex = 0;
  const galleryItems = [];

  // Reliable SVG Placeholder Generator (Protects against missing/offline images)
  function createFallbackSvg(title, subtitle) {
    const safeTitle = title || 'Dr. Sidheek Fathima Hima';
    const safeSub = subtitle || 'Faculty of Dental Sciences &bull; Univ. of Peradeniya';
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="540" viewBox="0 0 800 540">
      <defs>
        <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F0F8FF"/>
          <stop offset="100%" stop-color="#E0F2FE"/>
        </linearGradient>
        <linearGradient id="goldG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8"/>
          <stop offset="100%" stop-color="#0284C7"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgG)"/>
      <rect x="20" y="20" width="760" height="500" rx="16" fill="none" stroke="url(#goldG)" stroke-width="2" stroke-dasharray="6 4"/>
      <circle cx="400" cy="210" r="70" fill="url(#goldG)" opacity="0.18"/>
      <text x="400" y="235" font-size="70" text-anchor="middle">🦷</text>
      <text x="400" y="325" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="bold" fill="#0B192C" text-anchor="middle">${safeTitle}</text>
      <text x="400" y="365" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600" fill="#0284C7" text-anchor="middle">${safeSub}</text>
      <text x="400" y="440" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#64748B" text-anchor="middle">Click to customize with personal photo</text>
    </svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
  }

  // Set up cards & error handlers
  galleryCards.forEach((card, idx) => {
    const img = card.querySelector('.gallery-img');
    const title = card.querySelector('.card-title');
    const caption = card.querySelector('.card-caption');

    if (img) {
      img.addEventListener('error', function onImgError() {
        const titleText = img.getAttribute('data-label') || (title ? title.textContent : 'Dental Memory');
        const subText = img.getAttribute('data-sub') || 'Faculty of Dental Sciences';
        this.src = createFallbackSvg(titleText, subText);
        if (galleryItems[idx]) {
          galleryItems[idx].src = this.src;
        }
      });
    }

    galleryItems.push({
      src: img ? img.src : '',
      alt: img ? img.alt : '',
      title: title ? title.textContent : '',
      desc: caption ? caption.textContent : ''
    });

    card.addEventListener('click', () => {
      openLightbox(idx);
    });
  });

  function openLightbox(index) {
    currentGalleryIndex = index;
    const item = galleryItems[currentGalleryIndex];
    if (!item) return;

    lightboxImg.onerror = function () {
      this.src = createFallbackSvg(item.title, item.desc);
    };
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function nextGalleryItem() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    openLightbox(currentGalleryIndex);
  }

  function prevGalleryItem() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentGalleryIndex);
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextGalleryItem);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevGalleryItem);

  // Keyboard navigation for modals
  window.addEventListener('keydown', (e) => {
    if (lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextGalleryItem();
      if (e.key === 'ArrowLeft') prevGalleryItem();
    } else if (letterModal.classList.contains('active')) {
      if (e.key === 'Escape') closeLetterModal();
    }
  });

  // Mobile Touch Swipe Navigation for Photo Gallery Lightbox
  let touchStartX = 0;
  let touchStartY = 0;
  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
      }
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Detect clean horizontal swipe gesture (> 45px)
        if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
          if (diffX < 0) {
            nextGalleryItem(); // Swiped left -> next photo
          } else {
            prevGalleryItem(); // Swiped right -> previous photo
          }
        }
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     9. CELEBRATORY MELODY & SCROLL-TRIGGERED AUDIO SYSTEM
     - Automatically starts when the user scrolls the page!
     - Dual-mode: Supports custom MP3 ('music.mp3') with automatic seamless
       fallback to a rich, soothing synthesized harp & piano graduation soundtrack.
     -------------------------------------------------------------------------- */
  let audioCtx = null;
  let masterGain = null;
  let isMusicPlaying = false;
  let userExplicitlyPaused = false;
  let toastShown = false;
  let melodyTimeout = null;
  let currentArpIndex = 0;

  const musicToggle = document.getElementById('music-toggle');
  const musicBtnText = document.getElementById('music-btn-text');
  const musicToast = document.getElementById('music-toast');
  const customAudio = document.getElementById('custom-audio');

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
        masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        masterGain.connect(audioCtx.destination);
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Soft Acoustic Bell / Harp Synthesis Note
  function playSoftChimeNote(freq, delay = 0, duration = 1.6, vol = 0.22) {
    initAudioContext();
    if (!audioCtx) return;

    setTimeout(() => {
      try {
        const now = audioCtx.currentTime;

        // Primary fundamental oscillator (pure sine)
        const osc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Gentle harmonic shimmer (soft triangle wave 1 octave up)
        const oscHarmonic = audioCtx.createOscillator();
        const harmonicGain = audioCtx.createGain();
        oscHarmonic.type = 'triangle';
        oscHarmonic.frequency.setValueAtTime(freq * 2, now);

        // ADSR Volume Envelopes
        noteGain.gain.setValueAtTime(0.0001, now);
        noteGain.gain.linearRampToValueAtTime(vol, now + 0.04);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        harmonicGain.gain.setValueAtTime(0.0001, now);
        harmonicGain.gain.linearRampToValueAtTime(vol * 0.16, now + 0.03);
        harmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.6);

        // Connect
        osc.connect(noteGain);
        oscHarmonic.connect(harmonicGain);
        noteGain.connect(masterGain || audioCtx.destination);
        harmonicGain.connect(masterGain || audioCtx.destination);

        osc.start(now);
        oscHarmonic.start(now);
        osc.stop(now + duration);
        oscHarmonic.stop(now + duration);
      } catch (err) {
        console.warn('Note audio notice:', err);
      }
    }, delay);
  }

  function playCelebrationChime() {
    // Joyful ascending arpeggio (C Major 9)
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50];
    notes.forEach((freq, idx) => {
      playSoftChimeNote(freq, idx * 90, 1.8, 0.28);
    });
  }

  // Heartfelt Graduation Canon Progression (Harp & Chime Arpeggio Pattern)
  const canonArpeggios = [
    // 1. C Major (Root, 5th, 10th, 8va)
    { bass: 130.81, notes: [261.63, 329.63, 392.00, 523.25] },
    // 2. G Major
    { bass: 98.00, notes: [196.00, 246.94, 293.66, 392.00] },
    // 3. A Minor
    { bass: 110.00, notes: [220.00, 261.63, 329.63, 440.00] },
    // 4. E Minor
    { bass: 82.41, notes: [164.81, 196.00, 246.94, 329.63] },
    // 5. F Major
    { bass: 87.31, notes: [174.61, 220.00, 261.63, 349.23] },
    // 6. C Major
    { bass: 130.81, notes: [261.63, 329.63, 392.00, 523.25] },
    // 7. F Major / D Minor
    { bass: 110.00, notes: [220.00, 261.63, 293.66, 440.00] },
    // 8. G Major
    { bass: 98.00, notes: [196.00, 246.94, 293.66, 392.00] }
  ];

  function loopGraduationSoundtrack() {
    if (!isMusicPlaying) return;

    const currentChord = canonArpeggios[currentArpIndex];
    if (currentChord) {
      // Play warm deep bass note
      playSoftChimeNote(currentChord.bass, 0, 2.5, 0.18);

      // Play 4 gentle cascading harp arpeggios
      currentChord.notes.forEach((freq, i) => {
        playSoftChimeNote(freq, i * 350, 1.6, 0.16);
      });
    }

    currentArpIndex = (currentArpIndex + 1) % canonArpeggios.length;
    melodyTimeout = setTimeout(loopGraduationSoundtrack, 1420);
  }

  // Smooth Background Music Starter
  function startBackgroundMusic(isFromScroll = false) {
    if (userExplicitlyPaused && isFromScroll) return;
    if (isMusicPlaying) return;

    initAudioContext();
    isMusicPlaying = true;

    // Smoothly fade in volume over 1.8 seconds
    if (masterGain && audioCtx) {
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(1.0, audioCtx.currentTime + 1.8);
    }

    // Try playing custom MP3 if available; otherwise run the synthesized graduation soundtrack
    let playedCustom = false;
    if (customAudio && customAudio.src && !customAudio.src.endsWith('/')) {
      customAudio.volume = 0.55;
      const playPromise = customAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          playedCustom = true;
        }).catch(() => {
          // Fallback to synthesized melody
          loopGraduationSoundtrack();
        });
      }
    }

    if (!playedCustom) {
      loopGraduationSoundtrack();
    }

    // Update UI Button
    if (musicToggle) {
      musicToggle.classList.add('playing');
      musicToggle.setAttribute('aria-pressed', 'true');
    }
    if (musicBtnText) {
      musicBtnText.textContent = 'Pause Melody';
    }

    // Show gentle Toast prompt if initiated by scroll
    if (musicToast && !toastShown && isFromScroll) {
      toastShown = true;
      musicToast.classList.add('show');
      setTimeout(() => {
        musicToast.classList.remove('show');
      }, 3600);
    }
  }

  // Background Music Pause
  function pauseBackgroundMusic() {
    isMusicPlaying = false;
    clearTimeout(melodyTimeout);

    if (customAudio && !customAudio.paused) {
      customAudio.pause();
    }

    if (musicToggle) {
      musicToggle.classList.remove('playing');
      musicToggle.setAttribute('aria-pressed', 'false');
    }
    if (musicBtnText) {
      musicBtnText.textContent = 'Play Melody';
    }
  }

  // Toggle button event
  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      if (isMusicPlaying) {
        userExplicitlyPaused = true;
        pauseBackgroundMusic();
      } else {
        userExplicitlyPaused = false;
        startBackgroundMusic(false);
      }
    });
  }

  /* --------------------------------------------------------------------------
     10. SCROLL-TRIGGERED MUSIC ACTIVATION
     Automatically starts the music when the user begins scrolling!
     -------------------------------------------------------------------------- */
  function onFirstScrollActivateMusic() {
    if (window.scrollY > 20 || window.pageYOffset > 20) {
      startBackgroundMusic(true);
      // Remove listeners once activated
      window.removeEventListener('scroll', onFirstScrollActivateMusic);
      window.removeEventListener('wheel', onFirstScrollActivateMusic);
      window.removeEventListener('touchmove', onFirstScrollActivateMusic);
    }
  }

  window.addEventListener('scroll', onFirstScrollActivateMusic, { passive: true });
  window.addEventListener('wheel', onFirstScrollActivateMusic, { passive: true });
  window.addEventListener('touchmove', onFirstScrollActivateMusic, { passive: true });

  /* --------------------------------------------------------------------------
     11. DENTAL SCROLL COMPANION (TOOTH SCROLLS ALONG WITH THE USER)
     -------------------------------------------------------------------------- */
  const scrollTracker = document.getElementById('scroll-tooth-tracker');
  const scrollTrackFill = document.getElementById('scroll-track-fill');
  const scrollToothAvatar = document.getElementById('scroll-tooth-avatar');
  const toothTooltipPercent = document.getElementById('tooth-tooltip-percent');

  let lastScrollY = window.scrollY || 0;
  let companionScrollTimeout = null;

  function updateDentalScrollCompanion() {
    if (!scrollTracker || !scrollToothAvatar) return;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const currentScroll = window.scrollY || window.pageYOffset || 0;
    const progress = Math.min(Math.max(currentScroll / docHeight, 0), 1);
    const percent = Math.round(progress * 100);

    // Calculate maximum travel inside track
    const trackerHeight = scrollTracker.offsetHeight - 52;
    const targetY = progress * Math.max(trackerHeight, 0);

    // Dynamic tilt based on scroll velocity & direction
    const scrollDelta = currentScroll - lastScrollY;
    const tilt = Math.min(Math.max(scrollDelta * 0.45, -18), 18);
    lastScrollY = currentScroll;

    // Apply smooth position and tilt
    scrollToothAvatar.style.transform = `translate(-50%, ${targetY}px) rotate(${tilt}deg)`;

    if (scrollTrackFill) {
      scrollTrackFill.style.height = `${percent}%`;
    }
    if (toothTooltipPercent) {
      toothTooltipPercent.textContent = `${percent}%`;
    }

    // Add scrolling class to show progress tooltip while moving
    scrollTracker.classList.add('is-scrolling');
    clearTimeout(companionScrollTimeout);
    companionScrollTimeout = setTimeout(() => {
      scrollTracker.classList.remove('is-scrolling');
      scrollToothAvatar.style.transform = `translate(-50%, ${targetY}px) rotate(0deg)`;
    }, 450);
  }

  window.addEventListener('scroll', updateDentalScrollCompanion, { passive: true });
  window.addEventListener('resize', updateDentalScrollCompanion);
  updateDentalScrollCompanion();

  // Click on the Companion Tooth for a playful sparkle burst and chime!
  if (scrollToothAvatar) {
    scrollToothAvatar.addEventListener('click', () => {
      const rect = scrollToothAvatar.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      triggerConfetti(35, originX, originY);
      playSoftChimeNote(880, 0, 1.4, 0.32); // A5 sparkle note
    });

    scrollToothAvatar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToothAvatar.click();
      }
    });
  }

  /* --------------------------------------------------------------------------
     12. INITIAL CONGRATULATIONS GREETING LOG
     -------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------
     12. HOME PAGE LOADING SCREEN (PRELOADER WITH DENTAL HUMOR & THOUGHTS)
     -------------------------------------------------------------------------- */
  const pagePreloader = document.getElementById('page-preloader');
  const preloaderProgressFill = document.getElementById('preloader-progress-fill');
  const preloaderPercent = document.getElementById('preloader-percent');
  const preloaderThoughtText = document.getElementById('preloader-thought-text');
  const preloaderThoughtIcon = document.getElementById('preloader-thought-icon');
  const preloaderStatus = document.getElementById('preloader-status');

  const loadingThoughts = [
    { pct: 18, icon: '🪥', text: 'Sterilizing dental instruments & memorizing 32 teeth...', status: 'Preparing clinic tools...' },
    { pct: 40, icon: '🩺', text: "Dentist Rule #1: You can never lie to Dr. Hima about flossing! 😂", status: 'Checking gums & cavities...' },
    { pct: 65, icon: '☕', text: 'Surviving 5 years of clinic viva stress... Ceylon tea power!', status: 'Reviewing Peradeniya cases...' },
    { pct: 88, icon: '💪', text: 'Tooth decay is officially trembling in fear! ✨', status: 'Final polish in progress...' },
    { pct: 100, icon: '🎉', text: '100% Love & Pride loaded! Welcome, Doctor Hima! ❤️', status: 'Ready to Celebrate!' }
  ];

  if (pagePreloader) {
    document.body.style.overflow = 'hidden';
    let currentPct = 0;
    let isPreloaderDone = false;
    const loadDuration = 2400; // ~2.4 seconds snappy luxury experience
    const intervalTime = 30;
    const step = 100 / (loadDuration / intervalTime);

    function finishPreloader() {
      if (isPreloaderDone) return;
      isPreloaderDone = true;
      if (preloaderProgressFill) preloaderProgressFill.style.width = '100%';
      if (preloaderPercent) preloaderPercent.textContent = '100%';
      if (preloaderStatus) preloaderStatus.textContent = 'Welcome Doctor Hima! ❤️';

      setTimeout(() => {
        pagePreloader.classList.add('loaded');
        document.body.style.overflow = '';
        triggerConfetti(70, window.innerWidth / 2, window.innerHeight * 0.45);
        playCelebrationChime();
      }, 350);
    }

    const loadTimer = setInterval(() => {
      currentPct = Math.min(100, currentPct + step + (Math.random() * 1.5));
      const rounded = Math.floor(currentPct);

      if (preloaderProgressFill) preloaderProgressFill.style.width = `${rounded}%`;
      if (preloaderPercent) preloaderPercent.textContent = `${rounded}%`;

      const matchedThought = loadingThoughts.find(t => rounded <= t.pct);
      if (matchedThought) {
        if (preloaderThoughtText && preloaderThoughtText.textContent !== matchedThought.text) {
          preloaderThoughtText.style.opacity = '0.3';
          setTimeout(() => {
            preloaderThoughtText.textContent = matchedThought.text;
            preloaderThoughtText.style.opacity = '1';
          }, 100);
        }
        if (preloaderThoughtIcon && preloaderThoughtIcon.textContent !== matchedThought.icon) {
          preloaderThoughtIcon.textContent = matchedThought.icon;
        }
        if (preloaderStatus && preloaderStatus.textContent !== matchedThought.status) {
          preloaderStatus.textContent = matchedThought.status;
        }
      }

      if (currentPct >= 100) {
        clearInterval(loadTimer);
        finishPreloader();
      }
    }, intervalTime);

    // Fast-skip on tap / click
    pagePreloader.addEventListener('click', () => {
      clearInterval(loadTimer);
      finishPreloader();
    });
  }

  console.log(
    '%c🦷 Heartiest Congratulations, Dr. Sidheek Fathima Hima! 🎓\n%cFinal Year Completed • Faculty of Dental Sciences, University of Peradeniya\nPresented with boundless love & pride by your sister, brother-in-law & family! ❤️✨\n🎶 Background music activates seamlessly on scroll.',
    'color: #D4AF37; font-size: 16px; font-weight: bold; font-family: serif;',
    'color: #B76E79; font-size: 12px; font-weight: 500;'
  );

});