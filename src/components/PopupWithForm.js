import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(element, handleFormSubmit, popupBtn, formValidator, getExistingValues) {
    super(element);
    this._handleFormSubmit = handleFormSubmit;
    this._popupBtn = popupBtn;
    this._formValidator = formValidator;
    this._getExistingValues = getExistingValues;
    this._form = this._element.querySelector('.pop-up__form');
    this._inputList = this._element.querySelectorAll('.pop-up__input');
  }

  _getInputValues() {
    // достаём все элементы полей
    // this._inputList = this._element.querySelectorAll('.pop-up__input');

    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;

    });
    return this._formValues;
  }

  setupExistingValues() {
    if (this._getExistingValues == undefined) return;

    const existingValues = this._getExistingValues();

    for (const [inputName, inputValue] of Object.entries(existingValues)) {
      const inputElement = this._element.querySelector(`input[name=${inputName}]`)
      inputElement.value = inputValue;
    }
  }

  setEventListeners() {
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    this._popupBtn.addEventListener('click', () => {
      this.open();
      this._formValidator.resetInputs();
      this.setupExistingValues();
      this._formValidator.resetValidation();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }

}