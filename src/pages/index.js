import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import { api } from '../components/Api.js';
import {
  initialCards,
  selectors,
  editModal,
  cardModal,
  photoModal,
  dltCardModal,
  profilePhotoModal,
  openEditModalButton,
  closeEditModalButton,
  openCardModalButton,
  openProfilePhotoModalButton,
  openDltCardModalButton,
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
  formElementProfilePhotoModal,
  cardListSection,
  fullSizePhoto,
  fullSizePhotoTitle,
  cardList,
  profileImageElement
} from '../utils/constants.js';

import './index.css';

let userId

api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res)
    userId = res._id
  })



const userInfo = new UserInfo(profileName, profileText, profileImageElement);

//validation 
const editFormValidator = new FormValidator(selectors, editModal);
const addCardFormValidator = new FormValidator(selectors, cardModal);
const profilePhotoPopupValidator = new FormValidator(selectors, profilePhotoModal);
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
profilePhotoPopupValidator.enableValidation();

const handleProfileFormSubmit = (data) => {
  const { name, about } = data
  api.editProfile(name, about)
    .then(res => {
      userInfo.setUserInfo(res);
      editPopup.close();
    });
};

const handleCardFormSubmit = (data) => {
  api.addCard(data.name, data.link, data.likes)
    .then(res => {
      createAndAddCard(res);
      cardPopup.close();
    })
};

const handleProfilePhotoSubmit = (data) => {

  api.editAvatar(data.avatar)
    .then(res => {
      userInfo.setUserInfo(res);
      editPopup.close();
    });
};

const editPopup = new PopupWithForm(editModal, handleProfileFormSubmit, userInfo.getUserInfo.bind(userInfo));
editPopup.setEventListeners();

const cardPopup = new PopupWithForm(cardModal, handleCardFormSubmit);
cardPopup.setEventListeners();

const popupDeleteCard = new PopupWithForm(dltCardModal);
popupDeleteCard.setEventListeners();

const profilePhotoPopup = new PopupWithForm(profilePhotoModal, handleProfilePhotoSubmit);
profilePhotoPopup.setEventListeners();

//CARDS
function createCard(item) {
  const card = new Card(
    item,
    '.card-template',
    () => {
      popupWithImage.open(item.name, item.link);
    },
    (id) => {
      console.log(id)
      popupDeleteCard.open();
      popupDeleteCard.changeSubmitHandler(() => {
        console.log("click")
        api.deleteCard(id)
          .then(res => {
            card.deleteCard(res);
            popupDeleteCard.close();
          })
      });
    },
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
      }
      else {
        api.addLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
      }
    });
  const cardElement = card.generateCard();
  return cardElement;
};

function renderCard(item) {
  const cardElement = createCard(item);
  cardsList.addItem(cardElement);
};

function createAndAddCard(cardData) {
  const card = createCard({
    name: cardData.name,
    link: cardData.link,
    likes: cardData.likes,
    id: cardData._id,
    userId: userId,
    ownerId: cardData.owner._id
  })
  cardsList.addItem(card);
};

const cardsList = new Section({
  data: [],
  renderer: renderCard
},
  cardListSection
)
api.getInitialCards()
  .then(cardData => {
    cardData.forEach(data => {
      createAndAddCard(data);

      cardsList.renderItems();
    })
  })

// photoModal
const popupWithImage = new PopupWithImage(photoModal);
popupWithImage.setEventListeners();

openEditModalButton.addEventListener('click', () => {
  formElementEdit.reset();
  editPopup.open();
  if (editFormValidator) {
    editFormValidator.resetInputs();
    editFormValidator.resetValidation();
  }
});

openCardModalButton.addEventListener('click', () => {
  formElementAddCard.reset();
  cardPopup.open();
  if (addCardFormValidator) {
    addCardFormValidator.resetInputs();
    addCardFormValidator.resetValidation();
  }
});

openProfilePhotoModalButton.addEventListener('click', () => {
  formElementProfilePhotoModal.reset();
  profilePhotoPopup.open();
  if (profilePhotoPopupValidator) {
    profilePhotoPopupValidator.resetInputs();
    profilePhotoPopupValidator.resetValidation();
  }
});
