export class Card {
  constructor(item, cardTemplateSelector, handleImageClick) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._name = item.name;
    this._link = item.link;
    this._handleImageClick = handleImageClick;
  };

  _likeCard(evt) {
    evt.target.classList.toggle('place__like_active');
  };
    
  _deleteCard(evt) {
    evt.target.closest('.place').remove();
  };

  //подписались на события
  _setEventListeners() {
    this._newCard.querySelector('.place__delete').addEventListener('click', this._deleteCard);
    this._newCard.querySelector('.place__like').addEventListener('click', this._likeCard);
    this._newCard.querySelector('.place__image').addEventListener('click', () => {this._handleImageClick(this._name, this._link)});
  };

  // заполнили карточку    
  _fillCard() {
    this._newCard.querySelector('.place__name').textContent = this._name;
    const placeImage = this._newCard.querySelector('.place__image');
    placeImage.src = this._link; 
    placeImage.alt = this._name;
  };

  //создали карточку с содержимым 
  cardCreate() {
    //нашли и склонировали темплейт
    this._newCard = this._cardTemplate.cloneNode(true);
    // добавляем подписку на событие заполнения карточки
    this._fillCard();
    // добавляем подписку на событие реакций
    this._setEventListeners(); 
    // карточка вернулась без добавления в DOM
    return this._newCard; 
  };
}