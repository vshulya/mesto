//TODO how to add an object in constructor
class FormValidator {
  constructor(data, formElement) {

    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButton;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;

    this._formElement = formElement;


  };

  _showInputError = (input, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    input.classList.add(this._inputErrorClass);

  }

  _hideInputError = (input) => {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity = (input) => {
    if (!input.validity.valid) {
      console.log('Invalid');
      this._showInputError(input, input.validationMessage);
    } else {
      console.log('Valid');
      this._hideInputError(input);
    };
  };

  _hasInvalidInput = (inputs) => {
    return Array.from(inputs).some((input) => {
      return !input.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(inputs)) {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    }
    else {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    }
  };

  _setListeners() {
    const inputs = this._formElement.querySelectorAll(this._inputSelector);
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputs, submitButton);
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        _checkInputValidity(input);
        _toggleButtonState(inputs, submitButton);
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setListeners();
  };
};

export { FormValidator };



// const showInputError = (form, input, errorMessage, inputErrorClass, errorClass) => {
//   const errorElement = form.querySelector(`#${input.id}-error`);
//   errorElement.classList.add(errorClass);
//   errorElement.textContent = errorMessage;
//   input.classList.add(inputErrorClass);

// }

// const hideInputError = (form, input, errorClass, inputErrorClass) => {
//   const errorElement = form.querySelector(`#${input.id}-error`);
//   errorElement.textContent = '';
//   errorElement.classList.remove(errorClass);
//   input.classList.remove(inputErrorClass);
// }

// const checkInputValidity = (form, input, { inputErrorClass, errorClass }) => {
//   if (!input.validity.valid) {
//     console.log('Invalid');
//     showInputError(form, input, input.validationMessage, inputErrorClass, errorClass);
//   } else {
//     console.log('Valid');
//     hideInputError(form, input, errorClass, inputErrorClass);
//   };
// };

// const hasInvalidInput = (inputs) => {
//   return Array.from(inputs).some((input) => {
//     return !input.validity.valid;
//   });
// };

// const toggleButtonState = (inputs, button, inactiveButtonClass) => {
//   console.log(hasInvalidInput(inputs));
//   if (hasInvalidInput(inputs)) {
//     button.classList.add(inactiveButtonClass);
//     button.disabled = true;
//   }
//   else {
//     button.classList.remove(inactiveButtonClass);
//     button.disabled = false;
//   }
// };

// const setListeners = (form, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
//   const inputs = form.querySelectorAll(inputSelector);
//   const submitButton = form.querySelector(submitButtonSelector);
//   toggleButtonState(inputs, submitButton, inactiveButtonClass);
//   inputs.forEach((input) => {
//     input.addEventListener('input', () => {
//       checkInputValidity(form, input, rest);
//       toggleButtonState(inputs, submitButton, inactiveButtonClass);
//     });
//   });
// };

// const enableValidation = ({ formSelector, ...rest }) => {
//   const forms = document.querySelectorAll(formSelector);
//   forms.forEach((form) => {
//     form.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//     setListeners(form, rest);
//   });
// };



// enableValidation({
//   formSelector: '.pop-up__form',
//   inputSelector: '.pop-up__input',
//   submitButtonSelector: '.pop-up__button',
//   inactiveButtonClass: 'pop-up__button_disabled',
//   inputErrorClass: 'pop-up__input_type_error',
//   errorClass: 'pop-up__input-error_visible',
// });
