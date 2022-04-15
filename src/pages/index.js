import { 
  profileInfoButton,
  profileAvatarButton,
  profileName,
  profileBio,
  profileAvatar,
  configProfileEditForm,
  configProfileAvatarForm,
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
const configProfileEditFormValidator = new FormValidator(config, configProfileEditForm); 
const configProfileAvatarFormValidator = new FormValidator(config, configProfileAvatarForm); 
// вызываем функцию для отображения модалок
cardPopupFormValidator.enableValidation();
configProfileEditFormValidator.enableValidation();
configProfileAvatarFormValidator.enableValidation();

// ==ПР8 записываем новые значения полей профиля
const userInfo = new UserInfo ({profileNameSelector: '.profile__name', profileBioSelector: '.profile__bio', profileAvatarSelector: '.profile__avatar' })


//------ редактируем данные профиля --------

let userId

//------ меняем аватар --------
// ==ПР9 меняем аватарку
const avatarPopup = new PopupWithForm('.popup_type_profile-avatar', changeProfileAvatarPopup)

function changeProfileAvatarPopup(avatar) {
  avatarPopup.renderLoading(true)
  api.editProfileAvatar(avatar[profileAvatar.name])
  .then(() => {
    userInfo.setUserAvatar(avatar['profile-avatar-link'])
    avatarPopup.close() 
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
      userInfo.setUserInfo(res.name, res.about)
      editProfilePopup.close()
    })
    .catch(err => console.log(err))
    .finally(() => editProfilePopup.renderLoading(false));
};

editProfilePopup.setEventListeners() // делаем подписки на закрытие попапа профиля


//------ создание массива карточки  --------
// ==ПР8 передали в Section, что отрисовать (initialCards) и чем отрисовать (renderer)
const cardSection = new Section ({
  renderer: (item) => {
  cardSection.addItem(renderCard(item));
  },
}, 
'.places');

//------ отрисовка данных профиля и массива карточек  -------

Promise.all([api.getProfile(), api.getUsersCards()])
.then(([userData, cardList]) => {
  userInfo.setUserInfo(userData.name, userData.about);
  userInfo.setUserAvatar(userData.avatar);
  userId = userData._id
  
  const usersCard = cardList.map(item => ({ 
    name: item.name, 
    link: item.link,
    likes: item.likes,
    cardId: item._id,
    userId: userId,
    ownerId: item.owner._id,

  }))
   cardSection.renderItems(usersCard.reverse())
})
.catch(err => console.log(err))

//------ создаем новую карточку и отслеживаем реакции --------

function renderCard(item) {
  const newCard = new Card(
    item,
    '.template', 
    handleImageClick,
    (cardId) => { //  handleDeleteClick
      confirmPopup.open();
      confirmPopup.changeSubmitHandler(() => {
        api.deleteCard(cardId) // id нам нужно передать внутрь карточки newCard
          .then(() => {
          newCard.deleteCard();
          confirmPopup.close()
          })
          .catch(err => console.log(err))
      })
    },
    (cardId) => { //handleLikeCklick
      if (newCard.isLiked()){ //если карточка с лайком ==> удали лайк
        api.deleteLike(cardId)
        .then(res => { 
          newCard.setLikes(res.likes) 
        })
        .catch(err => console.log(err))
      } else { // если лайка нет ==> поставь лайк
          api.addLike(cardId)
            .then(res => { 
              newCard.setLikes(res.likes)
            })
            .catch(err => console.log(err))
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
      const cardElement = renderCard({
        name: res.name, 
        link: res.link,
        likes: res.likes,
        cardId: res._id,
        userId: userId,
        ownerId: res.owner._id,
      });
    cardSection.addItem(cardElement); 
    addCardPopup.close()
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
  configProfileEditFormValidator.resetErrors();
  configProfileEditFormValidator.checkButtonValidity();
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
  configProfileAvatarFormValidator.resetErrors(); 
  configProfileAvatarFormValidator.checkButtonValidity();
  avatarPopup.open();  
})