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

import { api} from '../components/Api.js'; //импортим сам экземпляр класса апи, а не сам класс

import '../pages/index.css';

let userId
//==ПР9 зовем метод из класса АПИ
api.getProfile() // работаем с профилем
  .then(res => {
    console.log('ответ профайл', res)
    userInfo.setUserInfo(res.name, res.about)//передаем данные профиля пользователя. name и about это поля,  которые выводятся в ответе на запрос апи,  и соответствуют name и bio
    userId = res._id // получаем в результате вызова getProfile и он не связан с токеном не равен ему
  });

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
    
     //const cardElement = renderCard(item); // альтернативный короткий вариант если нужно передать 
  })
})
  


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
        .then(res => { // 1. получаю ответ
          console.log('удаляю лайк', res);
          newCard.setLikes(res.likes) //2. зову setLikes чтобы обновить счетчик //3. передается кол-во новых лайков //4. новые лайки принимаются в setLikes (newLikes)
        })
      } else { // если лайка нет ==> поставь лайк
          api.addLike(cardId)
            .then(res => { // 1. получаю ответ
              console.log('ставлю лайк', res);
              newCard.setLikes(res.likes) //2. зову setLikes чтобы обновить счетчик //3. передается кол-во новых лайков //4. новые лайки принимаются в setLikes (newLikes)
            })
        } 
    }
    );
  const cardElement = newCard.cardCreate()
  return cardElement; // ПР8 возврящаю карточку
};


// ==ПР8 отрисовка массива карточки, передали в Section, что отрисовать (initialCards) и чем отрисовать (renderer)
const cardSection = new Section ({
  items: [], // ==ПР9 нам не нужно отрисовывать initialCards,  поэтому параметр оставляем пустым, секцию создаем но ничего в ней не рендерим
    renderer: (item) => {
    cardSection.addItem(renderCard(item));
    },
  }, 
  '.places');
  
cardSection.renderItems() // реализуем карточки

// ==ПР8 заполняем, сохраняем и вставляем новую карточку
const addCardPopup = new PopupWithForm('.popup_type_place', fillPlacePopup); //fillPlacePopup = handleFormSubmit

function fillPlacePopup(item) { //заполняем карточку с местом
  // const cardElement = {}
  // cardElement.name = item[placeName.name], 
  // cardElement.link = item[placeLink.name],

  api.addNewCard(
    item[placeName.name], 
    item[placeLink.name]
  )// ==ПР9 вклиниваемся в функцию вставки новой карточки и отправляем запрос на размещение на сервер
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
  // cardSection.addItem(renderCard(cardElement)); // ПР8 вставляем новую карточку
  // renderCard(cardElement);
};

addCardPopup.setEventListeners() // делаем подписки на закрытие попапа карточки места


// ==ПР8 записываем новые значения полей профиля
const userInfo = new UserInfo ({profileNameSelector: '.profile__name', profileBioSelector: '.profile__bio'})
const editProfilePopup = new PopupWithForm('.popup_type_profile', changProfilePopup); //changProfilePopup = handleFormSubmit
  
function changProfilePopup (item) { //changProfilePopup = handleFormSubmit, зовем ее с данными инпутов, которые попадают в текщую функцию в виде item
  const {name, bio} = item; 

  api.editProfile(name, bio)// ==ПР9 вклиниваемся в функцию подстановки данных профиля и отправим запрос на редактирование на сервер //отправляем данные полей на сервер с помощью fetch
    .then(res => { // сначала мы ждем ответ от сервира,  что все ок,  а после выставляем данные на страничку
      //console.log('ответ', res)
      userInfo.setUserInfo(res.name, res.bio)
    })
};

editProfilePopup.setEventListeners() // делаем подписки на закрытие попапа профиля


// ==ПР9 уточняем удаление карточки
const confirmPopup = new PopupWithForm('.popup_type_delete-card') //, () => { // функцию удаления карточки переносим в класс работы с формами PopupWithForm
  //   api.deleteCard(id) // id нам нужно передать внутрь карточки newCard
  //     .then(res => {
  //       console.log('res', res)
  //     })
  //   console.log('delete')
  // });

confirmPopup.setEventListeners() // делаем подписку для закрытия попапа подтверждения


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