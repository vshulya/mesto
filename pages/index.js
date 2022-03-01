import Section from '../components/Section.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  selectors,
  editModal,
  cardModal,
  photoModal,
  openEditModalButton,
  closeEditModalButton,
  openCardModalButton,
  closeCardModalButton,
  closePhotoModalButton,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
  profileName,
  profileText,
  formElementEdit,
  formElementAddCard,
  cardListSection,
} from '../utils/constants.js';

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

openEditModalButton.addEventListener('click', function () {
  openModal(editModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  editFormValidator.addInputReset();
});

closeEditModalButton.addEventListener('click', () => {
  closeModal(editModal);
});


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

// function renderCard(item) {
//   const card = new Card(item, '.card-template');
//   const cardElement = card.generateCard();
//   document.querySelector('.cards-list').prepend(cardElement);
// };

// initialCards.forEach((item) => {
//   renderCard(item);
// });

const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.card-template');
    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
  }
},
  cardListSection
)

export { photoModal };
