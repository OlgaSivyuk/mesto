//ПРОФИЛЬ объявляем переменные
const profileEditInfo = document.querySelector('.profile__add-info'); 
const userName = document.querySelector('.profile__name'); 
const userBio = document.querySelector('.profile__bio'); 
const popupTypeProfile = document.querySelector('.popup_type_profile');
const profileName = document.getElementById('name');
const profileBio = document.getElementById('bio');
const closeProfilePopup = popupTypeProfile.querySelector('.popup__close-popup'); 
const editProfilePopupForm = popupTypeProfile.querySelector('.popup__form');
//const submitButtonProfile = document.querySelector('.popup__submit'); //еще не использовался

//КАРТОЧКА МЕСТА объявляем переменные
const profileAddPlace = document.querySelector('.profile__add-place');
const popupTypePlace = document.querySelector('.popup_type_place');
const placeName = document.getElementById('place-name');
const placeLink = document.getElementById('place-link');
const closeCardPopup = popupTypePlace.querySelector('.popup__close-popup'); 
const editCardPopupForm = popupTypePlace.querySelector('.popup__form');
const submitButtonPlace = popupTypePlace.querySelector('.popup__submit');
const places = document.querySelector('.places');


//ФОТО
const placeImage = document.querySelector('.place__image');
const popupTypePhoto = document.querySelector('.popup_type_photo');
const PhotoUrl = document.querySelector('.popup__photo-url');
const PhotoName = document.querySelector('.popup__photo-name');
const closePhotoPopup = popupTypePhoto.querySelector('.popup__close-popup');


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

const renderCard = (item) => {
  const cardElement = cardTemplate.cloneNode(true);
  
  cardElement.querySelector('.place__name').textContent = item.name;
  cardElement.querySelector('.place__image').src = item.link;
  cardElement.querySelector('.place__image').alt = item.name;
  
  actionWithCard(cardElement, item);
  
  

  places.prepend(cardElement); // содержание склонированного template добавляется в cardElement(.place)
  return cardElement;
};

function render() {
  initialCards.forEach(renderCard);
};
render();

//СОЗДАНИЕ НОВОЙ КАРТОЧКИ с местом // КАК сделать так,  чтобы карточка размещалась в начале спискка (prepend)
function filledPlacePopup (evt) {
  evt.preventDefault();
  places.prepend(
    renderCard({ name: placeName.value, link: placeLink.value})
  );
  placeName.value = '';
  placeLink.value = '';
  popupClose(popupTypePlace);
};

editCardPopupForm.addEventListener('submit', filledPlacePopup)// запускаем слушателя новой заполненной карточки места


// ФУНКЦИЯ СЛУШАТЕЛЯ реакций для карточки (удаление,  лайки, открытие фото)
function actionWithCard(element, item) {
  element.querySelector('.place__delete').addEventListener('click', deleteCard);
  element.querySelector('.place__like').addEventListener('click', likeCard);
  element.querySelector('.place__image').addEventListener('click', () => photoOpen(item));
  //element.querySelector('.place__image').addEventListener('click', () => photoClose);
};

function deleteCard(evt) {
  evt.target.closest('.place').remove();
};

function likeCard(evt) {
  evt.target.classList.toggle('place__like_active');
};

function photoOpen(item) {
  popupTypePhoto.classList.add('popup_opened');
  PhotoUrl.src = item.link;
  PhotoUrl.alt = item.name;
  PhotoName.textContent = item.name;
  //console.log(popupTypePhoto);
};



// ПРОФИЛЬ запускаем функции
// добавляем переменные имени и деятельности в поля попапа (автозаполнение):
function filledProfilePopup() {
  popupOpen(popupTypeProfile);
  profileName.value = userName.textContent;
  profileBio.value = userBio.textContent;
};

//записываем новые значения полей профиля при нажатии на кнопку "сохранить" и закрываем попап (обработчик отправки формы)
function changedProfilePopup(event) {
  event.preventDefault();
  userName.textContent = profileName.value;
  userBio.textContent = profileBio.value;
  popupClose(popupTypeProfile);
}

// ОБЩИЕ функции для попапов:
// функция открытия попапа по клику на кнопку с карандашиком
function popupOpen(evt) {
  evt.classList.add('popup_opened');
}
//функция закрытия попапа по клику на крестик
function popupClose(evt) {
  evt.classList.remove('popup_opened');
}


closeProfilePopup.addEventListener('click', () => popupClose(popupTypeProfile)); //запускаем слушателя функция закрытия попапа по клику на крестик
profileEditInfo.addEventListener('click', filledProfilePopup); // запускаем слушателя функции подстановки переменных
editProfilePopupForm.addEventListener('submit', changedProfilePopup); //запускаем слушателя функции изменения данных в профиле

//КАРТОЧКА МЕСТА запускаем функции
profileAddPlace.addEventListener('click', () => popupOpen(popupTypePlace)); // запускаем слушателя запуска функция открытия попапа по клику на кнопку с плюсом
closeCardPopup.addEventListener('click', () => popupClose(popupTypePlace)); // запускаем слушателя функция закрытия попапа по клику на крестик

closePhotoPopup.addEventListener('click', () => popupClose(popupTypePhoto));