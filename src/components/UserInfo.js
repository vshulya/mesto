export default class UserInfo {
  constructor(userNameElement, userInfoElement, userPhotoElement) {
    this._userNameElement = userNameElement;
    this._userInfoElement = userInfoElement;
    this._userPhotoElement = userPhotoElement;
  }
  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._userNameElement.textContent;
    userInfo.about = this._userInfoElement.textContent;
    userInfo.avatar = this._userPhotoElement.src;
    return userInfo;
  }

  setUserInfo(userInfo) {
    this._userNameElement.textContent = userInfo.name;
    this._userInfoElement.textContent = userInfo.about;
    this._userPhotoElement.src = userInfo.avatar;
  }
}