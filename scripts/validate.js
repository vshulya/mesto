const showInputError = (form, input, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
  input.classList.add(inputErrorClass);

}

const hideInputError = (form, input, errorClass, inputErrorClass) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);
}

const checkInputValidity = (form, input, { inputErrorClass, errorClass }) => {
  if (!input.validity.valid) {
    console.log('Invalid');
    showInputError(form, input, input.validationMessage, inputErrorClass, errorClass);
  } else {
    console.log('Valid');
    hideInputError(form, input, errorClass, inputErrorClass);
  };
};

const hasInvalidInput = (inputs) => {
  return Array.from(inputs).some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputs, button, inactiveButtonClass) => {
  console.log(hasInvalidInput(inputs));
  if (hasInvalidInput(inputs)) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  }
  else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
};

const setInputListeners = (form, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
  const inputs = form.querySelectorAll(inputSelector);
  const submitButton = form.querySelector(submitButtonSelector);
  toggleButtonState(inputs, submitButton, inactiveButtonClass);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, rest);
      toggleButtonState(inputs, submitButton, inactiveButtonClass);
    });
  });
};

const enableValidation = ({ formSelector, ...rest }) => {
  const forms = document.querySelectorAll(formSelector);
  forms.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setInputListeners(form, rest);
  });
};

enableValidation({
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_disabled',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__input-error_visible',
});
