
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const showInputError = ({inputErrorClass, errorClass}, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
    //console.log (errorElement);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
};
  
const hideInputError = ({inputErrorClass, errorClass}, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  //console.log (errorElement);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};
  
const checkInputValidity = ({...rest}, formElement, inputElement) => {
  //console.log(inputElement.value);
  //console.log(inputElement.validity);
  if (inputElement.validity.valid) {
    hideInputError(rest, formElement, inputElement);
  } else {
    showInputError(rest, formElement, inputElement, inputElement.validationMessage);
  };    
};
  

function checkButtonValidity ({inactiveButtonClass}, formElement, buttonElement) {
  if (!formElement.checkValidity()) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
    //alert ('Хьюстон, у нас проблемы!');
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};
  
function enableValidation({formSelector, inputSelector, submitButtonSelector, ...rest }) {
  const formList = Array.from(document.querySelectorAll(formSelector)); 
  //console.log(formList);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (event) {
      event.preventDefault();
    //console.log('form submited, is valid?', formElement.checkValidity());
    });
    const inputList = formElement.querySelectorAll(inputSelector); 
    //console.log(inputList)
    const buttonElement = formElement.querySelector(submitButtonSelector);
    //console.log(buttonElement);
    checkButtonValidity(rest, formElement, buttonElement);
    inputList.forEach(inputElement => {
    inputElement.addEventListener ('input', function () {
      checkInputValidity(rest, formElement, inputElement);
      checkButtonValidity(rest, formElement, buttonElement);
    });
    });
  });
};
  
enableValidation(config);
  
  