import { Popup } from "./Popup.js"

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._photoUrl = this._popup.querySelector('.popup__photo-url');
    this._photoName = this._popup.querySelector('.popup__photo-name');
};

  open(name, link) {
    this._photoUrl.src = link
    this._photoUrl.alt = name
    this._photoName.textContent = name
    super.open() // зову родительский одноименный метод из Popup
  };
}