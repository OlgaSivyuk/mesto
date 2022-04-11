export class Card {
  constructor(item, cardTemplateSelector, handleImageClick, handleDeleteClick, handleLikeCklick) {
    //this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._cardTemplate = cardTemplateSelector;
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._cardId = item.cardId;
    this._userId = item.userId
    this._ownerId = item.ownerId;


    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeCklick = handleLikeCklick;
    
    this._newCard = this._getTemplate();
    this._likesCountElement = this._newCard.querySelector('.place__like-count');
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

  isLiked(){
    const userHasLikedCard = this._likes.find(user => user._id === this._userId)
    // if(userHasLikedCard){
    //   this._likeCard()
    // }
    return userHasLikedCard
  }

  // _likeCard(evt) {
  //   evt.target.classList.toggle('place__like_active');
  // };

  _likeCard() {
    //this._newCardLike.classList.toggle('place__like_active');
    this._newCardLike.classList.add('place__like_active');
  };

  _dislikeCard() {
    //this._newCardLike.classList.toggle('place__like_active');
    this._newCardLike.classList.remove('place__like_active');
  }

  setLikes(newLikes) {// делаем публичным,  этот метод будет принимать новые лайки 
    //console.log('newLikes', newLikes)
    this._likes = newLikes; // переписываем во внутреннее свойсво this, чтобы лайки всегда были актуальны
    this._likesCountElement.textContent = this._likes.length; // кол-во лайков - длинна массива,  поэтому ставим length

    // const userHasLikedCard = this._likes.find(user => user._id === this._userId)
    // if(userHasLikedCard){
    //   this._likeCard()
    // } // перенесли в isLiked

    if(this.isLiked()){
      this._likeCard()
    } else {
      this._dislikeCard()
    }
  }
    
  // _deleteCard(evt) {
  //   evt.target.closest('.place').remove();
  // };

  deleteCard = () => { // добавила стрелочную функцию, тк иначе удаление карточки не срабатывает
    this._newCard.remove();
    this._newCard = null;
  };

  //подписались на события
  _setEventListeners() {
    //this._newCardDelet.addEventListener('click', this._deleteCard);
    this._newCardDelet.addEventListener('click', () => {this._handleDeleteClick(this._cardId)});
    // this._newCardLike.addEventListener('click', this._likeCard);
    this._newCardLike.addEventListener('click', () => {this._handleLikeCklick(this._cardId)});
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
    this.setLikes(this._likes);

    if (this._userId !== this._ownerId){
      this._newCardDelet.style.display = 'none'
    }


    return this._newCard; // карточка вернулась без добавления в DOM
  };
}