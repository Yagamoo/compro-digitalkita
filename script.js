// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.borderBottomColor = window.scrollY > 50
    ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.07)';
});

function showMsg(text, isError) {
  const msg = document.getElementById('form-msg');
  msg.style.display = 'block';
  msg.style.background = isError ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)';
  msg.style.border = isError ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(245,158,11,0.3)';
  msg.style.color = isError ? '#f87171' : 'var(--orange)';
  msg.textContent = text;
}

async function submitForm() {
  const nama   = document.getElementById('f-nama').value.trim();
  const wa     = document.getElementById('f-wa').value.trim();
  const email  = document.getElementById('f-email').value.trim();
  const layanan= document.getElementById('f-layanan').value;
  const pesan  = document.getElementById('f-pesan').value.trim();
  const btn    = document.getElementById('submit-btn');

  if (!nama) { showMsg('⚠️ Nama kamu wajib diisi.', true); return; }
  if (!wa)   { showMsg('⚠️ Nomor WhatsApp wajib diisi.', true); return; }
  if (!pesan){ showMsg('⚠️ Ceritakan dulu proyekmu ya!', true); return; }

  // Kirim ke WhatsApp
  const waText = encodeURIComponent(
    `Halo DigitalKita! 👋\n\n*Nama:* ${nama}\n*WA:* ${wa}\n*Email:* ${email||'-'}\n*Layanan:* ${layanan||'Belum dipilih'}\n\n*Pesan:*\n${pesan}\n\n_Dikirim dari website digitalkita_`
  );
  window.open(`https://wa.me/6281775432385?text=${waText}`, '_blank');

  // Kirim ke email via Formspree (ganti YOUR_FORM_ID)
  btn.textContent = 'Mengirim...';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/xyknazpw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ nama, wa, email, layanan, pesan })
    });

    if (res.ok) {
      showMsg('✅ Pesan terkirim ke WA & email! Kami akan balas segera.', false);
      ['f-nama','f-wa','f-email','f-pesan'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('f-layanan').selectedIndex = 0;
    } else {
      showMsg('✅ WA terkirim! Tapi email gagal, coba lagi.', false);
    }
  } catch {
    showMsg('✅ WA terkirim! Tapi email gagal, cek koneksi.', false);
  } finally {
    btn.textContent = 'Kirim Pesan →';
    btn.style.opacity = '1';
    btn.disabled = false;
  }
}

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#'+current
      ? 'var(--orange)' : '';
  });
});

function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}
// Close menu when clicking outside
document.addEventListener('click', function(e) {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger');
  if (!menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove('open');
    btn.classList.remove('open');
  }
});