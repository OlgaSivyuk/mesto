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
const PhotoUrl = document.querySelector('.popup__photo-url');
const PhotoName = document.querySelector('.popup__photo-name');
const photoPopupClosingButton = popupTypePhoto.querySelector('.popup__close-popup');

// Отображаем карточки из готового массива
const initialCards = [
  {
    name: 'Питер',
    link: './images/piter.jpeg'
  },
  {
    name: 'Сочи',
    link: './images/arkhyz.jpg'
  },
  {
    name: 'Кольский',
    link: './images/kolsky.jpg'
  },
  {
    name: 'Камчатка',
    link: './images/kamchatka.jpg'
  },
  {
    name: 'Алтай',
    link: './images/altay.jpg'
  },
  {
    name: 'Карачаево-Черкесия',
    link: './images/cherkesiya.jpg'
  }
];

//ТЕМПЛЕЙТ
const cardTemplate = document.querySelector('.template').content; // взяли контент из блока template и положили в новую карточку cardElement

const cardRender = (item) => {
  const cardElement = cardTemplate.cloneNode(true);
  
  cardElement.querySelector('.place__name').textContent = item.name;
  cardElement.querySelector('.place__image').src = item.link;
  cardElement.querySelector('.place__image').alt = item.name;
  
  interactWithCard(cardElement, item);
  
  placesSection.prepend(cardElement); // содержание склонированного template добавляется в cardElement(.place)
  return cardElement;
};

function render() {
  initialCards.forEach(cardRender);
};
render();

//Евгений,  просьба немного раскрыть комментарий 
//"Функция создания карточки не должна заниматься вставкой в разметку",  
//если убранных значений имени и ссылки не достаточно
//и к сожалению, не видела твои первые комментарии,  видимо вносила правки параллельно 
//и не ожидала такого скорого ответа. Если они отличались от текущих, можно их продублировать? 
//Заранее благодарю)

//СОЗДАНИЕ НОВОЙ КАРТОЧКИ с местом
function fillPlacePopup(evt) {
  evt.preventDefault();
  placesSection.prepend(
    cardRender({ name: placeName.value, link: placeLink.value})
  );
  //placeName.value = '';
  //placeLink.value = '';
  closePopup(popupTypePlace);
};

// КАРТОЧКИ места функция слушателя реакций (удаление,  лайки, открытие фото)
function interactWithCard(element, item) {
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
  PhotoUrl.src = item.link;
  PhotoUrl.alt = item.name;
  PhotoName.textContent = item.name;
};

// ПРОФИЛЬ
// добавляем переменные имени и деятельности в поля попапа (автозаполнение):
function fillProfilePopup() {
  openPopup(popupTypeProfile);
  profileName.value = userName.textContent;
  profileBio.value = userBio.textContent;
};

//записываем новые значения полей профиля при нажатии на кнопку "сохранить" и закрываем попап (обработчик отправки формы)
function changProfilePopup(event) {
  event.preventDefault();
  userName.textContent = profileName.value;
  userBio.textContent = profileBio.value;
  closePopup(popupTypeProfile);
}

// ОБЩИЕ функции для попапов:
// функция открытия попапа по клику на кнопку с карандашиком
function openPopup(evt) {
  evt.classList.add('popup_opened');
}
//функция закрытия попапа по клику на крестик
function closePopup(evt) {
  evt.classList.remove('popup_opened');
}

// ПРОФИЛЬ запускаем функции
profilePopupClosingButton.addEventListener('click', () => closePopup(popupTypeProfile)); //запускаем слушателя функция закрытия попапа по клику на крестик
profileInfoButton.addEventListener('click', fillProfilePopup); // запускаем слушателя функции подстановки переменных
profilePopupForm.addEventListener('submit', changProfilePopup); //запускаем слушателя функции изменения данных в профиле

//КАРТОЧКА МЕСТА запускаем функции
profilePlaceButton.addEventListener('click', () => openPopup(popupTypePlace)); // запускаем слушателя запуска функция открытия попапа по клику на кнопку с плюсом
cardPopupClosingButton.addEventListener('click', () => closePopup(popupTypePlace)); // запускаем слушателя функция закрытия попапа по клику на крестик
cardPopupForm.addEventListener('submit', fillPlacePopup)// запускаем слушателя новой заполненной карточки места

//ФОТО запускаем функции
photoPopupClosingButton.addEventListener('click', () => closePopup(popupTypePhoto));// запускаем слушателя функции закрытия попапа по клику на крестик