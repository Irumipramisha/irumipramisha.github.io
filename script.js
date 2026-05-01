// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

const hoverEls = document.querySelectorAll('a, button, .project-item, .skill-item, .process-step');
hoverEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovering');
    ring.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovering');
    ring.classList.remove('hovering');
  });
});

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// FORM HANDLER (UPDATED WITH FETCH)
function handleSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const btn = form.querySelector('[type=submit]');
  const formData = new FormData(form);

  // Animation: Sending...
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';

  // Formspree API එකට දත්ත යැවීම
  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      // සාර්ථක වුණොත් පෙන්වන Animation එක
      btn.textContent = 'Message Sent!';
      btn.style.background = '#1a1a1a';
      btn.style.color = '#c8f53a';
      btn.style.border = '1px solid #c8f53a';
      form.reset(); // Form එක reset කිරීම

      setTimeout(() => {
        // තත්පර 3කට පසු Button එක තිබුණු තත්වයට පත් කිරීම
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.style.color = '';
        btn.style.border = '';
        btn.style.opacity = '';
      }, 3000);
    } else {
      // Server එකේ ගැටලුවක් ආවොත්
      btn.textContent = 'Error! Try Again';
      btn.style.color = '#ff4d4d';
    }
  }).catch(error => {
    // Internet connection වගේ ගැටලුවක් ආවොත්
    btn.textContent = 'Connection Error';
    btn.style.color = '#ff4d4d';
  });
}

// PARALLAX BG TEXT
const bgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  if(bgText) bgText.style.transform = `translateY(calc(-50% + ${scroll * 0.3}px))`;
});