import {
  addAndVerifyEventListener,
  resetModal,
  formatDate,
  handleSubmitVerification
} from "./formManager.js";

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const heroSection = document.querySelector(".hero-section");

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const menuBtn = document.querySelector(".icon")

const form = document.querySelector("form")
const formData = document.querySelectorAll(".formData");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const radiosFormData = formData[5];
const conditionsCheckbox = document.getElementById("checkbox1");
const subscribeCheckbox = document.getElementById("checkbox2");

//Events

//Manage responsive menu
menuBtn.addEventListener("click", () => {
  editNav();
});

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeModalBtn.addEventListener("click", closeModal);


// Inputs event
for (let i = 0; i < formData.length; i++) {
  // Add event listener on the first input of each element
  (i < 5 || i === 6) && addAndVerifyEventListener(formData[i].querySelector("input"));
  // Add an event liste,er on each input of this element
  i === 5 && formData[i].querySelectorAll("input").forEach(input => addAndVerifyEventListener(input));
}

//submit event
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let formObject = {};

  try {
    //Verifications and form object setting
    handleSubmitVerification(firstName);
    formObject.firstName = firstName.value;

    handleSubmitVerification(lastName);
    formObject.lastName = lastName.value;

    handleSubmitVerification(email);
    formObject.email = email.value;

    handleSubmitVerification(birthdate);
    formObject.birthdate = birthdate.value;

    handleSubmitVerification(quantity);
    formObject.quantity = quantity.value;

    handleSubmitVerification(conditionsCheckbox);

    handleSubmitVerification(radiosFormData);
    formObject.location = document.querySelector('input[name="location"]:checked').value;

    //Subscribe
    formObject.subscribe = subscribeCheckbox.checked;
    thanksMessage(formObject);
  } catch {
  }
});

//Functions

/**
 * Launch modal
 */
function launchModal() {
  modalbg.style.display = "block";
  // Fix scrolling error, form and errors reset
  heroSection.style.overflow = "hidden";
  heroSection.style.position = "fixed";
  resetModal();
}

/**
 * Close modal
 */
function closeModal() {
  modalbg.style.display = "none";
  // Fix scrolling error
  heroSection.style.overflow = "auto";
  heroSection.style.position = "inherit";
}

/**
 * Launch thanks message
 */
function thanksMessage(data) {
  // Form closing
  form.style.display = "none";

  // Add thanks message
  const message = `<div class="thanksMessage">
    <p class="thanksMessage__title">Merci! Votre réservation bien a été reçue. </p>
    <ul class="thanksMessage__list">
      <li class="thanksMessage__list__element">
        <span>Prénom:</span>
        <span class="thanksMessage__list__element__answer">${data.firstName} </span>
      </li>
      <li class="thanksMessage__list__element">
        <span>Nom:</span>
        <span class="thanksMessage__list__element__answer">${data.lastName}</span>
      </li>
      <li class="thanksMessage__list__element">
        <span>E-mail:</span>
        <span class="thanksMessage__list__element__answer">${data.email} </span>
      </li>
      <li class="thanksMessage__list__element">
        <span>Date de naissance:</span>
        <span class="thanksMessage__list__element__answer">${formatDate(data.birthdate)}</span>
      </li>
      <li class="thanksMessage__list__element">
        <span>Nombre de tournois GameOn:</span>
        <span class="thanksMessage__list__element__answer">${data.quantity}</span>
      </li>
      <li class="thanksMessage__list__element">
        <span>Tournoi choisi:</span>
        <span class="thanksMessage__list__element__answer">${data.location}</span>
      </li>
      <li class="thanksMessage__list__element thanksMessage__list__element__answer">${data.subscribe ?
      "Vous souhaitez être prévenu des prochains évènements" :
      "Vous ne souhaitez pas être prévenu des prochains évènements"}</li>
    </ul>
  </div>`
  document.querySelector(".modal-body").innerHTML += message;
}