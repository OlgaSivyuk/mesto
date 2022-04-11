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
    .then(res => res.ok ? res.json(): 
      Promise.reject(res.status))
      //console.log('res', res)
    .catch(console.log)
    // .then((res) => {
    //   console.log('res', res)    
    // })
  }
  
  getInitialCards() { // метод для подстановки данных карточек // по умолчанию Get
    return fetch(`${this._baseUrl}/cards`, { // 1. отправляем headers
        headers: this._headers
    })
    .then(res => res.ok ? res.json():  //2. проверяем,  что сервер ответил успешно res.ok // 3. если успешно,  делаем из ответа объект res.json() 
      Promise.reject(res.status)) //4. если ответ не успешный,  то проваливаемся в ошибку  выводим catch
    .catch(console.log)
  }
  
  editProfile(name, about) { // метод для внесения изменений в профиль // метод patch
    return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH", // этот метод значит, что я меняю текущие данные на сервере
        headers: this._headers,
        body: JSON.stringify({ // делаем из объекта строку для передачи данных
            name,
            about
        })
    })
    .then(res => res.ok ? res.json():
      Promise.reject(res.status))
    .catch(console.log)
  }

  addNewCard(name, link) { // метод добавления новой карточки // метод post
    return fetch(`${this._baseUrl}/cards`, {
        method: "POST", // этот метод принимает данные на хранение, используется при загрузке файлов
        headers: this._headers,
        body: JSON.stringify({
            name,
            link
          })
    })
    .then(res => res.ok ? res.json():
      Promise.reject(res.status))
    .catch(console.log)
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