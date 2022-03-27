import { Popup } from "./Popup.js"

export class PopupWithImage extends Popup {
  constructor(popupSelector, photoUrl, photoName){
    super(popupSelector);
    this._photoUrl = photoUrl
    this._photoName = photoName
};

  open(name, link) {
    super.open() // зову родительский одноименный метод из Popup
    this._photoUrl.src = link
    this._photoUrl.alt = name
    this._photoName.textContent = name
  };
}