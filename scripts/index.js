let popUp = document.querySelector('.pop-up');
let popUpOpener = document.querySelector('.profile__edit-button');
let popUpCloser = document.querySelector('.pop-up__close');

popUpOpener.addEventListener('click', openPopUp);
let nameInput = document.querySelector('.pop-up__text_info_name');
let jobInput = document.querySelector('.pop-up__text_info_job');

let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');

function openPopUp() {
  popUp.classList.add('pop-up_opened');

  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
}

popUpCloser.addEventListener('click', closePopUp);

function closePopUp() {
  popUp.classList.remove('pop-up_opened');
}

let formElement = document.querySelector('.pop-up__input');

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;

  closePopUp();

}

formElement.addEventListener('submit', formSubmitHandler);