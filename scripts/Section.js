export class Section {
    constructor ({items, renderer}, containerSelector){
      this._container = document.querySelector(containerSelector);
      this._items = items;
      this._renderer = renderer;
      }
  
    //перебираем как  initialCards
    renderItems(){
      this._items.forEach(item => { // объект с полями {name, link} 
        this._renderer(item, this._container) // зовем функцию рендерер,  передавая туда item (альт.вар data),  вторым аргументом может быть this._container (в вебинаре используется)
      })
    };
  
    addItem(element){
      this._container.prepend(element);
    };
  
  }
  
  //new Section ({items: [{name: '', link: ''}, {name: '', link: ''} ], renderer: () => {wrap.prepend(...) } }, '.list')