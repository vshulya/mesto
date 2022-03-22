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
    })
    .catch(error => {
      console.log(error)
    })
};

const handleCardFormSubmit = (data) => {
  api.addCard(data.name, data.link, data.likes)
    .then(res => {

      createAndAddCard(res);
      cardPopup.close();
    })
    .catch(error => {
      console.log(error)
    })
};

const handleProfilePhotoSubmit = (data) => {

  api.editAvatar(data.avatar)
    .then(res => {
      userInfo.setUserInfo(res);
      profilePhotoPopup.close();
    })
    .catch(error => {
      console.log(error)
    })
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
  const card = new Card(userId,
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
          .catch(error => {
            console.log(error)
          })
      });
    },
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
          .catch(error => {
            console.log(error)
          })
      }
      else {
        api.addLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
          .catch(error => {
            console.log(error)
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

  const card = createCard(cardData)
  cardsList.addItem(card);
};

const cardsList = new Section({
  data: [],
  renderer: renderCard
},
  cardListSection
)

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([profileData, cardData]) => {
    userInfo.setUserInfo(profileData)
    userId = profileData._id

    cardsList.renderItems(cardData);
  })
  .catch(error => {
    console.log(error)
  })


// photoModal
const popupWithImage = new PopupWithImage(photoModal);
popupWithImage.setEventListeners();

openEditModalButton.addEventListener('click', () => {
  editPopup.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  if (editFormValidator) {
    //editFormValidator.resetInputs();
    editFormValidator.resetValidation();
  }
});

openCardModalButton.addEventListener('click', () => {
  cardPopup.open();
  if (addCardFormValidator) {
    //addCardFormValidator.resetInputs();
    addCardFormValidator.resetValidation();
  }
});

openProfilePhotoModalButton.addEventListener('click', () => {
  profilePhotoPopup.open();
  if (profilePhotoPopupValidator) {
    //profilePhotoPopupValidator.resetInputs();
    profilePhotoPopupValidator.resetValidation();
  }
});
