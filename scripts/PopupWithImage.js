import { Popup } from "./Popup.js"

export class PopupWithImage extends Popup {
  constructor(popupSelector, photoUrl, photoName){
    super(popupSelector);
    this._photoUrl = photoUrl
    this._photoName = photoName
    // this._photoUrl = this._popup.querySelector('.popup__photo-name')
    // this._photoName = this._popup.querySelector('.popup__photo-url')
    // в вебинаре предлагается без обозначения переменных в конструкторе,  а через указание констант в функции open
  };

  open(name, link) {
    super.open() // зову родительский одноименный метод из Popup
    this._photoUrl.src = link
    this._photoUrl.alt = name
    this._photoName.textContent = name

  
  };
}


// export class PopupWithImage extends Popup {

//   open(item) {
//     super.open()
//     const photoName = this._popup.querySelector('.popup__photo-name')
//     const photoUrl = this._popup.querySelector('.popup__photo-url')
//     photoName.textContent = item.name;
//     photoUrl.alt = item.name;
//     photoUrl.src = item.link;
//   }
// }


//popup_type_photo
//popup__photo-url
//popup__photo-name

//const popup = new PopupWithImage('.popup_type_photo'); позовем в js
// popup.open ('', '') // позовем в js
//popup.close()
//popup._popup