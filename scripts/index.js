import { Card } from './Сard.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, selectors } from './constants.js';

//modal
const editModal = document.querySelector('.pop-up_place_title');
const cardModal = document.querySelector('.pop-up_place_card');
const photoModal = document.querySelector('.pop-up_place_fullsize-photo');

//button
const openEditModalButton = document.querySelector('.profile__edit-button');
const closeEditModalButton = editModal.querySelector('.pop-up__close');
const openCardModalButton = document.querySelector('.profile__add-button');
const closeCardModalButton = cardModal.querySelector('.pop-up__close');
const closePhotoModalButton = photoModal.querySelector('.pop-up__close');


//input
const nameInput = document.querySelector('.pop-up__input_type_name');
const jobInput = document.querySelector('.pop-up__input_type_job');
const placeInput = document.querySelector('.pop-up__input_type_place');
const linkInput = document.querySelector('.pop-up__input_type_link');

//validation 
const editFormValidator = new FormValidator(selectors, editModal);
const addCardFormValidator = new FormValidator(selectors, cardModal);

//function openModal
export function openModal(modal) {
  modal.classList.add('pop-up_opened');
  document.addEventListener('keydown', closeByEscape);
};

//function closeModal
function closeModal(modal) {
  modal.classList.remove('pop-up_opened');
  document.removeEventListener('keydown', closeByEscape);
};


//editModal
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

openEditModalButton.addEventListener('click', function () {
  openModal(editModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  editFormValidator.addInputReset();
});

closeEditModalButton.addEventListener('click', () => {
  closeModal(editModal);
});


const formElementEdit = editModal.querySelector('.pop-up__form');

formElementEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;

  closeModal(editModal);
});


//cardModal
openCardModalButton.addEventListener('click', () => {

  const button = cardModal.querySelector('.pop-up__button');
  button.classList.add('pop-up__button_disabled');
  button.disabled = true;
  openModal(cardModal);
  placeInput.value = ''; //TODO reset
  linkInput.value = '';
  addCardFormValidator.addInputReset();
});

closeCardModalButton.addEventListener('click', () => {
  closeModal(cardModal);
});

closePhotoModalButton.addEventListener('click', () => {
  closeModal(photoModal);
});

const formElementAddCard = cardModal.querySelector('.pop-up__form');

//close modal on overlay

const wireCloseModalOverlay = () => {
  const modals = document.querySelectorAll('.pop-up');
  modals.forEach((modal) => {
    modal.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('pop-up_opened')) {
        closeModal(modal);
      }
    });
  });
};

//close modal on esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.pop-up_opened');
    closeModal(openedPopup);
  };
};

formElementAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderCard({
    name: placeInput.value,
    link: linkInput.value
  });

  closeModal(cardModal);
  formElementAddCard.reset();

});

wireCloseModalOverlay();

//validation
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

//CARDS

function renderCard(item) {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();
  document.querySelector('.cards-list').prepend(cardElement);
};

initialCards.forEach((item) => {
  renderCard(item);
});

export { photoModal };
