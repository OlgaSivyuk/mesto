export class Card {
  constructor(item, cardTemplateSelector, handleImageClick) {
    //this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._cardTemplate = cardTemplateSelector;
    this._name = item.name;
    this._link = item.link;
    this._handleImageClick = handleImageClick;

    this._newCard = this._getTemplate();

    this._newCardImage = this._newCard.querySelector('.place__image')
    this._newCardLike = this._newCard.querySelector('.place__like')
    this._newCardDelet = this._newCard.querySelector('.place__delete')

  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.place')
      .cloneNode(true)
    return cardElement
  }

  _likeCard(evt) {
    evt.target.classList.toggle('place__like_active');
  };
    
  _deleteCard(evt) {
    evt.target.closest('.place').remove();
  };

  //подписались на события
  _setEventListeners() {
    this._newCardDelet.addEventListener('click', this._deleteCard);
    this._newCardLike.addEventListener('click', this._likeCard);
    this._newCardImage.addEventListener('click', () => {this._handleImageClick(this._name, this._link)});
    // this._newCard.querySelector('.place__delete').addEventListener('click', this._deleteCard);
    // this._newCard.querySelector('.place__like').addEventListener('click', this._likeCard);
    // this._newCard.querySelector('.place__image').addEventListener('click', () => {this._handleImageClick(this._name, this._link)});
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
    //this._newCard = this._cardTemplate.cloneNode(true); //нашли и склонировали темплейт
    this._fillCard(); // добавляем подписку на событие заполнения карточки
    this._setEventListeners(); // добавляем подписку на событие реакций
    return this._newCard; // карточка вернулась без добавления в DOM
  };
}