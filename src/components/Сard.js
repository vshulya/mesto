// Class CARD

export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardDelete, handleLikeClick) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;

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
    this._likeCountElement = this._element.querySelector('.card__likes-number');

    // Добавим данные
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__text').textContent = this._name;

    this.setLikes(this._likes);

    if (this._ownerId !== this._userId) {
      this._element.querySelector('.card__delete-button').style.display = 'none';
    };


    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  }



  isLiked() {
    const userHasLikedCard = this._likes.find(user => user._id === this._userId);
    return userHasLikedCard;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._likeCountElement.textContent = this._likes.length;

    this._handleLikeIcon();

  };

  _handleLikeIcon() {
    if (this.isLiked()) {
      this._cardLike.classList.add('card__like_active');
    }
    else {
      this._cardLike.classList.remove('card__like_active');
    }

  };

  deleteCard() {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleCardDelete(this._id);
    });

    this._cardLike.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });
  };
};
