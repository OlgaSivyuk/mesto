export class Popup {
    constructor (popupSelector){
      this._popup = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
  
      }
  
      open(){
        this._popup.classList.add('popup_opened'); //popup меняем на this._popup, который мы уже поискали в конструкторе
        document.addEventListener('keydown', this._handleEscClose);
      };
  
      close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);    
      };
  
      //без стрелочной функции this теряет контекст,  можем привязать к контексту с помощью bind
      _handleEscClose(event){
        if (event.key === 'Escape') {
          this.close()// просто проверяем,  если кнопка esc, то закрываем close
          };
      };
      // альтернатива со стрелочной функцией
      // _handleEscClose = (event) => {
      //     if (event.key === 'Escape') {
      //       this.close()
      //     }
      //   }
  
      setEventListeners(){
        this._popup.addEventListener('mousedown', (event) => {
          if (event.target.classList.contains('popup_opened')) {
            this.close()
          };
          if (event.target.classList.contains('popup__close-popup')) {
            this.close()
          };
  
        });
      };
  }