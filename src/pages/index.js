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
  config } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import '../pages/index.css';

// ==ПР7 создаем валидаторы форм
const cardPopupFormValidator = new FormValidator(config, cardPopupForm); // ищем внутри модалки добавления карточек cardPopupForm
const configprofileEditFormValidator = new FormValidator(config, configprofileEditForm); // ищем форму редактирования профиля внутри модалки configprofileEditForm
// вызываем функцию для отображения модалок
cardPopupFormValidator.enableValidation();
configprofileEditFormValidator.enableValidation();

// универсально создаем экземпляры валидаторов всех форм(рекомендация)
// почему-то с универсальной версией не находит resetErrors и checkButtonValidity

//const formValidators = {}
// Включение валидации
// const enableValidation = (config) => {
// const formList = Array.from(document.querySelectorAll('.popup__form'))
// formList.forEach((formElement) => {
//   const validator = new FormValidator(config, formElement)
//   const formName = formElement.getAttribute('name'); // получаем данные из атрибута `name` у формы

//   formValidators[formName] = validator;  // объект записываем под именем формы
//   validator.enableValidation();
// });
// };

// enableValidation(config);


// ==ПР8 показываем попап с картинкой
const imagePopup = new PopupWithImage('.popup_type_photo');

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
const addCardPopup = new PopupWithForm('.popup_type_place', fillPlacePopup); //fillPlacePopup = handleFormSubmit

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
const editProfilePopup = new PopupWithForm('.popup_type_profile', changProfilePopup); //changProfilePopup = handleFormSubmit
  
function changProfilePopup(item) {
  const {name, bio} = item; 
  userInfo.setUserInfo(name, bio)
};

editProfilePopup.setEventListeners() // делаем подписки на закрытие попапа профиля


// запускаем слушателя функции подстановки заполнения профиля
profileInfoButton.addEventListener('click', function () {
  // formValidators['.popup__form_profile'].resetErrors()
  // formValidators['.popup__form_profile'].checkButtonValidity()
  configprofileEditFormValidator.resetErrors();
  configprofileEditFormValidator.checkButtonValidity();
  const {name, bio} = userInfo.getUserInfo()
  profileName.value = name;
  profileBio.value = bio;
  editProfilePopup.open();
});

//запускаем слушателя функции добавления нов.карточки
profilePlaceButton.addEventListener('click', () => {
  // formValidators['.popup__form'].resetErrors()
  // formValidators['.popup__form'].checkButtonValidity()
  cardPopupFormValidator.resetErrors(); 
  cardPopupFormValidator.checkButtonValidity();
  addCardPopup.open();
})