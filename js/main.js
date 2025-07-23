// Menunggu hingga seluruh konten halaman (DOM) selesai dimuat sebelum menjalankan skrip.
document.addEventListener("DOMContentLoaded", function () {
  /**
   * Data Testimoni Terpisah
   * Semua data testimoni disimpan di sini dalam bentuk objek.
   * Kunci objek adalah 'id' dari testimoni yang ada di HTML (data-testimonial-id).
   */
  const testimonialData = {
    t1: {
      avatar: "https://i.pravatar.cc/150?u=claire",
      name: "Claire Armstrong",
      title: "Director of Digital Product",
      quote: "Avo saved my sanity when juggling our tracking plans. We now generate analytics within minutes of a new feature launch because of the pre-work we've done in Avo.",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Fender_Telecaster_logo.svg/1280px-Fender_Telecaster_logo.svg.png",
      companyLogoFilter: "", // Kosongkan jika tidak ada filter
    },
    t2: {
      avatar: "https://i.pravatar.cc/150?u=nicholas",
      name: "Nicholas Threapleton",
      title: "Lead Product Analyst",
      quote: "Buying Avo was possibly the most impactful decision I've made. I don't know how product companies do any analytics without Avo. It's become the foundation of our analytics.",
      companyLogo: "https://assets-global.website-files.com/620691a5554dd8449c235b53/620699478cc55d37613c1265_horizontal-logo-grey.svg",
      companyLogoFilter: "invert(1)",
    },
    t3: {
      avatar: "https://i.pravatar.cc/150?u=tomi",
      name: "Tomi Keah",
      title: "Senior Data Analyst",
      quote: "The best data governance platform for your analytics events. Overall I'm very happy with the product and our data quality improves on a daily basis.",
      companyLogo: "https://assets-global.website-files.com/634681ce262a8a56b3e1b9b1/636b1368623545625c56d773_Wordmark_White_Large.svg",
      companyLogoFilter: "",
    },
  };

  /**
   * Mengatur fungsionalitas loading screen.
   * Loading screen akan hilang setelah beberapa detik dan menampilkan konten utama.
   */
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  if (loadingScreen && mainContent) {
    // Atur waktu tampil loading screen (misal: 2 detik)
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

  /**
   * Fungsionalitas slider otomatis untuk testimoni dengan pause on hover.
   */
  const testimonialsGrid = document.querySelector(".testimonials-grid");
  if (testimonialsGrid) {
    // Duplikasi konten grid untuk loop yang mulus
    const originalContent = testimonialsGrid.innerHTML;
    testimonialsGrid.innerHTML += originalContent;
  }

  /**
   * Fungsionalitas pop-up testimoni.
   */
  const testimonialPopup = document.getElementById("testimonial-popup");
  const popupAvatar = document.getElementById("popup-avatar");
  const popupName = document.getElementById("popup-name");
  const popupTitle = document.getElementById("popup-title");
  const popupQuote = document.getElementById("popup-quote");
  const popupCompanyLogo = document.getElementById("popup-company-logo");
  const closeBtn = document.querySelector("#testimonial-popup .close-btn");

  // Event listener untuk setiap tombol "Read full G2 review →"
  document.querySelectorAll(".review-link").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault(); // Mencegah perilaku default link

      // Temukan testimonial-card terdekat untuk mendapatkan ID-nya
      const card = this.closest(".testimonial-card");
      if (card) {
        const testimonialId = card.dataset.testimonialId; // Ambil ID dari data-testimonial-id
        const data = testimonialData[testimonialId]; // Ambil data dari objek testimonialData

        // Pastikan data ditemukan
        if (data) {
          // Isi konten pop-up menggunakan data dari objek
          popupAvatar.src = data.avatar;
          popupName.textContent = data.name;
          popupTitle.textContent = data.title;
          popupQuote.textContent = data.quote;
          popupCompanyLogo.src = data.companyLogo;

          // Apply filter if it exists
          if (data.companyLogoFilter) {
            popupCompanyLogo.style.filter = data.companyLogoFilter;
          } else {
            popupCompanyLogo.style.filter = "none"; // Reset filter if none
          }

          // Tampilkan pop-up
          testimonialPopup.classList.add("active");
          document.body.style.overflow = "hidden"; // Mencegah scroll pada body

          // PAUSE THE AUTOSLIDE WHEN POPUP IS ACTIVE
          if (testimonialsGrid) {
            testimonialsGrid.style.animationPlayState = "paused";
          }
        } else {
          console.error("Data testimoni tidak ditemukan untuk ID:", testimonialId);
        }
      }
    });
  });

  // Event listener untuk tombol tutup pop-up
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      testimonialPopup.classList.remove("active");
      document.body.style.overflow = ""; // Mengembalikan scroll pada body

      // RESUME THE AUTOSLIDE WHEN POPUP IS CLOSED
      if (testimonialsGrid) {
        // Hapus properti style inline 'animationPlayState'
        // Ini akan mengembalikan kontrol ke CSS, termasuk aturan :hover
        testimonialsGrid.style.removeProperty('animation-play-state');
      }
    });
  }

  // Event listener untuk menutup pop-up saat mengklik di luar area konten pop-up
  if (testimonialPopup) {
    testimonialPopup.addEventListener("click", function (e) {
      if (e.target === testimonialPopup) {
        testimonialPopup.classList.remove("active");
        document.body.style.overflow = "";

        // RESUME THE AUTOSLIDE WHEN POPUP IS CLOSED (by clicking outside)
        if (testimonialsGrid) {
          // Hapus properti style inline 'animationPlayState'
          // Ini akan mengembalikan kontrol ke CSS, termasuk aturan :hover
          testimonialsGrid.style.removeProperty('animation-play-state');
        }
      }
    });
  }
});
