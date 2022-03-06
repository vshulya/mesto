export default class UserInfo {
  constructor(userNameElement, userInfoElement) {
    this._userNameElement = userNameElement;
    this._userInfoElement = userInfoElement;
  }
  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._userNameElement.textContent;
    userInfo.about = this._userInfoElement.textContent;
    return userInfo;
  }

  setUserInfo(userInfo) {
    this._userNameElement.textContent = userInfo.name;
    this._userInfoElement.textContent = userInfo.about;
  }
}