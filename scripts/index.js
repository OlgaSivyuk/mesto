import { 
  initialCards,
  profileInfoButton,
  profileName,
  profileBio,
  configprofileEditForm,
  profilePlaceButton,
  placeName,
  placeLink,
  cardPopupForm,
  photoUrl,
  photoName } from './constants.js'
import { Card } from './Card.js'
import { FormValidator, config } from './FormValidator.js'
import { Section } from './Section.js'
import { PopupWithImage } from './PopupWithImage.js'
import { PopupWithForm } from './PopupWithForm.js'
import { UserInfo } from './UserInfo.js'



// ==ПР7 создаем и валидируем формы
const cardPopupFormValidator = new FormValidator(config, cardPopupForm); // ищем внутри модалки добавления карточек cardPopupForm
const configprofileEditFormValidator = new FormValidator(config, configprofileEditForm); // ищем форму редактирования профиля внутри модалки configprofileEditForm
// вызываем функцию для отображения модалок
cardPopupFormValidator.enableValidation();
configprofileEditFormValidator.enableValidation();

// ==ПР8 показываем попап с картинкой
const imagePopup = new PopupWithImage('.popup_type_photo', photoUrl, photoName);

imagePopup.setEventListeners() //делаем подписку на закрытие карточки картинки 

const handleImageClick = (name,link) => { 
  imagePopup.open(name,link);
};

// ==ПР7 создаем новую карточку 
function renderCard(item) {
  const newCard = new Card(item, '.template', handleImageClick);
  const cardElement = newCard.cardCreate()
  return cardElement; // ПР8 возврящаю карточку
};


// ==ПР8 отрисовка массива карточки, передали в Section, что отрисовать (initialCards) и чем отрисовать (renderer)
const cardSection = new Section ({
  items: initialCards, 
    renderer: (item) => {
    cardSection.addItem(renderCard(item));
    },
  }, 
  '.places');
  
cardSection.renderItems() // реализуем карточки

// ==ПР8 заполняем, сохраняем и вставляем новую карточку
const addCardPopup = new PopupWithForm('.popup_type_place', fillPlacePopup);

function fillPlacePopup(item) { //заполняем карточку с местом
  const cardElement = {}
  cardElement.name = item[placeName.name], 
  cardElement.link = item[placeLink.name],
  cardSection.addItem(renderCard(cardElement)); // ПР8 вставляем новую карточку
  renderCard(cardElement);
};

addCardPopup.setEventListeners() // делаем подписки на закрытие попапа карточки места


// ==ПР8 записываем новые значения полей профиля
const userInfo = new UserInfo ({profileNameSelector: '.profile__name', profileBioSelector: '.profile__bio'})
const editProfilePopup = new PopupWithForm('.popup_type_profile', changProfilePopup);
  
function changProfilePopup(item) {
  const {name, bio} = item; 
  userInfo.setUserInfo(name, bio)
};

editProfilePopup.setEventListeners() // делаем подписки на закрытие попапа профиля


// запускаем слушателя функции подстановки заполнения профиля
profileInfoButton.addEventListener('click', function () {
  configprofileEditFormValidator.resetErrors();
  configprofileEditFormValidator.checkButtonValidity();
  const {name, bio} = userInfo.getUserInfo()
  profileName.value = name;
  profileBio.value = bio;
  editProfilePopup.open();
});

//запускаем слушателя функции добавления нов.карточки
profilePlaceButton.addEventListener('click', () => {
  cardPopupFormValidator.resetErrors(); 
  cardPopupFormValidator.checkButtonValidity();
  addCardPopup.open();
})