// Class CARD

export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;


  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardLike = this._element.querySelector('.card__like');
    // Добавим данные

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__text').textContent = this._name;

    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  }

  _handleDeleteIcone() {
    this._element.remove();
  }

  _handleLikeClick() {
    this._cardLike.classList.toggle('card__like_active');
  };


  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleDeleteIcone();
    });
  };
};
