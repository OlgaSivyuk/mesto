// создаем класс,  который настраивает валидацию полей формы
class FormValidator{
  constructor(config, form){
    this._form = form
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
  }

  _showInputError (inputElement){ 
    const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
    console.log (errorElement);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage
  };
      
  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity (inputElement) { // проверяем валидность поля
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    };    
  };

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };
  
  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', '');
  };

  checkButtonValidity () {
    if (!this._form.checkValidity()) {
    this._disableButton();
    } else {
      this._enableButton();
    };
  };

  enableValidation() { 
    this._setEventListeners()
  }; 
    
  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this.checkButtonValidity();  
      
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener ('input', () => {
        this._checkInputValidity(inputElement);
        this.checkButtonValidity();
      });
    });
  
      // пробуем задизейблить кнопку при повторном открытии
    this._form.addEventListener('submit', () => {
      //console.log('сбрасываю активную кнопку');
      this._disableButton()
    });
  };

    // чистим ошибки
  resetErrors(){
    this._form.reset()
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  };
};

const config = {
   formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };

export { FormValidator, config }
