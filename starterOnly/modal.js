function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn= document.querySelector(".close");
const heroSection= document.querySelector(".hero-section");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  // Fix scrolling error for mobile size screens
  heroSection.style.overflow="hidden";
  heroSection.style.position="fixed";
}

// close modal event
closeModalBtn.addEventListener("click", closeModal);

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
  // Fix scrolling error for mobile size screens
  heroSection.style.overflow="auto";
  heroSection.style.position="static";
}

