/**
 * Displays the error message in DOM element
 */
export function displayErrorMessage(element, error) {
  const errorElement = element.querySelector(".errorMessage");
  if (!errorElement) {
    const messageElement = document.createElement("p");
    messageElement.textContent = error.message;
    messageElement.classList.add("errorMessage");
    element.appendChild(messageElement);
    // Red border add
    const input = element.querySelector("input");
    const conditionsCheckbox = document.querySelectorAll(".checkbox-icon")[6];
    if (input.id) {
      if (input.id === "checkbox1") {
        conditionsCheckbox.style.border = "2px solid #fe142f";
      } else {
        input.style.border = "2px solid #fe142f";
      }
    }
  }
  element.scrollIntoView({ behavior: "smooth" });
}

/**
 * Handle change Verification
 */
export function addAndVerifyEventListener(element) {
  const eventType = element.id === "quantity" ? "input" : "change";
  element.addEventListener(eventType, (e) => {
    const errorElement = e.target.parentElement.querySelector(".errorMessage");
    try {
      switch (element.id) {
        case "first":
          verifyName(e.target);
          break;
        case "last":
          verifyName(e.target);
          break;
        case "email":
          verifyEmail(e.target);
          break;
        case "birthdate":
          verifyBirthDate(e.target);
          break;
        case "quantity":
          verifyIsNumber(e.target);
          break;
        case "checkbox1":
          verifyIsChecked(e.target);
          break;
        default:
          break;
      }
      // Erase error message
      if (errorElement) {
        e.target.parentElement.removeChild(errorElement);
        if (e.target.id === "checkbox1") {
          const conditionsCheckbox =
            document.querySelectorAll(".checkbox-icon")[6];
          conditionsCheckbox.style.border = "none";
        } else {
          e.target.style.border = "none";
        }
      }
    } catch (error) {
      displayErrorMessage(e.target.parentElement, error);
    }
  });
}

/**
 * Handle element verification before submit
 */
export function handleSubmitVerification(element) {
  const errorElement = element.parentElement.querySelector(".errorMessage");
  try {
    switch (element.id) {
      case "first":
        verifyName(element);
        break;
      case "last":
        verifyName(element);
        break;
      case "email":
        verifyEmail(element);
        break;
      case "birthdate":
        verifyBirthDate(element);
        break;
      case "quantity":
        verifyIsNumber(element);
        break;
      case "checkbox1":
        verifyIsChecked(element);
        break;
      default:
        verifyIsLocationChecked(element);
        break;
    }
    // Erase error message and red color
    if (errorElement) {
      element.parentElement.removeChild(errorElement);
      if (element.id === "checkbox1") {
        const conditionsCheckbox =
          document.querySelectorAll(".checkbox-icon")[6];
        conditionsCheckbox.style.border = "none";
      } else {
        element.style.border = "none";
      }
    }
  } catch (error) {
    //Radios formData
    if (!element.id) {
      displayErrorMessage(element, error);
    } else {
      displayErrorMessage(element.parentElement, error);
    }
    throw new Error();
  }
}

/**
 * Remove all error and thanks message before modal close
 */
export function resetModal() {
  const errors = document.querySelectorAll(".errorMessage");
  const thanksMessage = document.querySelector(".thanksMessage");
  const form = document.querySelector("form");

  //Remove error messages
  if (errors.length > 0) {
    errors.forEach((message) => {
      message.parentElement.removeChild(message);
    });
  }

  //Remove thanks message and turn on the form
  if (thanksMessage) {
    thanksMessage.parentElement.removeChild(thanksMessage);
    form.style.display = "block";
  }
  form.reset();
}

/**
 * Format american date to french date
 */
export function formatDate(date) {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);

  return `${day}/${month}/${year}`;
}

// Form verification functions

/**
 * Verify the form name inputs
 */
export function verifyName(element) {
  const nameType = element.id === "first" ? "prénom" : "nom";
  if (element.value.trim().length < 2) {
    throw new Error(
      `Veuillez entrer 2 caractères ou plus pour le champ du ${nameType}.`
    );
  }
}

/***
 * Verify email
 */
export function verifyEmail(element) {
  // Email regex
  const emailRegex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+/gi;
  const emailTest = emailRegex.test(element.value.trim());
  if (!emailTest) {
    throw new Error("Veuillez entrer une adresse e-mail valide.");
  }
}

/***
 * Verify birthDate
 */
export function verifyBirthDate(element) {
  // birthDate regex
  const birthDateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/gi;
  const birthDateTest = birthDateRegex.test(element.value.trim());
  const errorMessage = "Veuillez entrer une date de naissance valide";
  // Birth year test
  const birthYear = element.value.trim().slice(0, 4);
  const today = new Date();
  if (birthYear < 1900 || birthYear > today.getFullYear() || !birthDateTest) {
    throw new Error(errorMessage);
  }
}

/***
 * Verify if the argument is a number
 */
export function verifyIsNumber(element) {
  const quantity = parseInt(element.value);
  // isNumber regex
  const isNumberRegex = /^[0-9]+$/g;
  const isNumberTest = isNumberRegex.test(quantity);
  if (!isNumberTest) {
    throw new Error("Veuillez saisir un nombre");
  }
}

/**
 * Verify if one the radio option is checked during the submit and handle error message
 */
export function verifyIsLocationChecked(formData) {
  const elementArray = Array.from(formData.querySelectorAll("input"));
  const errorElement = formData.querySelector(".errorMessage");
  const elementChoosen = elementArray.find((element) => element.checked);
  if (!elementChoosen) {
    throw new Error("Vous devez choisir une option.");
  } else {
    // Erase error message
    if (errorElement) {
      formData.removeChild(errorElement);
    }
  }
}

/**
 * Verify if the conditions checkbox is checked
 */
export function verifyIsChecked(element) {
  if (!element.checked) {
    throw new Error(
      "Veuillez confirmer que vous avez lu et accepté les conditions d'utilisation."
    );
  }
}
