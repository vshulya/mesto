export class FormValidator {
  constructor(data, formElement) {

    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;

    this._formElement = formElement;
  };

  //TODO where to execute 
  addInputReset = () => {
    const inputs = this._formElement.querySelectorAll('.pop-up__input');
    inputs.forEach(input => {
      const error = this._formElement.querySelector(`#${input.id}-error`);
      error.classList.remove('pop-up__input-error_visible');
      error.textContent = '';
      input.classList.remove('pop-up__input_type_error');
    });
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
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    };
  };

  _hasInvalidInput = (inputs) => {
    return Array.from(inputs).some((input) => {
      return !input.validity.valid;
    });
  };

  _toggleButtonState = (inputs, button) => {
    if (this._hasInvalidInput(inputs)) {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    }
    else {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    }
  };

  _setListeners = () => {
    const inputs = this._formElement.querySelectorAll(this._inputSelector);
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputs, submitButton);
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputs, submitButton);
      });
    });
  };

  enableValidation = () => {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setListeners();
  };
};



