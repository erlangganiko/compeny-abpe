// Menunggu hingga seluruh konten halaman (DOM) selesai dimuat sebelum menjalankan skrip.
document.addEventListener("DOMContentLoaded", function () {
  /**
   * Mengatur fungsionalitas loading screen.
   * Loading screen akan hilang setelah beberapa detik dan menampilkan konten utama.
   */
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  if (loadingScreen && mainContent) {
    // Atur waktu tampil loading screen (misal: 3 detik)
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      // Tampilkan konten utama dengan efek fade-in sederhana
      mainContent.style.display = "block";
      mainContent.style.animation = "fadeIn 0.5s ease-in-out";
    }, 2000); // 2000 milidetik = 2 detik
  }

  // Tambahkan keyframes untuk animasi fadeIn ke dalam style
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);

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
