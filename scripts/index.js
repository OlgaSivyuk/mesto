//ПРОФИЛЬ объявляем переменные
const profileInfoButton = document.querySelector('.profile__add-info'); 
const userName = document.querySelector('.profile__name'); 
const userBio = document.querySelector('.profile__bio'); 
const popupTypeProfile = document.querySelector('.popup_type_profile');
const profileName = document.getElementById('name');
const profileBio = document.getElementById('bio');
const profilePopupClosingButton = popupTypeProfile.querySelector('.popup__close-popup'); 
const profilePopupForm = popupTypeProfile.querySelector('.popup__form');

//КАРТОЧКА МЕСТА объявляем переменные
const profilePlaceButton = document.querySelector('.profile__add-place');
const popupTypePlace = document.querySelector('.popup_type_place');
const placeName = document.getElementById('place-name');
const placeLink = document.getElementById('place-link');
const cardPopupClosingButton = popupTypePlace.querySelector('.popup__close-popup'); 
const cardPopupForm = popupTypePlace.querySelector('.popup__form');
const placeSubmitButton = popupTypePlace.querySelector('.popup__submit');
const placesSection = document.querySelector('.places');

//ФОТО
const placeImage = document.querySelector('.place__image');
const popupTypePhoto = document.querySelector('.popup_type_photo');
const photoUrl = document.querySelector('.popup__photo-url');
const photoName = document.querySelector('.popup__photo-name');
const photoPopupClosingButton = popupTypePhoto.querySelector('.popup__close-popup');

//ТЕМПЛЕЙТ
// взяли контент из блока template и положили в новую карточку cardElement
const cardTemplate = document.querySelector('.template').content; 

const cardCreate = (item) => {
  const cardElement = cardTemplate.cloneNode(true);
  
  cardElement.querySelector('.place__name').textContent = item.name;
  cardElement.querySelector('.place__image').src = item.link;
  cardElement.querySelector('.place__image').alt = item.name;
  
  setEventListeners(cardElement, item); // добавляем подписку на событие реакций
  
  // содержание склонированного template добавляется в cardElement(.place)
  //placesSection.prepend(cardElement);

  // карточка вернулась без добавления в DOM
  return cardElement; 
};

function renderCard(item) {
  const newCard = cardCreate(item);
  placesSection.prepend(newCard);
};

//function render() {
//  initialCards.forEach(cardCreate);
//};

function render(){
  initialCards.forEach(renderCard);
};

render();

//СОЗДАНИЕ НОВОЙ КАРТОЧКИ с местом
function fillPlacePopup(evt) {
  evt.preventDefault();
  placesSection.prepend(
    cardCreate({ name: placeName.value, link: placeLink.value})
  );
  placeName.value = '';
  placeLink.value = '';
  closePopup(popupTypePlace);
};

// КАРТОЧКИ места функция слушателя реакций (удаление,  лайки, открытие фото)
function setEventListeners(element, item) {
  element.querySelector('.place__delete').addEventListener('click', deleteCard);
  element.querySelector('.place__like').addEventListener('click', likeCard);
  element.querySelector('.place__image').addEventListener('click', () => openPhoto(item));
};

function deleteCard(evt) {
  evt.target.closest('.place').remove();
};

function likeCard(evt) {
  evt.target.classList.toggle('place__like_active');
};

// ФОТО функция открытия попапа при клике на элемент
function openPhoto(item) {
  openPopup(popupTypePhoto);
  photoUrl.src = item.link;
  photoUrl.alt = item.name;
  photoName.textContent = item.name;
};

// ПРОФИЛЬ
// добавляем переменные имени и деятельности в поля попапа (автозаполнение):
function fillProfilePopup() {
  openPopup(popupTypeProfile);
  profileName.value = userName.textContent;
  profileBio.value = userBio.textContent;
  //checkButtonValidity(profilePopupForm, 'popup__submit_disabled');
};

//fillProfilePopup();

//записываем новые значения полей профиля при нажатии 
//на кнопку "сохранить" и закрываем попап (обработчик отправки формы)
function changProfilePopup(event) {
  event.preventDefault();
  userName.textContent = profileName.value;
  userBio.textContent = profileBio.value;
  closePopup(popupTypeProfile);
}

// ОБЩИЕ функции для попапов:
// функция открытия попапа по клику на кнопку с карандашиком
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEsc);
  document.addEventListener('mousedown', clickOverlay);
}


//функция закрытия попапа по клику на крестик 
// + закрываем нажатием на esc и overlay
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEsc);
  document.removeEventListener('mousedown', clickOverlay);
}

// функция закрытия попапа при нажатии на esc 
//+ очищаем поля, тк они не сохранены
function pressEsc (event) {
  const openedPopup = document.querySelector('.popup_opened');
  const formElement = openedPopup.querySelector('.popup__form')
  if (event.key === 'Escape') {
    closePopup(openedPopup);
    //if (formElement !== null) {
    //  formElement.reset();
    //};
  };
};

// функция закрытия попапа при нажатии на esc 
//+ очищаем поля, тк они не сохранены
function clickOverlay (event) {
  const openedPopup = document.querySelector('.popup_opened');
  if (event.target === openedPopup) {
    closePopup(openedPopup);
    //if (formElement !== null) {
    //  formElement.reset();
    //};
  };
};

// ПРОФИЛЬ запускаем функции
//запускаем слушателя функция закрытия попапа по клику на крестик
profilePopupClosingButton.addEventListener('click', () => closePopup(popupTypeProfile));
// запускаем слушателя функции подстановки переменных
profileInfoButton.addEventListener('click', fillProfilePopup);
//запускаем слушателя функции изменения данных в профиле
profilePopupForm.addEventListener('submit', changProfilePopup);

//КАРТОЧКА МЕСТА запускаем функции
// запускаем слушателя запуска функция открытия попапа по клику на кнопку с плюсом
profilePlaceButton.addEventListener('click', () => openPopup(popupTypePlace));
// запускаем слушателя функция закрытия попапа по клику на крестик
cardPopupClosingButton.addEventListener('click', () => closePopup(popupTypePlace));
// запускаем слушателя новой заполненной карточки места
cardPopupForm.addEventListener('submit', fillPlacePopup);

//ФОТО запускаем функции
// запускаем слушателя функции закрытия попапа по клику на крестик
photoPopupClosingButton.addEventListener('click', () => closePopup(popupTypePhoto));
