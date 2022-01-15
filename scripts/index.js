const openPopupProfile = document.querySelector('.button__add_info');
const closePopup = document.querySelector('.button__close_popup');
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const popupBody = document.querySelector('.popup__body');

function popupOpen(event) {
  popup.classList.add('active');
}
openPopupProfile.addEventListener('click', popupOpen);

function popupClose(event) {
  popup.classList.remove('active');
}
closePopup.addEventListener('click', popupClose);

//закрытие по клику на подложку попапа
popupContainer.addEventListener('click', function(event) {
  if(!event.defaultPrevented) {
    popupClose();
  }
})
popupBody.addEventListener('click', function(e) {
  e.preventDefault();
});