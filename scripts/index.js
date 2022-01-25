const openPopupProfile = document.querySelector('.profile__add-info');
const closePopup = document.querySelector('.popup__close-popup');
const popup = document.querySelector('.popup');
const popupBody = document.querySelector('.popup__body');
const userName = document.querySelector('.profile__name'); 
const userBio = document.querySelector('.profile__bio'); 
const profileName = document.getElementById('name');
const profileBio = document.getElementById('bio');
const submitProfile = document.querySelector('.popup__submit');
const editForm = popup.querySelector('.popup__form');

// функция открытия попапа по клику на кнопку с карандашиком
function popupOpen(event) {
  popup.classList.add('popup_opened');
}

// функция закрытия попапа по клику на крестик
function popupClose(event) {
  popup.classList.remove('popup_opened');
}

// добавляем переменные имени и деятельности в поля попапа (автозаполнение):
// 1. создаем функцию filledPopupProf
// 2. активируем функцию открыть попап заданную ранее (popupOpen c ключем редактирования попапа popupEdit)
// 3. для свойства value получили ключи полей profileName и profileBio
// 4. подставили в поля значения имеющихся переменных userName и userBio
function filledProfilePopup() {
  popupOpen(popup);
  profileName.value = userName.textContent;
  profileBio.value = userBio.textContent;
};

//записываем новые значения полей профиля при нажатии на кнопку "сохранить" и закрываем попап (обработчик отправки формы)
// 1. создаем функцию 
// 2. сбрасываем стандартное поведение отправки формы при перезагрузке страницы
// 3. прописываем где должны вставиться значения (новые значения) полей на странице с помощью textContent
function changedProfilePopup(event) {
  event.preventDefault();
  userName.textContent = profileName.value;
  userBio.textContent = profileBio.value;
  popupClose(popup);
}

closePopup.addEventListener('click', popupClose); // запускаем слушателя для закрытия попапа при клике на крестик
openPopupProfile.addEventListener('click', filledProfilePopup); // запускаем слушателя функции подстановки переменных
editForm.addEventListener('submit', changedProfilePopup); //запускаем слушателя функции изменения данных в профиле

//openPopupProfile.addEventListener('click', popupOpen); запускаем слушателя для открытия попапа - открытие уже работает в функции filledProfilePopup

//закрываем попап по клику на подложку попапа (условие работает при сбросе стандартного поведения)
//найти ошибку и пересмотреть код, пока не пойму что не так (закрывается если выделить текст и выйти за рамки попапа)
//popup.addEventListener('click', function(event) {
//    if(!event.defaultPrevented) {
//      popupClose();
//    }
//  })
//  popupBody.addEventListener('click', function(e) {
//      e.preventDefault();
//    });