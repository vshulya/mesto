import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
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
  fullSizePhoto,
  fullSizePhotoTitle
} from '../utils/constants.js';

const userInfo = new UserInfo(profileName, profileText);

//validation 
const editFormValidator = new FormValidator(selectors, editModal);
const addCardFormValidator = new FormValidator(selectors, cardModal);
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();


const editPopup = new PopupWithForm(editModal, userInfo.setUserInfo.bind(userInfo), openEditModalButton, editFormValidator, userInfo.getUserInfo.bind(userInfo));
editPopup.setEventListeners();

const cardPopup = new PopupWithForm(cardModal, renderCard, openCardModalButton, addCardFormValidator);
cardPopup.setEventListeners();


// photoModal
const popupWithImage = new PopupWithImage(photoModal);

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
  popupWithImage.setEventListeners();
}


//CARDS
function renderCard(item) {
  const card = new Card(item, '.card-template', handleCardClick);

  const cardElement = card.generateCard();

  cardsList.addItem(cardElement);
};

const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.card-template', handleCardClick);

    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
  }
},
  cardListSection
)

cardsList.renderItems();

