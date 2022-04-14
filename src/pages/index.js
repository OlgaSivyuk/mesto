import { 
  profileInfoButton,
  profileAvatarButton,
  profileName,
  profileBio,
  profileAvatar,
  configprofileEditForm,
  configprofileAvatarForm,
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

import { api} from '../components/Api.js'; //импортим сам экземпляр класса апи, а не сам класс

import '../pages/index.css';

// ==ПР7 создаем валидаторы форм
const cardPopupFormValidator = new FormValidator(config, cardPopupForm); 
const configprofileEditFormValidator = new FormValidator(config, configprofileEditForm); 
const configprofileAvatarFormValidator = new FormValidator(config, configprofileAvatarForm); 
// вызываем функцию для отображения модалок
cardPopupFormValidator.enableValidation();
configprofileEditFormValidator.enableValidation();
configprofileAvatarFormValidator.enableValidation();

// ==ПР8 записываем новые значения полей профиля
const userInfo = new UserInfo ({profileNameSelector: '.profile__name', profileBioSelector: '.profile__bio', profileAvatarSelector: '.profile__avatar' })


//------ редактируем данные профиля --------

let userId

// ==ПР9 зовем метод из класса АПИ, достаем данные профиля
api.getProfile() 
  .then(res => {
    //console.log('ответ профайл', res)
    userInfo.setUserInfo(res.name, res.about)
    userId = res._id
  });


//------ меняем аватар --------
// ==ПР9 меняем аватарку
const avatarPopup = new PopupWithForm('.popup_type_profile-avatar', changeProfileAvatarPopup)

function changeProfileAvatarPopup(avatar) {
  avatarPopup.renderLoading(true)
  api.editProfileAvatar(avatar[profileAvatar.name])
  .then(res => {
    console.log('ответ аватар', res)
    userInfo.setUserAvatar(avatar['profile-avatar-link'])
  })
    .catch(err => console.log(err))
    .finally(() => avatarPopup.renderLoading(false));
}

avatarPopup.setEventListeners()


//------ меняем данные профиля --------

const editProfilePopup = new PopupWithForm('.popup_type_profile', changeProfilePopup); //changProfilePopup = handleFormSubmit
  
function changeProfilePopup (item) { 
  const {name, bio} = item; 
  editProfilePopup.renderLoading(true)
  api.editProfile(name, bio)
    .then(res => {
      //console.log('ответ', res)
      userInfo.setUserInfo(res.name, res.about)
    })
    .catch(err => console.log(err))
    .finally(() => editProfilePopup.renderLoading(false));
};

editProfilePopup.setEventListeners() // делаем подписки на закрытие попапа профиля


// ==ПР9 зовем метод из класса АПИ, достаем данные карточек
api.getInitialCards()
  .then(cardList => {
    console.log('ответ карточка', cardList)
    cardList.forEach(item => {
      const cardElement = renderCard({
        name: item.name, 
        link: item.link,
        likes: item.likes,
        cardId: item._id,
        userId: userId,
        ownerId: item.owner._id,
    });
    cardSection.addItem(cardElement)
  })
})


//------ отрисовка массива карточки  --------
// ==ПР8 передали в Section, что отрисовать (initialCards) и чем отрисовать (renderer)
const cardSection = new Section ({
  items: [], // ==ПР9 нам не нужно отрисовывать initialCards, поэтому пусто 
    renderer: (item) => {
    cardSection.addItem(renderCard(item));
    },
  }, 
  '.places');
  
cardSection.renderItems() 


//------ создаем новую карточку и отслеживаем реакции --------

function renderCard(item) {
  const newCard = new Card(
    item,
    '.template', 
    handleImageClick,
    (cardId) => { //  handleDeleteClick
      console.log('clicked button')
      console.log('', cardId)
      confirmPopup.open();
      confirmPopup.changeSubmitHandler(() => {
        console.log(cardId);
        api.deleteCard(cardId) // id нам нужно передать внутрь карточки newCard
          .then(res => {
          console.log('res', res);
          newCard.deleteCard();
          })
      })
    },
    (cardId) => { //handleLikeCklick
      console.log('like');
      if (newCard.isLiked()){ //если карточка с лайком ==> удали лайк
        api.deleteLike(cardId)
        .then(res => { 
          console.log('удаляю лайк', res);
          newCard.setLikes(res.likes) 
        })
      } else { // если лайка нет ==> поставь лайк
          api.addLike(cardId)
            .then(res => { 
              console.log('ставлю лайк', res);
              newCard.setLikes(res.likes)
            })
        } 
    }
    );
  const cardElement = newCard.cardCreate()
  return cardElement; // ПР8 возврящаю карточку
};


// ==ПР8 заполняем, сохраняем и вставляем новую карточку
const addCardPopup = new PopupWithForm('.popup_type_place', fillPlacePopup); //fillPlacePopup = handleFormSubmit

function fillPlacePopup(item) { //заполняем карточку с местом
  addCardPopup.renderLoading(true)
  api.addNewCard(
    item[placeName.name], 
    item[placeLink.name]
  )
    .then(res =>{
      //console.log("res", res)
      const cardElement = renderCard({
        name: res.name, 
        link: res.link,
        likes: res.likes,
        cardId: res._id,
        userId: userId,
        ownerId: res.owner._id,
      });
    cardSection.addItem(cardElement);  
   })
  .catch(err => console.log(err))
  .finally(() => addCardPopup.renderLoading(false));
};

addCardPopup.setEventListeners() 


//------ показываем попап с картинкой --------

const imagePopup = new PopupWithImage('.popup_type_photo');

const handleImageClick = (name,link) => { 
  imagePopup.open(name,link);
};

imagePopup.setEventListeners() 


//------ уточняем удаление карточки --------

const confirmPopup = new PopupWithForm('.popup_type_delete-card')

confirmPopup.setEventListeners() // делаем подписку для закрытия попапа подтверждения


//------ слушатели --------
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
});

//запускаем слушателя функции обновления аватара
profileAvatarButton.addEventListener('click', () => {
  configprofileAvatarFormValidator.resetErrors(); 
  configprofileAvatarFormValidator.checkButtonValidity();
  avatarPopup.open();  
})