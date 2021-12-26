//photo-array
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

//modal
const editModal = document.querySelector('.pop-up_place_title');
const addCardModal = document.querySelector('.pop-up_place_card');
const photoModal = document.querySelector('.pop-up_place_fullsize-photo');


//button
const editModalOpener = document.querySelector('.profile__edit-button');
const editModalCloser = editModal.querySelector('.pop-up__close');
const addCardModalOpener = document.querySelector('.profile__add-button');
const addCardModalCloser = addCardModal.querySelector('.pop-up__close');

//input
const nameInput = document.querySelector('.pop-up__text_info_name');
const jobInput = document.querySelector('.pop-up__text_info_job');
const placeInput = document.querySelector('.pop-up__text_info_place');
const linkInput = document.querySelector('.pop-up__text_info_link');


//modal-prof
const profileName = document.querySelector('.profile__name');
const profiletext = document.querySelector('.profile__text');

editModalOpener.addEventListener('click', () => {
  editModal.classList.add('pop-up_opened');

  nameInput.value = profileName.textContent;
  jobInput.value = profiletext.textContent;
});

function closeEditModal() {
  editModal.classList.remove('pop-up_opened');
}

editModalCloser.addEventListener('click', closeEditModal);

const formElementEdit = editModal.querySelector('.pop-up__input');

formElementEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profiletext.textContent = jobInput.value;

  closeEditModal();
});


//modal-add-card

addCardModalOpener.addEventListener('click', () => {
  addCardModal.classList.add('pop-up_opened')
});

function closeAddCardModal() {
  addCardModal.classList.remove('pop-up_opened');
}

addCardModalCloser.addEventListener('click', closeAddCardModal);

const formElementAddCard = addCardModal.querySelector('.pop-up__input');

formElementAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  createCard({
    name: placeInput.value,
    link: linkInput.value
  });

  closeAddCardModal();
  formElementAddCard.reset();

});


//card-template

const cardList = document.querySelector('.cards-list');
const cardTemplate = document.querySelector('.card-template').content;

const fullSizePhoto = document.querySelector('.pop-up__fullsize-photo');
const fullSizePhotoTitle = document.querySelector('.pop-up__figcaption');

function deleteHandler(evt) {
  evt.target.parentElement.remove();
}

function toggleLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__text');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like');
  const photoModalOpener = cardImage;
  const photoModalCloser = photoModal.querySelector('.pop-up__close');

  photoModalOpener.addEventListener('click', () => {
    photoModal.classList.add('pop-up_opened')
    fullSizePhoto.src = cardData.link;
    fullSizePhotoTitle.textContent = cardData.name;
  });

  photoModalCloser.addEventListener('click', () => {
    photoModal.classList.remove('pop-up_opened')
  });

  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', deleteHandler);
  likeButton.addEventListener('click', toggleLike);

  cardList.prepend(cardElement);

};

initialCards.forEach(createCard);




