// // Отображаем карточки из готового массива
// const Piter = new URL ('../images/piter.jpeg', import.meta.url);
// //import Piter from '../images/piter.jpeg';
// const Sochi = new URL ('../images/arkhyz.jpg', import.meta.url);
// const Kolsky = new URL ('../images/kolsky.jpg', import.meta.url);
// const Kamchatka = new URL ('../images/kamchatka.jpg', import.meta.url);
// const Altay = new URL ('../images/altay.jpg', import.meta.url);
// const Cherkesiya = new URL ('../images/cherkesiya.jpg', import.meta.url);

// export const initialCards = [
//     {
//       name: 'Питер',
//       link: Piter
//     },
//     {
//       name: 'Сочи',
//       link: Sochi
//     },
//     {
//       name: 'Кольский',
//       link: Kolsky
//     },
//     {
//       name: 'Камчатка',
//       link: Kamchatka
//     },
//     {
//       name: 'Алтай',
//       link: Altay
//     },
//     {
//       name: 'Карачаево-Черкесия',
//       link: Cherkesiya
//     }
//   ];


export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
    };
  

//ПРОФИЛЬ объявляем переменные
export const profileInfoButton = document.querySelector('.profile__add-info');
export const profileAvatarButton = document.querySelector('.profile__avatar-button'); // кнопка редактирования аватара
export const popupTypeProfile = document.querySelector('.popup_type_profile');
export const profileName = document.getElementById('name');
export const profileBio = document.getElementById('bio');
export const profileAvatar = document.getElementById('profile-avatar-link');
//export const profileAvatar = document.getElementById('profile-avatar')

// форма редактирования профиля (используется в ПР7 formValidation)
export const configProfileEditForm = document.querySelector('.popup__form_profile');

// форма редактирования аватарки профиля ПР9
export const configProfileAvatarForm = document.querySelector('.popup__form_profile-avatar')

//КАРТОЧКА МЕСТА объявляем переменные
export const profilePlaceButton = document.querySelector('.profile__add-place');
export const popupTypePlace = document.querySelector('.popup_type_place');
export const placeName = document.getElementById('place-name');
export const placeLink = document.getElementById('place-link');
// форма добавления карточек (используется в ПР7 formValidation)
export const cardPopupForm = popupTypePlace.querySelector('.popup__form');

//ФОТО
export const popupTypePhoto = document.querySelector('.popup_type_photo');
//export const photoUrl = document.querySelector('.popup__photo-url');
//export const photoName = document.querySelector('.popup__photo-name');
