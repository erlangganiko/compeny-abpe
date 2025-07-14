window.addEventListener("scroll", function () {
  const nav = document.getElementById("main-nav");

  // Add sticky class after scrolling down 50px
  if (window.pageYOffset > 50) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});
// Menangani Navbar Sticky
window.addEventListener("scroll", function () {
  const nav = document.getElementById("main-nav");

  // Tambahkan class 'sticky' setelah scroll sejauh 50px
  if (window.pageYOffset > 50) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
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
