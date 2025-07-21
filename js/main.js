// Menunggu hingga seluruh konten halaman (DOM) selesai dimuat sebelum menjalankan skrip.
// Ini adalah praktik terbaik untuk menghindari error.
document.addEventListener("DOMContentLoaded", function () {
  /**
   * Mengatur perilaku 'sticky' untuk navbar saat pengguna menggulir halaman.
   * Navbar akan menjadi 'sticky' setelah posisi scroll melewati bagian bawah logo di hero section.
   */
  const nav = document.getElementById("main-nav");
  const heroLogo = document.getElementById("hero-logo");

  if (nav && heroLogo) {
    window.addEventListener("scroll", function () {
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
  }

  /**
   * Mengatur fungsionalitas menu hamburger untuk perangkat mobile.
   * Membuka dan menutup menu navigasi saat ikon hamburger atau tombol close diklik.
   */
  const hamburger = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".nav-links");
  const closeBtn = document.querySelector(".close-btn");

  if (hamburger && navLinks && closeBtn) {
    // Buka menu ketika hamburger diklik
    hamburger.addEventListener("click", () => {
      navLinks.classList.add("active");
    });

    // Tutup menu ketika tombol close diklik
    closeBtn.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  }
});
