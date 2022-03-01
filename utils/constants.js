export const initialCards = [
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

export const selectors = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_disabled',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__input-error_visible',
}

//cards
export const cardListSection = '.cards-list';
export const cardList = document.querySelector('.cards-list');


//modal
export const editModal = document.querySelector('.pop-up_place_title');
export const cardModal = document.querySelector('.pop-up_place_card');
export const photoModal = document.querySelector('.pop-up_place_fullsize-photo');

//button
export const openEditModalButton = document.querySelector('.profile__edit-button');
export const closeEditModalButton = editModal.querySelector('.pop-up__close');
export const openCardModalButton = document.querySelector('.profile__add-button');
export const closeCardModalButton = cardModal.querySelector('.pop-up__close');
export const closePhotoModalButton = photoModal.querySelector('.pop-up__close');


//input
export const nameInput = document.querySelector('.pop-up__input_type_name');
export const jobInput = document.querySelector('.pop-up__input_type_job');
export const placeInput = document.querySelector('.pop-up__input_type_place');
export const linkInput = document.querySelector('.pop-up__input_type_link');

//editModal
export const profileName = document.querySelector('.profile__name');
export const profileText = document.querySelector('.profile__text');

export const formElementEdit = editModal.querySelector('.pop-up__form');
export const formElementAddCard = cardModal.querySelector('.pop-up__form');