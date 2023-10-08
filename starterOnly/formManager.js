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
    }
    element.scrollIntoView({ behavior: 'smooth' });;
}

/**
 * Handle change Verification
 */
export function addAndVerifyEventListener(element, verificationFunction, eventType) {
    element.addEventListener(eventType, (e) => {
        const errorElement = element.querySelector(".errorMessage");
        try {
            verificationFunction(e.target.value);
            if (errorElement) {
                element.removeChild(errorElement);
            }
        } catch (error) {
            displayErrorMessage(element, error);
        }
    });
}

/**
 * Handle element verification before submit
 */
export function handleSubmitVerification(element, value, verificationFunction) {
    const errorElement = element.querySelector(".errorMessage");
    try {
        verificationFunction(value);
        if (errorElement) {
            element.removeChild(errorElement);
        }
    } catch (error) {
        displayErrorMessage(element, error);
        throw new Error();
    }
}

/**
 * Remove all error messages before modal close
 */
export function resetErrorMessages() {
    const errors = document.querySelectorAll(".errorMessage");
    if (errors.length > 0) {
        errors.forEach((message) => {
            message.parentElement.removeChild(message);
        })
    }
}

/**
 * Format american date to french date
 */
export function formatDate(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    return `${day}/${month}/${year}`
}

// Form verification functions

/**
 * Verify the form name inputs
 */
export function verifyName(name) {
    if ((name.trim()).length < 2) {
        throw new Error("Veuillez entrer 2 caractères ou plus pour les champs du nom.");
    }
}

/***
 * Verify email 
 */
export function verifyEmail(email) {
    // Email regex
    const emailRegex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+/gi;
    const emailTest = emailRegex.test(email.trim());
    if (!emailTest) {
        throw new Error("Veuillez entrer une adresse e-mail valide.")
    }
}

/***
 * Verify birthDate 
 */
export function verifyBirthDate(birthDate) {
    // birthDate regex
    const birthDateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/gi;
    const birthDateTest = birthDateRegex.test(birthDate.trim());
    const errorMessage = "Veuillez entrer une date de naissance valide";
    if (!birthDateTest) {
        throw new Error(errorMessage);
    }
    // Birth year test
    const birthYear = birthDate.trim().slice(0, 4);
    const today = new Date();
    if (birthYear < 1900 || birthYear > today.getFullYear()) {
        throw new Error(errorMessage);
    }
}

/***
 * Verify if the argument is a number
 */
export function verifyIsNumber(number) {
    const quantity = parseInt(number)
    // isNumber regex
    const isNumberRegex = /^[0-9]+$/g;
    const isNumberTest = isNumberRegex.test(quantity);
    if (!isNumberTest) {
        throw new Error("Veuillez saisir un nombre");
    }
}

/**
 * Verify if one the radio option is checked 
 */
export function verifyIsLocationChecked(radio) {
    if (!radio) {
        throw new Error("Vous devez choisir une option.");
    }
}

/**
 * Verify if the conditions checkbox is checked
 */
export function verifyIsChecked(value) {
    if (!value) {
        throw new Error("Veuillez confirmer que vous avez lu et accepté les conditions d'utilisation.");
    }
}

