// создаем класс,  который настраивает валидацию полей формы
// примечание для себя config передается первым аргументом 
// в FormValidator и называетя в классе settings 
class FormValidator{
    constructor(config, form){
      this._form = form
      //this._settings = settings
      this._inputSelector = config.inputSelector
      this._submitButtonSelector = config.submitButtonSelector
      this._inactiveButtonClass = config.inactiveButtonClass
      this._inputErrorClass = config.inputErrorClass
      this._errorClass = config.errorClass
    }

  _showInputError (inputElement){ 
    //const {inputErrorClass, errorClass} = this.settings;

      const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
      console.log (errorElement);
     // inputElement.classList.add(this._settings.inputErrorClass);
     // errorElement.classList.add(this._settings.errorClass);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.classList.add(this._errorClass);
      errorElement.textContent = inputElement.validationMessage
  };
      
  _hideInputError (inputElement) {
    //const {inputErrorClass, errorClass} = this.settings;
    
    const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
    // inputElement.classList.remove(this._settings.inputErrorClass);
    // errorElement.classList.remove(this._settings.errorClass);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity (inputElement) { // проверяем валидность поля
      if (inputElement.validity.valid) {
        this._hideInputError(inputElement);
      } else {
        //this._showInputError(inputElement, inputElement.validationMessage);
        this._showInputError(inputElement);
      };    
  };

  _enableButton() {
    //const {inactiveButtonClass} = this.settings;

    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };
  
  _disableButton() {
    //const {inactiveButtonClass} = this.settings;
    
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', '');
  };

  checkButtonValidity () {
      if (!this._form.checkValidity()) { // не понятно что здесь делать с formElement,  поставила this._form
        this._disableButton();
      } else {
        this._enableButton();
      };
  };

  enableValidation() { 
    this._setEventListeners()
    // this._form.addEventListener('submit', (event) => {
    //   //     event.preventDefault();
    //   //   });
    } 
    // const formList = Array.from(document.querySelectorAll(formSelector)); 
    // //console.log(formList);
    // formList.forEach((formElement) => {
    //   formElement.addEventListener('submit', function (event) {
    //     event.preventDefault();
    //   //console.log('form submited, is valid?', formElement.checkValidity());
    //   });

    _setEventListeners() {
    // this._form.addEventListener('submit', (event) => {
    //     event.preventDefault();
    //   });
      //const {inputSelector, submitButtonSelector } = this.settings;
      //можно вынести поиск параметров в конструктор,  но я оставила здесь

      //this._inputList = this._form.querySelectorAll(this.settings.inputSelector); 
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

// const form = document.querySelector('') // что тут писать???? что-то что лежит в форме попапа
// const bla = new FormValidatior(config, form) // 