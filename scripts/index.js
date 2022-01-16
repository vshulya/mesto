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

//function openModal
function openModal(modal) {
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


const addInputReset = (modal) => {
  const inputs = modal.querySelectorAll('.pop-up__input');
  inputs.forEach(input => {
    const error = modal.querySelector(`#${input.id}-error`);
    error.classList.remove('pop-up__input-error_visible');
    error.textContent = '';
    input.classList.remove('pop-up__input_type_error');
  });
};

openEditModalButton.addEventListener('click', function () {
  openModal(editModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  addInputReset(editModal);
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


//photoModal
openCardModalButton.addEventListener('click', () => {

  const button = cardModal.querySelector('.pop-up__button');
  button.classList.add('pop-up__button_disabled');
  button.disabled = true;
  openModal(cardModal);
  placeInput.value = '';
  linkInput.value = '';
  addInputReset(cardModal);
});

closeCardModalButton.addEventListener('click', () => {
  closeModal(cardModal);
});

const formElementAddCard = cardModal.querySelector('.pop-up__form');

closePhotoModalButton.addEventListener('click', () => closeModal(photoModal));

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
  openModal(photoModal);
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

wireCloseModalOverlay();

initialCards.forEach(cardData => {
  renderCard(cardData)
});

formElementAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderCard({
    name: placeInput.value,
    link: linkInput.value
  });

  closeModal(cardModal);
  formElementAddCard.reset();

});

