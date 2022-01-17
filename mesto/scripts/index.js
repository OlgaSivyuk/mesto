const openPopupProfile = document.querySelector('.button__add_info');
const closePopup = document.querySelector('.button__close_popup');
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const popupBody = document.querySelector('.popup__body');
const popupEdit = document.querySelector('.popup_edit');
const userName = document.querySelector('.profile__name'); 
const userBio = document.querySelector('.profile__bio'); 
const profileName = document.getElementById('name');
const profileBio = document.getElementById('bio');
const submitProfile = document.querySelector('.button__submit');
const buttonSaveCloseProfile = document.querySelector('.button_save-and-close');
const editForm = popupEdit.querySelector('.popup__form');

// открываем попап по клику на кнопку с карандашиком (active использую вместо popup_opened из ТЗ)
function popupOpen(event) {
  popup.classList.add('popup_opened');
}
openPopupProfile.addEventListener('click', popupOpen);

// закрываем попап по клику на крестик
function popupClose(event) {
  popup.classList.remove('popup_opened');
}
closePopup.addEventListener('click', popupClose);

//закрываем попап по клику на подложку попапа (условие работает при сбросе стандартного поведения)
popupContainer.addEventListener('click', function(event) {
  if(!event.defaultPrevented) {
    popupClose();
  }
})
popupBody.addEventListener('click', function(e) {
  e.stopPropagation();
});

// добавляем переменные имени и деятельности в поля попапа (автозаполнение):
// 1. создаем функцию filledPopupProf
// 2. активируем функцию открыть попап заданную ранее (popupOpen c ключем редактирования попапа popupEdit)
// 3. для свойства value получили ключи полей profileName и profileBio
// 4. подставили в поля значения имеющихся переменных userName и userBio
function filledProfilePopup() {
  popupOpen(popupEdit);
  profileName.value = userName.textContent;
  profileBio.value = userBio.textContent;
};
// запускаем слушателя функции подстановки переменных
openPopupProfile.addEventListener('click', filledProfilePopup);

//записываем новые значения полей профиля при нажатии на кнопку "сохранить" и закрываем попап (обработчик отправки формы)
// 1. создаем функцию 
// 2. сбрасываем стандартное поведение отправки формы при перезагрузке страницы
// 3. прописываем где должны вставиться значения (новые значения) полей на странице с помощью textContent
function changedProfilePopup(event) {
  event.preventDefault();
  userName.textContent = profileName.value;
  userBio.textContent = profileBio.value;
  popupClose(popupEdit);
}
//запускаем слушателя функции изменения данных в профиле
editForm.addEventListener('submit', changedProfilePopup);

//закрываем по клику на кнопку "сохранить", запускаем слушателя функции закрытия попапа
buttonSaveCloseProfile.addEventListener('click',function() {
  popupClose(popupEdit)
});