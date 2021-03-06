import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__submit')
    this._loadingMessage = this._submitButton.textContent;
    this._inputList = Array.from (this._popupForm.querySelectorAll('.popup__input'));
  }
  _getInputValues(){ // ищем все input 
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    });
    return this._formValues;
  };

  changeSubmitHandler(newSubmitHandler){
    this._handleFormSubmit = newSubmitHandler
  }

  setEventListeners(){
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  };

  close(){
    super.close();
    this._popupForm.reset();
  };

  
  renderLoading(loading) { // ==ПР9 показываем процесс загрузки
    if(loading) {
      this._submitButton.textContent = 'Сохранение...';
    }
    else {
      this._submitButton.textContent = this._loadingMessage;
    }
  }
}