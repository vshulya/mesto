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
const nameInput = document.querySelector('.pop-up__text_info_name');
const jobInput = document.querySelector('.pop-up__text_info_job');
const placeInput = document.querySelector('.pop-up__text_info_place');
const linkInput = document.querySelector('.pop-up__text_info_link');

//function toggleModal
function toggleModal(modal) {
  modal.classList.toggle('pop-up_opened');
};


//modal-prof
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');


openEditModalButton.addEventListener('click', function () {
  toggleModal(editModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
});
closeEditModalButton.addEventListener('click', () => toggleModal(editModal));

const formElementEdit = editModal.querySelector('.pop-up__input');

formElementEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;

  toggleModal(editModal);
});


//modal-add-card

openCardModalButton.addEventListener('click', () => toggleModal(cardModal));
closeCardModalButton.addEventListener('click', () => toggleModal(cardModal));

const formElementAddCard = cardModal.querySelector('.pop-up__input');

formElementAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  createCard({
    name: placeInput.value,
    link: linkInput.value
  });

  toggleModal(cardModal);
  formElementAddCard.reset();

});

//card-modal

closePhotoModalButton.addEventListener('click', () => toggleModal(photoModal));

//card-template

const cardList = document.querySelector('.cards-list');
const template = document.querySelector('.card-template').content;

const fullSizePhoto = document.querySelector('.pop-up__fullsize-photo');
const fullSizePhotoTitle = document.querySelector('.pop-up__figcaption');

function deleteHandler(evt) {
  evt.target.parentElement.remove();
}

function toggleLike(evt) {
  evt.target.classList.toggle('card__like_active');
};

function renderCard() {
  cardList.prepend();
};

function createCard(cardData) {
  const element = template.cloneNode(true);
  const cardImage = element.querySelector('.card__image');
  const cardTitle = element.querySelector('.card__text');
  const deleteButton = element.querySelector('.card__delete-button');
  const likeButton = element.querySelector('.card__like');
  const openPhotoModalButton = cardImage;


  function handlePreviewPicture() {
    photoModal.classList.add('pop-up_opened');
    fullSizePhoto.src = cardData.link;
    fullSizePhoto.alt = cardData.name;
    fullSizePhotoTitle.textContent = cardData.name;
  };

  openPhotoModalButton.addEventListener('click', handlePreviewPicture);

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', deleteHandler);
  likeButton.addEventListener('click', toggleLike);

  cardList.prepend(element);

};

initialCards.forEach(createCard);