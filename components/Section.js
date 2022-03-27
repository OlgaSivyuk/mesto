export class Section {
  constructor ({items, renderer}, containerSelector){
    this._container = document.querySelector(containerSelector);
    this._items = items;
    this._renderer = renderer;
  };
  
  renderItems(){ //перебираем как initialCards
    this._items.forEach(item => { // объект с полями {name, link} 
      this._renderer(item, this._container) // зовем функцию рендерер
    });
  };
  
    addItem(element){
      this._container.prepend(element);
    };  
}