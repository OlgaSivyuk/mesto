export class Section {
  constructor ({renderer}, containerSelector){
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  };
  

  renderItems(items){ //перебираем как initialCards
    items.forEach(item => { // объект с полями {name, link} 
      this._renderer(item)// зовем функцию рендерер
    });
  };
  
  addItem(element){
    this._container.prepend(element);
  };  
}