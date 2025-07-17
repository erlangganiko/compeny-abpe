// Menangani Navbar Sticky dan Logo Dinamis
window.addEventListener("scroll", function () {
  const nav = document.getElementById("main-nav");
  const heroLogo = document.getElementById("hero-logo");

  // Ambil posisi bawah dari logo di hero section
  const heroLogoBottom = heroLogo.offsetTop + heroLogo.offsetHeight;

  // Tambahkan/Hapus class 'sticky' pada navbar
  // Dan tambahkan/Hapus class 'hidden' pada logo hero
  if (window.pageYOffset > heroLogoBottom) {
    nav.classList.add("sticky");
    heroLogo.classList.add("hidden");
  } else {
    nav.classList.remove("sticky");
    heroLogo.classList.remove("hidden");
  }
});

// Menangani Menu Hamburger
const hamburger = document.querySelector(".hamburger-menu");
const navLinks = document.querySelector(".nav-links");
const closeBtn = document.querySelector(".close-btn");

// Buka menu ketika hamburger diklik
hamburger.addEventListener("click", () => {
  navLinks.classList.add("active");
});

// Tutup menu ketika tombol close diklik
closeBtn.addEventListener("click", () => {
  navLinks.classList.remove("active");
});
