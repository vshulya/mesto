import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(element) {
    super(element);
    this._name = element.querySelector('.pop-up__fullsize-photo');
    this._link = element.querySelector('.pop-up__figcaption');
  }

  open(name, link) {
    this._name.textContent = name;
    this._link.img = link;
    this._link.alt = name;
    super.open();
  }
}