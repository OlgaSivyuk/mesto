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
      avatar: this._userAvatar.src
    };
  }

  setUserInfo(name, bio) {
    this._userName.textContent = name;
    this._userBio.textContent = bio;
  };

  setUserAvatar(avatar){
    this._userAvatar.src = avatar;
  }

};
