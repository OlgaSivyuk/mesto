import { initialCards } from "./initialCards.js"
import { Card } from "./Card.js"
import { FormValidator, config } from "./FormValidator.js"


//ПРОФИЛЬ объявляем переменные
const profileInfoButton = document.querySelector('.profile__add-info'); 
const userName = document.querySelector('.profile__name'); 
const userBio = document.querySelector('.profile__bio'); 
const popupTypeProfile = document.querySelector('.popup_type_profile');
const profileName = document.getElementById('name');
const profileBio = document.getElementById('bio');
const profilePopupClosingButton = popupTypeProfile.querySelector('.popup__close-popup'); 
const profilePopupForm = popupTypeProfile.querySelector('.popup__form');
const profileSubmitButton = popupTypeProfile.querySelector('.popup__submit');
//перенесла для связи с formValidation
//const configprofileEditForm = document.querySelector('.popup__form_profile');// форма редактирования профиля


//КАРТОЧКА МЕСТА объявляем переменные
const profilePlaceButton = document.querySelector('.profile__add-place');
const popupTypePlace = document.querySelector('.popup_type_place');
const placeName = document.getElementById('place-name');
const placeLink = document.getElementById('place-link');
const cardPopupClosingButton = popupTypePlace.querySelector('.popup__close-popup'); 
//перенесла для связи с formValidation
//const cardPopupForm = popupTypePlace.querySelector('.popup__form');// форма добаввления карточек
const placeSubmitButton = popupTypePlace.querySelector('.popup__submit');
const placesSection = document.querySelector('.places');

//ФОТО
const popupTypePhoto = document.querySelector('.popup_type_photo');
const photoUrl = document.querySelector('.popup__photo-url');
const photoName = document.querySelector('.popup__photo-name');
const photoPopupClosingButton = popupTypePhoto.querySelector('.popup__close-popup');
//const placeImage = document.querySelector('.place__image');



//7 ПР СОЗДАЕМ ФОРМУ === ВОТ ТУТ СОВСЕМ НЕ ПОНЯТНО
// ищем внутри модалки добавления карточек,  предполагаю,  что это cardPopupForm
const cardPopupForm = popupTypePlace.querySelector('.popup__form');
// ищем форму редактирования профиля внутри модалки 
const configprofileEditForm = document.querySelector('.popup__form_profile'); 
//запускаем валидацию
const cardPopupFormValidator = new FormValidator(config, cardPopupForm);
const configprofileEditFormValidator = new FormValidator(config, configprofileEditForm);
// вызываем функцию для отображения модалок
cardPopupFormValidator.enableValidation();
configprofileEditFormValidator.enableValidation();


//6 ПР ПОПАПЫ
const popups = Array.from(document.querySelectorAll('.popup'));

//ТЕМПЛЕЙТ
// взяли контент из блока template и положили в новую карточку cardElement
//7 ПР перенесла в Card
//const cardTemplate = document.querySelector('.template').content; 

// 7 ПР забрала в Card
// const cardCreate = (item) => {
//   const cardElement = cardTemplate.cloneNode(true);
//   const placeImage = cardElement.querySelector('.place__image');
//   cardElement.querySelector('.place__name').textContent = item.name;
//   placeImage.src = item.link; 
//   placeImage.alt = item.name; 
  
//   // добавляем подписку на событие реакций
//   setEventListeners(cardElement, item); 
  
//   // карточка вернулась без добавления в DOM
//   return cardElement; 
// };

function renderCard(item) {
  const newCard = new Card(item, '.template', openPhoto);
  const cardElement = newCard.cardCreate()
  placesSection.prepend(cardElement);
};


// function render(){
//   initialCards.forEach(renderCard);
// };
// render();
initialCards.forEach(renderCard);

//СОЗДАНИЕ НОВОЙ КАРТОЧКИ с местом
function fillPlacePopup(evt) {
  evt.preventDefault();
  placesSection.prepend(
    cardCreate({ name: placeName.value, link: placeLink.value})
  );
  cardPopupForm.reset();
  // сброс валидности прописала в validate.js
};

// КАРТОЧКИ места функция слушателя реакций (удаление,  лайки, открытие фото)
// 7 ПР забрала в Card
// function setEventListeners(element, item) {
//   element.querySelector('.place__delete').addEventListener('click', deleteCard);
//   element.querySelector('.place__like').addEventListener('click', likeCard);
//   element.querySelector('.place__image').addEventListener('click', () => openPhoto(item));
// };

// 7 ПР забрала в Card
// function deleteCard(evt) {
//   evt.target.closest('.place').remove();
// };

// 7 ПР забрала в Card
// function likeCard(evt) {
//   evt.target.classList.toggle('place__like_active');
// };

// ФОТО функция открытия попапа при клике на элемент
// 7 ПР не забрала в Card
function openPhoto(item) {
  openPopup(popupTypePhoto);
  photoUrl.src = item.link;
  photoUrl.alt = item.name;
  photoName.textContent = item.name;
};

// ПРОФИЛЬ
// добавляем переменные имени и деятельности в поля попапа (автозаполнение):
function fillProfilePopup(popup) {
  openPopup(popup);
  profileName.value = userName.textContent;
  profileBio.value = userBio.textContent;
};

//записываем новые значения полей профиля (обработчик отправки формы)
function changProfilePopup(event) {
  event.preventDefault();
  userName.textContent = profileName.value;
  userBio.textContent = profileBio.value;
};

// ОБЩИЕ функции для попапов:
// функция открытия попапа по клику на карандашик и крестик
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEsc);
};

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEsc);
};

//закрытие попапа при нажатии на esc 
function pressEsc (event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    const formElement = openedPopup.querySelector('.popup__form')  
    closePopup(openedPopup);
  };
};

// функция объединяет обработчик оверлея и крестик
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(popup)
    };
    if (event.target.classList.contains('popup__close-popup')) {
      closePopup(popup)
    };
  });
});

// =============================== new version of listeners ======================================

//запускаем слушателя функции подстановки переменных 
// в карточку профиля
profileInfoButton.addEventListener('click', function () {
  configprofileEditFormValidator.resetErrors(); // чистим ошибки
  configprofileEditFormValidator.checkButtonValidity(); // чистим кнопку
  fillProfilePopup(popupTypeProfile);
});

//слушатель сохранения данных в профиле (по кнопке сохранить)
profilePopupForm.addEventListener('submit', function (evt) {
  changProfilePopup(evt);
  closePopup(popupTypeProfile);
});

//запускаем слушателя функции добавления нов.карточки
profilePlaceButton.addEventListener('click', () => {
  cardPopupFormValidator.resetErrors(); // чистим ошибки
  cardPopupFormValidator.checkButtonValidity(); // чистим кнопку
  openPopup(popupTypePlace);
});

//слушатель сохранения карточки (по кнопке создать)
cardPopupForm.addEventListener('submit', (evt) => {
  fillPlacePopup(evt);
  closePopup(popupTypePlace);
});

// слушатель попапа закрытия попапа фото теперь не нужен
// действие объединено в объединенном обработчике оверлея и крестик