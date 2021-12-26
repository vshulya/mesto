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
let editModal = document.querySelector('.pop-up_place_title');
let addCardModal = document.querySelector('.pop-up_place_card');



//button
let editModalOpener = document.querySelector('.profile__edit-button');
let editModalCloser = editModal.querySelector('.pop-up__close');
let addCardModalOpener = document.querySelector('.profile__add-button');
let addCardModalCloser = addCardModal.querySelector('.pop-up__close');

//input
let nameInput = document.querySelector('.pop-up__text_info_name');
let jobInput = document.querySelector('.pop-up__text_info_job');
let placeInput = document.querySelector('.pop-up__text_info_place');
let linkInput = document.querySelector('.pop-up__text_info_link');


//modal-prof

let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');

editModalOpener.addEventListener('click', openEditModal);

function openEditModal() {
  editModal.classList.add('pop-up_opened');

  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
}

editModalCloser.addEventListener('click', closeEditModal);

function closeEditModal() {
  editModal.classList.remove('pop-up_opened');
}

let formElementEdit = editModal.querySelector('.pop-up__input');

formElementEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;

  closeEditModal();
});


//modal-add-card

addCardModalOpener.addEventListener('click', openCardModal);

function openCardModal() {
  addCardModal.classList.add('pop-up_opened')
};

addCardModalCloser.addEventListener('click', closeAddCardModal);

function closeAddCardModal() {
  addCardModal.classList.remove('pop-up_opened');
}

let formElementAddCard = addCardModal.querySelector('.pop-up__input');

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

let cardList = document.querySelector('.cards-list');
const cardTemplate = document.querySelector('.card-template').content;

function deleteHandler(evt) {
  evt.target.parentElement.remove();
}

function toggleLike(evt) {
  evt.target.classList.toggle('card__like_active');
}


function createCard(cardData) {
  let cardElement = cardTemplate.cloneNode(true);
  let cardImage = cardElement.querySelector('.card__image');
  let cardTitle = cardElement.querySelector('.card__text');
  let deleteButton = cardElement.querySelector('.card__delete-button');
  let likeButton = cardElement.querySelector('.card__like');
  let photoModal = document.querySelector('.pop-up_place_fullsize-photo');
  let photoModalOpener = cardImage;
  let photoModalCloser = photoModal.querySelector('.pop-up__close');
  let fullSizePhoto = document.querySelector('.pop-up__fullsize-photo');
  let fullSizePhotoTitle = document.querySelector('.pop-up__figcaption');


  photoModalOpener.addEventListener('click', () => {
    photoModal.classList.add('pop-up_opened')
    fullSizePhoto.src = cardData.link;
    fullSizePhotoTitle.textContent = cardData.name;
  });

  photoModalCloser.addEventListener('click', closePhotoModal);

  function closePhotoModal() {

    photoModal.classList.remove('pop-up_opened')
  };


  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;



  deleteButton.addEventListener('click', deleteHandler);
  likeButton.addEventListener('click', toggleLike);

  cardList.prepend(cardElement);

};

initialCards.forEach(createCard);




