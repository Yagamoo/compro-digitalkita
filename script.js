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

// ============================================================
// KONFIGURASI — isi setelah daftar di emailjs.com
// ============================================================
const EMAILJS_PUBLIC_KEY  = 'oNx0tQjL4OSp0R98g';
const EMAILJS_SERVICE_ID  = 'service_716k9bm';
const EMAILJS_TEMPLATE_ID = 'template_ex6zim9';
const WA_NUMBER = '6281775432385';
// ============================================================

// Inisialisasi EmailJS
(function(){
  if(typeof emailjs !== 'undefined') emailjs.init(EMAILJS_PUBLIC_KEY);
})();

function showMsg(text, isError) {
  const msg = document.getElementById('form-msg');
  msg.style.display = 'block';
  msg.style.background = isError ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)';
  msg.style.border = isError ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(245,158,11,0.3)';
  msg.style.color = isError ? '#f87171' : 'var(--orange)';
  msg.textContent = text;
}

function submitForm() {
  const nama    = document.getElementById('f-nama').value.trim();
  const wa      = document.getElementById('f-wa').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const layanan = document.getElementById('f-layanan').value;
  const pesan   = document.getElementById('f-pesan').value.trim();
  const btn     = document.getElementById('submit-btn');

  // Validasi field wajib
  if (!nama) { showMsg('⚠️ Nama kamu wajib diisi.', true); return; }
  if (!wa)   { showMsg('⚠️ Nomor WhatsApp wajib diisi.', true); return; }
  if (!pesan){ showMsg('⚠️ Ceritakan dulu proyekmu ya!', true); return; }

  // --- 1. Kirim ke WhatsApp ---
  const waText = encodeURIComponent(
    `Halo DigitalKita! 👋

` +
    `*Nama:* ${nama}
` +
    `*WA:* ${wa}
` +
    `*Email:* ${email || '-'}
` +
    `*Layanan:* ${layanan || 'Belum dipilih'}

` +
    `*Pesan:*
${pesan}

` +
    `_Dikirim dari website digitalkita_`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${waText}`, '_blank');

  // --- 2. Kirim email via EmailJS (jika sudah dikonfigurasi) ---
  if (EMAILJS_PUBLIC_KEY !== 'GANTI_DENGAN_PUBLIC_KEY_KAMU' && typeof emailjs !== 'undefined') {
    btn.textContent = 'Mengirim...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name:  nama,
      from_wa:    wa,
      from_email: email || '-',
      layanan:    layanan || 'Belum dipilih',
      message:    pesan,
    })
    .then(() => {
      showMsg('✅ Pesan terkirim ke WA & email! Kami akan balas segera.', false);
      // Reset form
      ['f-nama','f-wa','f-email','f-pesan'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('f-layanan').selectedIndex = 0;
    })
    .catch(() => {
      showMsg('✅ WA terkirim! (Email gagal — cek konfigurasi EmailJS)', false);
    })
    .finally(() => {
      btn.textContent = 'Kirim Pesan →';
      btn.style.opacity = '1';
      btn.disabled = false;
    });
  } else {
    // EmailJS belum dikonfigurasi, cukup WA saja
    showMsg('✅ Membuka WhatsApp... Pesanmu sudah terformat otomatis!', false);
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