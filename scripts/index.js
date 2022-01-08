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

//function toggleModal
function toggleModal(modal) {
  modal.classList.toggle('pop-up_opened');
};


//editModal
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');


openEditModalButton.addEventListener('click', function () {
  toggleModal(editModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
});
closeEditModalButton.addEventListener('click', () => toggleModal(editModal));

const formElementEdit = editModal.querySelector('.pop-up__form');

formElementEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;

  toggleModal(editModal);
});


//photoModal

openCardModalButton.addEventListener('click', () => toggleModal(cardModal));
closeCardModalButton.addEventListener('click', () => toggleModal(cardModal));

const formElementAddCard = cardModal.querySelector('.pop-up__form');

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

function handlePreviewPicture() {
  toggleModal(photoModal);
};

function createCard(cardData) {
  const element = template.cloneNode(true);
  const cardImage = element.querySelector('.card__image');
  const cardTitle = element.querySelector('.card__text');
  const deleteButton = element.querySelector('.card__delete-button');
  const likeButton = element.querySelector('.card__like');
  const openPhotoModalButton = cardImage;

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;


  openPhotoModalButton.addEventListener('click', function () {
    handlePreviewPicture();
    fullSizePhoto.src = cardData.link;
    fullSizePhoto.alt = cardData.name;
    fullSizePhotoTitle.textContent = cardData.name;
  });

  deleteButton.addEventListener('click', deleteHandler);
  likeButton.addEventListener('click', toggleLike);

  return element;
};

function renderCard(cardData) {
  const newCard = createCard(cardData);
  cardList.prepend(newCard);
};

initialCards.forEach(cardData => {
  renderCard(cardData)
});

formElementAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderCard({
    name: placeInput.value,
    link: linkInput.value
  });

  toggleModal(cardModal);
  formElementAddCard.reset();

});

