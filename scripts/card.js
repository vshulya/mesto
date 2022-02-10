const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Class CARD
const photoModal = document.querySelector('.pop-up_place_fullsize-photo');
const closePhotoModalButton = photoModal.querySelector('.pop-up__close');
const fullSizePhoto = document.querySelector('.pop-up__fullsize-photo');
const fullSizePhotoTitle = document.querySelector('.pop-up__figcaption');

class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
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
    this._setEventListeners();

    // Добавим данные
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__text').textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  }


  _handleOpenPopup() {
    fullSizePhoto.src = this._link;
    fullSizePhoto.alt = this._name;
    fullSizePhotoTitle.textContent = this._name;
    photoModal.classList.add('pop-up_opened');
    document.addEventListener('keydown', this._closeByEscape.bind(this));
  }

  _handleClosePopup() {
    fullSizePhoto.src = '';
    photoModal.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', this._closeByEscape.bind(this));
  }

  _handleDeleteIcone() {
    this._element.remove();
  }

  _handleLikeClick() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  };


  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });

    closePhotoModalButton.addEventListener('click', () => {
      this._handleClosePopup();
    });

    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleDeleteIcone();
    });
  };

  _closeByEscape(evt) {
    if (evt.key === 'Escape') {
      this._handleClosePopup();
    };
  };

};



function renderCard(item) {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();
  document.querySelector('.cards-list').append(cardElement);
};


initialCards.forEach((item) => {
  renderCard(item);
});

export { initialCards, photoModal, closePhotoModalButton, fullSizePhoto, fullSizePhotoTitle, Card, renderCard };