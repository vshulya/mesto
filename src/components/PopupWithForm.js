import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(element, handleFormSubmit) {
    super(element);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._element.querySelector('.pop-up__form');
    this._inputList = this._element.querySelectorAll('.pop-up__input');
    this._submitButton = this._element.querySelector('.pop-up__button');
  }

  _getInputValues() {
    // достаём все элементы полей

    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;

    });
    return this._formValues;
  }

  changeSubmitHandler(newSubmitHandler) {
    this._handleFormSubmit = newSubmitHandler;
  };

  _isLoading() {
    this._buttonTextBackup = this._submitButton.textContent;
    this._submitButton.textContent = 'Сохранение...';
  }

  _hideLoading() {
    this._submitButton.textContent = this._buttonTextBackup;
  }


  setEventListeners() {
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._isLoading();
      this._handleFormSubmit(this._getInputValues());

    });

    super.setEventListeners();
  }

  close() {
    super.close();
    this._hideLoading();
  }
}