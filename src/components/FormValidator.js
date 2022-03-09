export default class FormValidator {
  constructor(data, formElement) {

    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;

    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);
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

  resetInputs = () => {
    this._inputList.forEach(input => {
      this._hideInputError(input);
    });
  };


  _checkInputValidity = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    };
  };

  _hasInvalidInput = () => {
    return Array.from(this._inputList).some((input) => {
      return !input.validity.valid;
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    }
    else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  };

  resetValidation() {
    this._toggleButtonState(); //управляем кнопкой
    this._inputList.forEach(input => {
      this._hideInputError(input) //очищаем ошибки
    });
  };

  _setListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
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




