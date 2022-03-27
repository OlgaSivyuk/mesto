// Отображаем карточки из готового массива
export const initialCards = [
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



//ПРОФИЛЬ объявляем переменные
export const profileInfoButton = document.querySelector('.profile__add-info'); 
export const popupTypeProfile = document.querySelector('.popup_type_profile');
export const profileName = document.getElementById('name');
export const profileBio = document.getElementById('bio');
// форма редактирования профиля (используется в ПР7 formValidation)
export const configprofileEditForm = document.querySelector('.popup__form_profile');
//не использовались
const userName = document.querySelector('.profile__name'); 
const userBio = document.querySelector('.profile__bio'); 
const profilePopupForm = popupTypeProfile.querySelector('.popup__form');
const profilePopupClosingButton = popupTypeProfile.querySelector('.popup__close-popup');
const profileSubmitButton = popupTypeProfile.querySelector('.popup__submit');


//КАРТОЧКА МЕСТА объявляем переменные
export const profilePlaceButton = document.querySelector('.profile__add-place');
export const popupTypePlace = document.querySelector('.popup_type_place');
export const placeName = document.getElementById('place-name');
export const placeLink = document.getElementById('place-link');
// форма добавления карточек (используется в ПР7 formValidation)
export const cardPopupForm = popupTypePlace.querySelector('.popup__form');
//не использовались
const placesSection = document.querySelector('.places');
const cardPopupClosingButton = popupTypePlace.querySelector('.popup__close-popup'); 
const placeSubmitButton = popupTypePlace.querySelector('.popup__submit');


//ФОТО
export const popupTypePhoto = document.querySelector('.popup_type_photo');
export const photoUrl = document.querySelector('.popup__photo-url');
export const photoName = document.querySelector('.popup__photo-name');
//не использовались
const photoPopupClosingButton = popupTypePhoto.querySelector('.popup__close-popup');
const placeImage = document.querySelector('.place__image');

//ПОПАПЫ
const popups = Array.from(document.querySelectorAll('.popup'));