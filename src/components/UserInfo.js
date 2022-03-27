export class UserInfo {
  constructor ({profileNameSelector, profileBioSelector}){
    this._userName = document.querySelector(profileNameSelector);
    this._userBio = document.querySelector(profileBioSelector) 
  };

  getUserInfo() {
    return {
      name: this._userName.textContent,
      bio: this._userBio.textContent
    };
  }

  setUserInfo(name, bio) {
    this._userName.textContent = name;
    this._userBio.textContent = bio;
  };        
};
