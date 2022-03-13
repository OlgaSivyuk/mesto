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
const profilePopupForm = popupTypeProfile.querySelector('.popup__form');
// форма редактирования профиля (используется в ПР7 formValidation)
const configprofileEditForm = document.querySelector('.popup__form_profile');
//не использовались
const profilePopupClosingButton = popupTypeProfile.querySelector('.popup__close-popup');
const profileSubmitButton = popupTypeProfile.querySelector('.popup__submit');


//КАРТОЧКА МЕСТА объявляем переменные
const profilePlaceButton = document.querySelector('.profile__add-place');
const popupTypePlace = document.querySelector('.popup_type_place');
const placeName = document.getElementById('place-name');
const placeLink = document.getElementById('place-link');
const placesSection = document.querySelector('.places');
// форма добавления карточек (используется в ПР7 formValidation)
const cardPopupForm = popupTypePlace.querySelector('.popup__form');
//не использовались
const cardPopupClosingButton = popupTypePlace.querySelector('.popup__close-popup'); 
const placeSubmitButton = popupTypePlace.querySelector('.popup__submit');


//ФОТО
const popupTypePhoto = document.querySelector('.popup_type_photo');
const photoUrl = document.querySelector('.popup__photo-url');
const photoName = document.querySelector('.popup__photo-name');
//не использовались
const photoPopupClosingButton = popupTypePhoto.querySelector('.popup__close-popup');
const placeImage = document.querySelector('.place__image');

//ПОПАПЫ
const popups = Array.from(document.querySelectorAll('.popup'));

// ==ПР7 СОЗДАЕМ ФОРМУ== 
// ищем внутри модалки добавления карточек cardPopupForm
// ищем форму редактирования профиля внутри модалки configprofileEditForm
//запускаем валидацию
const cardPopupFormValidator = new FormValidator(config, cardPopupForm);
const configprofileEditFormValidator = new FormValidator(config, configprofileEditForm);
// вызываем функцию для отображения модалок
cardPopupFormValidator.enableValidation();
configprofileEditFormValidator.enableValidation();

// ==ПР7 СОЗДАЕМ КАРТОЧКУ== 
function renderCard(item) {
  const newCard = new Card(item, '.template', openPhoto);
  const cardElement = newCard.cardCreate()
  placesSection.prepend(cardElement);
};

function render(){
  initialCards.forEach(renderCard);
};
render();

function openPhoto(item) {
  openPopup(popupTypePhoto);
  photoUrl.src = item.link;
  photoUrl.alt = item.name;
  photoName.textContent = item.name;
};

//ЗАПОЛНЯЕМ НОВУЮ КАРТОЧКУ с местом
function fillPlacePopup(evt) {
  evt.preventDefault();
  placesSection.prepend(
    cardCreate({ name: placeName.value, link: placeLink.value})
  );
  cardPopupForm.reset();
  // сброс валидности прописала в validate.js
};

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

// СЛУШАТЕЛИ
// запускаем слушателя функции подстановки переменных 
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