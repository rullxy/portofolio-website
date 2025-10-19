const typingText = document.querySelector('.typing-text');
const text = "your name or your description.";
let index = 0;
let isDeleting = false;
let speed = 100;

function type() {
  const currentText = text.substring(0, index);
  typingText.textContent = currentText;

  if (!isDeleting && index < text.length) {
    index++;
    speed = 100;
  } else if (isDeleting && index > 0) {
    index--;
    speed = 50;
  }

  if (index === text.length) {
    isDeleting = true;
    speed = 1500; 
  } else if (index === 0 && isDeleting) {
    isDeleting = false;
    speed = 500;
  }

  setTimeout(type, speed);
}

setTimeout(type, 1000);


const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
} else {
  body.classList.add('dark-mode');
  themeIcon.classList.remove('fa-sun');
  themeIcon.classList.add('fa-moon');
}

themeToggleBtn.addEventListener('click', () => {
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
  }
});

(function(){
  try {
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screen: { w: screen.width, h: screen.height },
      url: location.href,
      time: new Date().toISOString()
    };

    fetch('/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    }).catch(()=>{});
  } catch (err) {
    console.warn('log gagal:', err);
  }
})();
document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll('.fade-in');
  const checkVisible = () => {
    fadeEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', checkVisible);
  checkVisible();
});
