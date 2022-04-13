export class UserInfo {
  constructor ({profileNameSelector, profileBioSelector, profileAvatarSelector}){
    this._userName = document.querySelector(profileNameSelector);
    this._userBio = document.querySelector(profileBioSelector);
    this._userAvatar = document.querySelector(profileAvatarSelector)
  };

  getUserInfo() {
    return {
      name: this._userName.textContent,
      bio: this._userBio.textContent,
    };
  }

  setUserInfo(name, bio) {
    this._userName.textContent = name;
    this._userBio.textContent = bio;
    //this._userAvatar.src = avatar;
  };
  
  setUserAvatar(link) {
    this._userAvatar.style.backgroundImage = `url(${link})`;
  }

};
