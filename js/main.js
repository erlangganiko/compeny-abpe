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
 document.addEventListener("DOMContentLoaded", () => {
  /**
   * Mengatur fungsionalitas menu hamburger untuk perangkat mobile.
   * - Membuka/menutup menu saat ikon hamburger diklik (toggle).
   * - Menutup menu saat area di luar navigasi diklik.
   */
  const hamburger = document.querySelector(".hamburger-menu");
  const navLinks = document.querySelector(".nav-links");

  // Pastikan kedua elemen ada sebelum menambahkan event listener
  if (hamburger && navLinks) {
    // 1. Buka/tutup menu ketika ikon hamburger diklik
    hamburger.addEventListener("click", (event) => {
      // Gunakan toggle untuk menambahkan/menghapus kelas 'active'
      navLinks.classList.toggle("active");
      // Hentikan event agar tidak langsung ditangkap oleh document
      event.stopPropagation();
    });

    // 2. Tutup menu jika klik di luar area navigasi
    document.addEventListener("click", (event) => {
      // Cek apakah menu sedang aktif dan klik terjadi di luar menu
      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target)
      ) {
        navLinks.classList.remove("active");
      }
    });
  }
});
