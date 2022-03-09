import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(element) {
    super(element);
    this._img = element.querySelector('.pop-up__fullsize-photo');
    this._caption = element.querySelector('.pop-up__figcaption');
  }

  open(name, link) {
    this._caption.textContent = name;
    this._img.src = link;
    this._img.alt = name;
    super.open();
  }
}