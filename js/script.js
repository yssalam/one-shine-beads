//Toggle active
const navbarNav = document.querySelector(".navbar-nav");
const searchForm = document.querySelector(".search-form");
const cartForm = document.querySelector(".shopping-cart");


//Seacrh langsung bisa ketik
const searchBox = document.querySelector("#search-box");

//ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = (e) => {
  e.preventDefault();
  navbarNav.classList.toggle("active");
};

//ketika cart di klik
document.querySelector("#shopping-cart").onclick = (e) => {
  e.preventDefault();
  cartForm.classList.toggle("active");
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
const cartOut = document.querySelector("#shopping-cart");

document.addEventListener("click", function (e) {
  if (!hamburgerOut.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!seacrhOut.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  if (!cartOut.contains(e.target) && !cartForm.contains(e.target)) {
    cartForm.classList.remove("active");
  }
});
