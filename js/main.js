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
      companyLogo: "assets/ABPE-Logo.webp",
      companyLogoFilter: "", // Kosongkan jika tidak ada filter
    },
    t2: {
      avatar: "https://i.pravatar.cc/150?u=nicholas",
      name: "Nicholas Threapleton",
      title: "Lead Product Analyst",
      quote: "Buying Avo was possibly the most impactful decision I've made. I don't know how product companies do any analytics without Avo. It's become the foundation of our analytics.",
      companyLogo: "assets/ABPE-Logo.webp",
      companyLogoFilter: "invert(1)",
    },
    t3: {
      avatar: "https://i.pravatar.cc/150?u=tomi",
      name: "Tomi Keah",
      title: "Senior Data Analyst",
      quote: "The best data governance platform for your analytics events. Overall I'm very happy with the product and our data quality improves on a daily basis.",
      companyLogo: "assets/ABPE-Logo.webp",
      companyLogoFilter: "",
    },
  };

  /**
   * Mengatur fungsionalitas loading screen.
   * Loading screen akan hilang setelah beberapa detik dan menampilkan konten utama.
   */
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  // ...
if (loadingScreen && mainContent) {
    // Atur waktu tampil loading screen (misal: 2 detik)
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      // Tampilkan konten utama dengan efek fade-in sederhana
      mainContent.style.display = "block";
      mainContent.style.animation = "fadeIn 0.5s ease-in-out";

      // TAMBAHKAN BARIS INI: Perintahkan AOS untuk memeriksa ulang posisi elemen
      AOS.refresh(); 
      
    }, 1000); // 2000 milidetik = 2 detik
}
// ...

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
      const testimonialId = card.dataset.testimonialId;
      const data = testimonialData[testimonialId];

      // Tambahkan baris kode ini untuk menutup menu navigasi
      const navLinks = document.querySelector(".nav-links");
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }

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
          popupCompanyLogo.style.filter = "none";
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
  
  // --- Auto-scroll dan grab untuk artikel ---
const sliderContainer = document.querySelector('.artikel-slider-container');
if (sliderContainer) {
    let isDragging = false;
    let startX;
    let scrollLeft;
    let autoSlideInterval;
    const slideSpeed = 3000; // Interval auto-slide dalam milidetik

    // Fungsi untuk memulai auto-slide
    function startAutoSlide() {
        stopAutoSlide(); // Pastikan tidak ada interval ganda
        autoSlideInterval = setInterval(() => {
            const slideDistance = sliderContainer.clientWidth;
            let newScroll = sliderContainer.scrollLeft + sliderContainer.clientWidth;

            if (newScroll >= sliderContainer.scrollWidth - sliderContainer.clientWidth) {
                newScroll = 0;
            }

            sliderContainer.scrollTo({
                left: newScroll,
                behavior: 'smooth'
            });
        }, slideSpeed);
    }

    // Fungsi untuk menghentikan auto-slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // --- Event Listener untuk Desktop (Mouse) ---
    sliderContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        stopAutoSlide();
        sliderContainer.classList.add('is-dragging');
        startX = e.pageX - sliderContainer.offsetLeft;
        scrollLeft = sliderContainer.scrollLeft;
    });

    sliderContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        sliderContainer.classList.remove('is-dragging');
    });

    sliderContainer.addEventListener('mouseup', () => {
        isDragging = false;
        sliderContainer.classList.remove('is-dragging');
        startAutoSlide();
    });

    sliderContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - sliderContainer.offsetLeft;
        const walk = (x - startX) * 2;
        sliderContainer.scrollLeft = scrollLeft - walk;
    });

    // --- Event Listener untuk Mobile (Touch) ---
    sliderContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        stopAutoSlide();
        startX = e.touches[0].pageX - sliderContainer.offsetLeft;
        scrollLeft = sliderContainer.scrollLeft;
    });

    sliderContainer.addEventListener('touchend', () => {
        isDragging = false;
        startAutoSlide();
    });

    sliderContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - sliderContainer.offsetLeft;
        const walk = (x - startX) * 2;
        sliderContainer.scrollLeft = scrollLeft - walk;
    });

    // Mulai auto-slide saat halaman pertama kali dimuat
    startAutoSlide();
}
  // --- Kode untuk Floating WhatsApp dan Bubble Chat ---

  const bubbleTextElement = document.getElementById('bubble-text');
    const whatsappBtnLink = document.getElementById('whatsapp-btn-link');
    const bubbleChatLink = document.getElementById('whatsapp-bubble-chat-link');

    // === Simpan nomor WhatsApp dan pesan-pesan yang berbeda di sini ===
    const whatsappNumber = '6281234567890'; // Ganti dengan nomor WhatsApp Anda
    
    // Pesan default saat klik tombol WhatsApp utama
    const defaultWhatsappMessage = 'Halo, saya ingin bertanya tentang layanan yang tersedia.';
    
    // Array objek untuk bubble chat, setiap objek memiliki teks tampilan dan pesan WhatsApp yang unik
    const rotatingBubbles = [
        {
            displayText: "Tertarik jadi Mitra kami? Tanya-tanya dulu aja!",
            whatsappMessage: "Halo, saya tertarik menjadi Mitra. Mohon info lebih lanjut."
        },
        {
            displayText: "Butuh jasa profesional? Kami siap bantu!",
            whatsappMessage: "Halo, saya sedang mencari jasa profesional. Tolong berikan rekomendasi."
        },
        {
            displayText: "Konsultasi gratis untuk bisnismu, yuk!",
            whatsappMessage: "Halo, saya ingin konsultasi gratis mengenai bisnis saya."
        },
        {
            displayText: "Punya pertanyaan? Langsung chat kami saja!",
            whatsappMessage: "Halo, saya punya beberapa pertanyaan tentang layanan Anda."
        },
        {
            displayText: "Dapatkan penawaran terbaik khusus untuk Anda!",
            whatsappMessage: "Halo, saya ingin tahu tentang penawaran terbaik yang sedang berlaku."
        },
        {
            displayText: "Klik di sini untuk info layanan lengkap!",
            whatsappMessage: "Halo, tolong kirimkan saya informasi layanan yang lengkap."
        },
    ];

    let currentMessageIndex = 0;
    let rotationInterval;

    // Setel atribut href pada tombol WhatsApp utama
    if (whatsappBtnLink) {
        whatsappBtnLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultWhatsappMessage)}`;
    }
    
    // Fungsi untuk mengganti teks bubble chat dan memperbarui tautannya
    function changeBubbleTextAndLink() {
        const currentBubble = rotatingBubbles[currentMessageIndex];
        
        // Perbarui teks yang terlihat
        bubbleTextElement.textContent = currentBubble.displayText;
        
        // Perbarui tautan WhatsApp dengan pesan yang spesifik
        bubbleChatLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(currentBubble.whatsappMessage)}`;
        
        currentMessageIndex = (currentMessageIndex + 1) % rotatingBubbles.length;
    }

    // Fungsi untuk memulai rotasi teks
    function startRotation() {
        // Ganti teks pertama kali tanpa delay
        changeBubbleTextAndLink();
        // Kemudian ganti setiap 5 detik
        rotationInterval = setInterval(changeBubbleTextAndLink, 5000); 
    }

    // Fungsi untuk menghentikan rotasi teks (tidak lagi diperlukan untuk interaksi klik)
    function stopRotation() {
        clearInterval(rotationInterval);
    }
    
    // Mulai rotasi saat halaman dimuat
    if (bubbleChatLink) {
        startRotation();
    }
    
// card icon 
const partnerCards = document.querySelectorAll(".partners-grid .partner-card");

partnerCards.forEach((card) => {
  if (card.dataset.title) {
    // Simpan informasi asli
    card.dataset.originalHtml = card.innerHTML;
    card.dataset.originalClasses = card.className;
    const originalLink = card.querySelector('a')?.href;
    if (originalLink) {
        card.dataset.originalLink = originalLink;
    }

    card.addEventListener("click", function (event) {
      const currentCard = event.currentTarget;
      const target = event.target;
      const isShowingImage = currentCard.querySelector("img") !== null;

      // Jika kartu sedang dalam transisi, abaikan klik
      if (currentCard.classList.contains('is-fading')) return;
      
      if (isShowingImage) {
        // --- AKSI SAAT LOGO DIKLIK ---
        // Karena kita ingin mengubah kartu, kita cegah link asli terbuka.
        event.preventDefault();
        event.stopPropagation();
        
        currentCard.classList.add('is-fading');
        setTimeout(() => {
          const title = currentCard.dataset.title;
          const description = currentCard.dataset.description;
          const link = currentCard.dataset.originalLink || '#';
          const newHtml = `<h3><a href="${link}" target="_blank">${title}</a></h3><p>${description}</p>`;
          
          currentCard.innerHTML = newHtml;
          currentCard.className = card.dataset.originalClasses;
          currentCard.classList.remove("bg-light");
          currentCard.classList.add("bg-orange");
          
          currentCard.classList.remove('is-fading');
        }, 300);

      } else {
        // --- AKSI SAAT TEKS DIKLIK ---
      
        if (target.tagName === 'P') {
          event.preventDefault();
          event.stopPropagation();

          currentCard.classList.add('is-fading');
          setTimeout(() => {
             currentCard.innerHTML = card.dataset.originalHtml;
             currentCard.className = card.dataset.originalClasses;
             currentCard.classList.remove('is-fading');
           }, 300);
        }
        
      }
    });
  }
});

});
