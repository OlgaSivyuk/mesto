
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
  if (inputElement.validity.valid) {
    hideInputError(rest, formElement, inputElement);
  } else {
    showInputError(rest, formElement, inputElement, inputElement.validationMessage);
  };    
};

function enableButton({inactiveButtonClass}, buttonElement) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
};

function disableButton({inactiveButtonClass}, buttonElement) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', '');
};
  
function checkButtonValidity ({...rest}, formElement, buttonElement) {
  if (!formElement.checkValidity()) {
    disableButton(rest, buttonElement)
  } else {
    enableButton(rest, buttonElement)

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

    // пробуем задизейблить кнопку при повторном открытии
    formElement.addEventListener('submit', () => {
      //console.log('сбрасываю активную кнопку');
      disableButton(rest, buttonElement)
    });
  });
};
  
enableValidation(config);
  
  