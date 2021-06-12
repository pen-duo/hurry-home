import cache from "../enum/cache";
import regeneratorRuntime from "../lib/runtime/runtime"
import Http from "../utils/http";
import Token from "./token";

class User {
  static getUserInfoByLocal() {
    return wx.getStorage({
      key: cache.USER_INFO,
    });
  }
  static async login() {
    const token = await Token.getToken()
    wx.setStorageSync(cache.Token, token);
  }
  static async updateUserInfo(userInfo) {
    console.log(userInfo);
    const res = await Http.request({
      url: "v1/user",
      data: {
        nickname: userInfo.nickName,
        avatar: userInfo.avatarUrl,
        gender: userInfo.gender
      },
      method: "PUT"
    })
    wx.setStorageSync(cache.USER_INFO, res)
  }
}

export default User