import {
  addAndVerifyEventListener,
  verifyName,
  verifyEmail,
  verifyBirthDate,
  verifyIsNumber,
  handleSubmitVerification,
  resetErrorMessages,
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
  // Fix scrolling error, form and errors reset
  heroSection.style.overflow = "hidden";
  heroSection.style.position = "fixed";
  form.style.display = "block";
  thanksModal.style.display = "none";
  resetErrorMessages();
  form.reset();
  modalbg.style.display = "block";
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
  thanksModal.style.display = "flex";
  thanksModal.style.flexDirection = "column";

  const answers = document.querySelectorAll('.thanksMessage__list__element__answer');
  answers[0].textContent = formObject.firstName;
  answers[1].textContent = formObject.lastName;
  answers[2].textContent = formObject.email;
  answers[3].textContent = formObject.birthdate;
  answers[4].textContent = formObject.quantity;
  answers[5].textContent = formObject.location;
  answers[6].textContent = formObject.subscribe ?
    "Vous souhaitez être prévenu des prochain évènements" :
    "Vous ne souhaitez pas être prévenu des prochains évènements.";

}
