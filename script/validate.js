const validatedElements = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  inputValidClass: 'popup__field_valid',
  inputErrorClass: 'popup__field_invalid',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  activeButtonClass: 'popup__save-button_undisabled',
  errorClass: 'form__error_visible'
};

//Показать сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(validatedElements.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validatedElements.errorClass);
};

//Скрыть сообщение об ошибке
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(validatedElements.inputErrorClass);
  errorElement.classList.remove(validatedElements.errorClass);
  errorElement.textContent = '';
};


//Проверка валидности
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};


const setEventListeners = (formElement) => {
  const inputs = Array.from(formElement.querySelectorAll(validatedElements.inputSelector));
  const buttonSubmit = formElement.querySelector(validatedElements.submitButtonSelector);
  toggleButtonState(inputs, buttonSubmit);
  //Обходим элементы
  inputs.forEach((inputElement) => {
    //Добавим полям обработчик события input 
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputs, buttonSubmit);
    });
  });
};

const enableValidation = ({ formSelector, inputSelector, inputValidClass, inputErrorClass,
  submitButtonSelector, inactiveButtonClass, activeButtonClass, errorClass }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation(validatedElements);


//Проверка наличия невалидных полей
function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}


function toggleButtonState(inputs, buttonSubmit) {
  if (hasInvalidInput(inputs)) {
    buttonSubmit.classList.add(validatedElements.inactiveButtonClass);
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.classList.remove(validatedElements.inactiveButtonClass);
    buttonSubmit.disabled = false;
  }
}





