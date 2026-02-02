//Toggle active
const navbarNav = document.querySelector(".navbar-nav");
const searchForm = document.querySelector(".search-form");

//Seacrh langsung bisa ketik
const searchBox = document.querySelector(".search-box");

//ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = (e) => {
  e.preventDefault();
  navbarNav.classList.toggle("active");
};

//ketika seacrh di klik
document.querySelector("#search").onclick = (e) => {
  e.preventDefault();
  searchForm.classList.toggle("active");
  searchBox.focus();
};

//klik di luar element
const hamburgerOut = document.querySelector("#hamburger-menu");
const seacrhOut = document.querySelector("#search");

document.addEventListener("click", function (e) {
  if (!hamburgerOut.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!seacrhOut.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});
