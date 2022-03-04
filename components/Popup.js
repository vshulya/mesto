export default class Popup {
  constructor(element) {
    this._element = element;
  }

  open() {
    this._element.classList.add('pop-up_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._element.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners() {
    this._element.querySelector('.pop-up__close').addEventListener('click', () => {
      this.close();
    });

    //close modal on overlay
    this._element.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('pop-up_opened')) {
        this.close();
      }
    });
  };
};
