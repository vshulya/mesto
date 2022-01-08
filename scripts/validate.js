const isValid = (form, input) => {
  if (!input.validity.valid) {
    console.log('Invalid');
    // showInputError(form, input, input.validationMessage);
  } else {
    console.log('Valid');
    // hideInputError(form, input);
  }
};

const setInputList = (form, { inputSelector }) => {
  const inputs = form.querySelectorAll(inputSelector);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input);
    })
  })
}

const enableValidation = ({ formSelector, ...rest }) => {
  const forms = document.querySelectorAll(formSelector);
  forms.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setInputList(form, rest);
  });
};

enableValidation({
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_disabled',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__error_visible'
});
