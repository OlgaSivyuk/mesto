//==================================== 6 =========================================

//1. Настраиваем атрибуты  для формы (novalidate) и инпутов (requared, min&maxlength)
//2. заданы стили для невалидного состояния
//3. сверстаны элементы для отображения ошибки
//4. задан обработчик события submit
//5. заданы обработчики события input
//6. кнопка отправки дизейблится в невалидном сосотоянии

//========================= проверка полей ====================================

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
    //console.log (errorElement);
    inputElement.classList.add('popup__input_type_error');
    errorElement.classList.add('popup__input-error_active');
    errorElement.textContent = errorMessage;
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
    //console.log (errorElement);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    //console.log(inputElement.value);
    //console.log(inputElement.validity);
    if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement);
    } else {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    }
    
  };
  
  // отключает submit, если есть хоть одно невалидное поле
  const checkButtonValidity = (formElement, buttonElement) => {
    if (!formElement.checkValidity()) {
      buttonElement.setAttribute('disabled', '');
      buttonElement.classList.add('popup__submit_disabled');
      //alert ('Хьюстон, у нас проблемы!');
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove('popup__submit_disabled');
    }
  }
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form')); //1. форма, закладываем маштабируемость для формы методом Arrey (создаем массив)
    //console.log(formList);
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (event) {
        event.preventDefault();
        //console.log('form submited, is valid?', formElement.checkValidity());
      });
      const inputList = formElement.querySelectorAll('.popup__input'); //2. инпут, закладываем маштабируемость для инпутов
      //console.log(inputList)
      const buttonElement = formElement.querySelector('.popup__submit');
      //console.log(buttonElement);
      
      checkButtonValidity(formElement, buttonElement);
  
      inputList.forEach(inputElement => {
      inputElement.addEventListener ('input', function () {
        checkInputValidity(formElement, inputElement);
        checkButtonValidity(formElement, buttonElement);
      });
      });
    });
  };
  
  enableValidation();

  
  // включение валидации вызовом enableValidation
  // все настройки передаются при вызове
  
  //enableValidation({
  //  formSelector: '.popup__form',
  //  inputSelector: '.popup__input',
  //  submitButtonSelector: '.popup__button',
  //  inactiveButtonClass: 'popup__button_disabled',
  //  inputErrorClass: 'popup__input_type_error',
  //  errorClass: 'popup__error_visible'
  //});
  
  