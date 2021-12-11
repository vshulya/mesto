let popUp = document.querySelector('.pop-up');
let popUpOpener = document.querySelector('.profile__edit-button');
let popUpCloser = document.querySelector('.pop-up__close');

popUpOpener.addEventListener("click", openPopUp);

function openPopUp() {
  popUp.classList.add('pop-up_opened');
}

popUpCloser.addEventListener("click", closePopUp);

function closePopUp() {
  popUp.classList.remove('pop-up_opened');
}

let formElement = document.querySelector('.pop-up__input');

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('.pop-up__text_name-input');
  let jobInput = document.querySelector('.pop-up__text_job-input');

  nameInput = nameInput.value;
  jobInput = jobInput.value;

  let profileName = document.querySelector('.profile__name');
  let profileText = document.querySelector('.profile__text');

  profileName.textContent = nameInput;
  profileText.textContent = jobInput;

  closePopUp();

}

formElement.addEventListener('submit', formSubmitHandler);


