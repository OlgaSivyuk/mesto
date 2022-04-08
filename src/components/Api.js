class Api {
    constructor({baseUrl, headers}) {
      this._headers = headers; // здесь заложен уникальный токен авторизации тип контента
      this._baseUrl = baseUrl; // https://mesto.nomoreparties.co/v1/cohort-39/ подставляется в fetch перед хвостом
    }
  
    getProfile() { // метод для подстановки данных профиля // по умолчанию Get
      //console.log('getProfile');
      return fetch(`${this._baseUrl}/users/me`, { // применяем шаблонные строки ${}
        headers: this._headers
     })
      .then((res) => res.ok ? res.json(): 
        Promise.reject(res.status))
        //console.log('res', res)
      .catch(console.log)
      //.then(res => {
      //    console.log('res', res)    
      //})
    }
  
  
  }
  
  
  
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39', // здесь указываем свою когорту
    headers: {
      authorization: '88e16114-a16c-404a-8007-3bb931ff1f77', // здесь указываем свой токен
      //authorization: '2e5af95a-25b4-4742-9ead-1326c8073602', // здесь указываем свой токен
      'Content-Type': 'application/json'
    }
  }); 