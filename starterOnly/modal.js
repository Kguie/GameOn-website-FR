import {
  addAndVerifyEventListener,
  verifyName,
  verifyEmail,
  verifyBirthDate,
  verifyIsNumber,
  handleSubmitVerification,
  resetModal,
  verifyIsLocationChecked,
  verifyIsChecked,
  formatDate,
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
const conditionsCheckbox = document.getElementById("checkbox1");
const subscribeCheckbox = document.getElementById("checkbox2");
const thanksModal = document.querySelector(".thanksMessage");

//Events

//Launch responsive menu
menuBtn.addEventListener("click", () => {
  editNav();
});

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event
closeModalBtn.addEventListener("click", closeModal);

// Inputs event
for (let i = 0; i < formData.length; i++) {
  //Name inputs event
  i < 2 && addAndVerifyEventListener(formData[i], verifyName, "change");

  //Email input event
  i === 2 && addAndVerifyEventListener(formData[i], verifyEmail, "change");

  //Birthdate input event
  i === 3 && addAndVerifyEventListener(formData[i], verifyBirthDate, "change");

  //Tournaments quantity event
  i === 4 && addAndVerifyEventListener(formData[i], verifyIsNumber, "input");

  // Location choice
  i === 5 && formData[i].querySelector(".errorMessage") &&
    formData[i].removeChild(formData[i].querySelector(".errorMessage"));

  // Conditions checkbox
  i === 6 && (formData[i].querySelector("#checkbox1")).addEventListener("click", (e) => {
    if (e.target.checked && formData[6].querySelector(".errorMessage")) {
      formData[6].removeChild(formData[6].querySelector(".errorMessage"));
    }
  });
}

//submit event
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let formObject = {};
  try {
    //Verifications and form object setting
    handleSubmitVerification(firstName.parentNode, firstName.value, verifyName);
    formObject.firstName = firstName.value;

    handleSubmitVerification(lastName.parentElement, lastName.value, verifyName);
    formObject.lastName = lastName.value;

    handleSubmitVerification(email.parentElement, email.value, verifyEmail);
    formObject.email = email.value;

    handleSubmitVerification(birthdate.parentElement, birthdate.value, verifyBirthDate);

    formObject.birthdate = birthdate.value;

    handleSubmitVerification(quantity.parentElement, quantity.value, verifyIsNumber);
    formObject.quantity = quantity.value;

    const selectedRadioButton = document.querySelector('input[name="location"]:checked');
    handleSubmitVerification(formData[5], selectedRadioButton, verifyIsLocationChecked);
    formObject.location = selectedRadioButton.value;

    handleSubmitVerification(conditionsCheckbox.parentElement, conditionsCheckbox.checked, verifyIsChecked);

    //Subscribe
    if (subscribeCheckbox.checked) {
      formObject.subscribe = true
    } else {
      formObject.subscribe = false
    }
    thanksMessage(formObject);
  } catch (error) {
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
function thanksMessage(formObject) {
  form.style.display = "none";
  const message = `<div class="thanksMessage">
   <p class="thanksMessage__title">Merci! Votre réservation bien a été reçue. </p>
   <ul class="thanksMessage__list">
     <li class="thanksMessage__list__element">
       <span>Prénom:</span>
       <span class="thanksMessage__list__element__answer">${formObject.firstName} </span>
     </li>
     <li class="thanksMessage__list__element">
       <span>Nom:</span>
       <span class="thanksMessage__list__element__answer">${formObject.lastName}</span>
     </li>
     <li class="thanksMessage__list__element">
       <span>E-mail:</span>
       <span class="thanksMessage__list__element__answer">${formObject.email} </span>
     </li>
     <li class="thanksMessage__list__element">
       <span>Date de naissance:</span>
       <span class="thanksMessage__list__element__answer">${formObject.birthdate}</span>
     </li>
     <li class="thanksMessage__list__element">
       <span>Nombre de tournois GameOn:</span>
       <span class="thanksMessage__list__element__answer">${formObject.quantity}</span>
     </li>
     <li class="thanksMessage__list__element">
       <span>Tournoi choisi:</span>
       <span class="thanksMessage__list__element__answer">${formObject.location}</span>
     </li>
     <li class="thanksMessage__list__element thanksMessage__list__element__answer">${formObject.subscribe ?
      "Vous souhaitez être prévenu des prochains évènements" :
      "Vous ne souhaitez pas être prévenu des prochains évènements"}</li>
   </ul>
 </div>`

  document.querySelector(".modal-body").innerHTML += message;

}
