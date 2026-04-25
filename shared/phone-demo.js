// shared/phone-demo.js — animated phone call demo

function initPhoneDemo(containerId, conversation) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const transcript = container.querySelector('.phone-transcript');
  const timerEl = container.querySelector('.phone-timer');
  const waveBars = container.querySelectorAll('.wave-bar');

  let seconds = 0;
  let msgIndex = 0;
  let timerInterval = null;
  let demoInterval = null;
  let running = false;

  function formatTime(s) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      seconds++;
      if (timerEl) timerEl.textContent = formatTime(seconds);
    }, 1000);
  }

  function setWave(active) {
    waveBars.forEach(b => {
      if (active) b.classList.remove('paused');
      else b.classList.add('paused');
    });
  }

  function showNextMsg() {
    if (msgIndex >= conversation.length) {
      // Restart after pause
      setTimeout(() => {
        transcript.innerHTML = '';
        msgIndex = 0;
        seconds = 0;
        if (timerEl) timerEl.textContent = '00:00';
        runDemo();
      }, 3500);
      return;
    }

    const msg = conversation[msgIndex];
    msgIndex++;

    // Show typing indicator for agent
    let typingEl = null;
    if (msg.role === 'agent') {
      typingEl = document.createElement('div');
      typingEl.className = 'transcript-msg show';
      typingEl.innerHTML = `
        <span class="msg-label agent">Wild AI</span>
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>`;
      transcript.appendChild(typingEl);
      transcript.scrollTop = transcript.scrollHeight;
      setWave(true);
    } else {
      setWave(false);
    }

    const delay = msg.role === 'agent' ? 1400 : 600;

    setTimeout(() => {
      if (typingEl) typingEl.remove();

      const el = document.createElement('div');
      el.className = 'transcript-msg';
      el.innerHTML = `
        <span class="msg-label ${msg.role}">${msg.role === 'agent' ? 'Wild AI' : 'Caller'}</span>
        <div class="msg-bubble ${msg.role}">${msg.text}</div>`;
      transcript.appendChild(el);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.add('show'));
      });

      transcript.scrollTop = transcript.scrollHeight;
      setWave(msg.role === 'agent');

      const nextDelay = msg.pause || (msg.role === 'agent' ? 2200 : 1200);
      demoInterval = setTimeout(showNextMsg, nextDelay);
    }, delay);
  }

  function runDemo() {
    if (running) return;
    running = true;
    setWave(true);
    startTimer();
    setTimeout(showNextMsg, 800);
  }

  // Start when phone demo is visible
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !running) {
        runDemo();
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });

  obs.observe(container);
}
