import { initialCards } from './initialCards.js'
import { Card } from './Card.js'
import { FormValidator, config } from './FormValidator.js'
import { Section } from './Section.js'
import { PopupWithImage } from './PopupWithImage.js'
import { PopupWithForm } from './PopupWithForm.js'
import { UserInfo } from './UserInfo.js'

//ПРОФИЛЬ объявляем переменные
const profileInfoButton = document.querySelector('.profile__add-info'); 
const userName = document.querySelector('.profile__name'); 
const userBio = document.querySelector('.profile__bio'); 
const popupTypeProfile = document.querySelector('.popup_type_profile');
const profileName = document.getElementById('name');
const profileBio = document.getElementById('bio');
// форма редактирования профиля (используется в ПР7 formValidation)
const configprofileEditForm = document.querySelector('.popup__form_profile');
//не использовались
const profilePopupForm = popupTypeProfile.querySelector('.popup__form');
const profilePopupClosingButton = popupTypeProfile.querySelector('.popup__close-popup');
const profileSubmitButton = popupTypeProfile.querySelector('.popup__submit');


//КАРТОЧКА МЕСТА объявляем переменные
const profilePlaceButton = document.querySelector('.profile__add-place');
const popupTypePlace = document.querySelector('.popup_type_place');
const placeName = document.getElementById('place-name');
const placeLink = document.getElementById('place-link');
// форма добавления карточек (используется в ПР7 formValidation)
const cardPopupForm = popupTypePlace.querySelector('.popup__form');
//не использовались
const placesSection = document.querySelector('.places');
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

// ==ПР8 создаем экземпляр PopupWithImage
const imagePopup = new PopupWithImage('.popup_type_photo', photoUrl, photoName);

imagePopup.setEventListeners() //делаем подписку на закрытие карточки картинки 

const openPhoto = (name,link) => { // ПР8 показываем картинку
  imagePopup.open(name,link);
};

// ==ПР7 СОЗДАЕМ КАРТОЧКУ== 
function renderCard(item) {
  const newCard = new Card(item, '.template', openPhoto);
  const cardElement = newCard.cardCreate()
  //placesSection.prepend(cardElement);
  return cardElement; // ПР8 возврящаю массив с карточками
};


// ==ПР8 реализация карточки в DOM ==
// создали Section передали ему,  что отрисовать (initialCards) и чем отрисовать (renderer)
const cardSection = new Section ({
  items: initialCards, //items это массив с данными,  в нашем случае initialCards
    renderer: (item) => {
    cardSection.addItem(renderCard(item));
    },
  }, 
  '.places');
  
// реализуем карточки
cardSection.renderItems()

const userInfo = new UserInfo ({profileNameSelector: '.profile__name', profileBioSelector: '.profile__bio'})

const addCardPopup = new PopupWithForm('.popup_type_place', fillPlacePopup);
const editProfilePopup = new PopupWithForm('.popup_type_profile', changProfilePopup);
  
addCardPopup.setEventListeners()// делаем подписки на закрытие попапа карточки места
editProfilePopup.setEventListeners()// делаем подписки на закрытие попапа профиля


//ЗАПОЛНЯЕМ НОВУЮ КАРТОЧКУ с местом
function fillPlacePopup(item) {
  //evt.preventDefault(); // == ПР8 перенесла в PopupWithForm
  //console.log('item', item)
  const cardElement = {}
  cardElement.name = item[placeName.name], 
  cardElement.link = item[placeLink.name],
  // const cardElement = {
  // name: placeName.value, 
  // link: placeLink.value
  // }
  cardSection.addItem(renderCard(cardElement)); // ПР8 вставляем новую карточку
  renderCard(cardElement);
  
  //cardPopupForm.reset(); /// обнуление уже не нужно,  тк мы его сделали уже в функции close // сброс валидности прописала в validate.js
};


//записываем новые значения полей профиля (обработчик отправки формы)
function changProfilePopup(item) { // == ПР8 перенесла в PopupWithForm
  //event.preventDefault();
  const {name, bio} = item; 
  userInfo.setUserInfo(name, bio)
  //userName.textContent = name;
  //userBio.textContent = bio;
  // userName.textContent = profileName.value;
  // userBio.textContent = profileBio.value;
};


// СЛУШАТЕЛИ
// запускаем слушателя функции подстановки переменных 
// в карточку профиля
profileInfoButton.addEventListener('click', function () {
  configprofileEditFormValidator.resetErrors(); // чистим ошибки
  configprofileEditFormValidator.checkButtonValidity(); // чистим кнопку
  
  const {name, bio} = userInfo.getUserInfo()
  profileName.value = name;
  profileBio.value = bio;
  // profileName.value = userName.textContent;
  // profileBio.value = userBio.textContent;

  //fillProfilePopup(popupTypeProfile);
  editProfilePopup.open();//== ПР8 переписала открытие
});


//запускаем слушателя функции добавления нов.карточки
profilePlaceButton.addEventListener('click', () => {
  cardPopupFormValidator.resetErrors(); // чистим ошибки
  cardPopupFormValidator.checkButtonValidity(); // чистим кнопку
  //openPopup(popupTypePlace);
  addCardPopup.open() //== ПР8 переписала открытие
});






// function render(){ // ПР8 перенесено в Section
//   initialCards.forEach(renderCard);
// };
// render();

// const openPhoto = (name, link) => {
//   openPopup(popupTypePhoto);
//   photoUrl.src = link;
//   photoUrl.alt = name;
//   photoName.textContent = name;
// };

// ОБЩИЕ функции для попапов:
// ПР8 перенесено в Popup
// функция открытия попапа по клику на карандашик и крестик
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', pressEsc);
// };

// ПР8 перенесено в Popup
//функция закрытия попапа
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', pressEsc);
// };

// ПР8 перенесено в Popup
//закрытие попапа при нажатии на esc 
// function pressEsc (event) {
//   if (event.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     //const formElement = openedPopup.querySelector('.popup__form')  
//     closePopup(openedPopup);
//   };
// };

// ПР8 перенесено в Popup
// функция объединяет обработчик оверлея и крестик
// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (event) => {
//     if (event.target.classList.contains('popup_opened')) {
//       closePopup(popup)
//     };
//     if (event.target.classList.contains('popup__close-popup')) {
//       closePopup(popup)
//     };
//   });
// });

// добавляем переменные имени и деятельности в поля попапа (автозаполнение):
// function fillProfilePopup(popup) { // перенесла fillProfilePopup сразу в слушателя клика profileInfoButton == ПР8
//   openPopup(popup);
//   profileName.value = userName.textContent;
//   profileBio.value = userBio.textContent;
// };

// СЛУШАТЕЛИ
// запускаем слушателя функции подстановки переменных 

//слушатель сохранения данных в профиле (по кнопке сохранить)
// profilePopupForm.addEventListener('submit', function (evt) {
//   changProfilePopup(evt);
//   closePopup(popupTypeProfile);
// });

//слушатель сохранения карточки (по кнопке создать)
// ПР8 закрываем через close в классе PopupWithForm
// cardPopupForm.addEventListener('submit', (evt) => {
//   fillPlacePopup(evt);
//   closePopup(popupTypePlace);
// });

// слушатель попапа закрытия попапа фото теперь не нужен
// действие объединено в объединенном обработчике оверлея и крестик