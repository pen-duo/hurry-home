import cache from "../enum/cache";
import regeneratorRuntime from "../lib/runtime/runtime";
import Http from "../utils/http";
import Token from "./token";

class User {
  static getUserInfoByLocal() {
    return wx.getStorageSync(cache.USER_INFO);
  }
  static async login() {
    const token = await Token.getToken();
    wx.setStorageSync(cache.TOKEN, token);
  }
  static async updateUserInfo(userInfo) {
    const res = await Http.request({
      url: "v1/user",
      data: {
        nickname: userInfo.nickName,
        avatar: userInfo.avatarUrl,
        gender: userInfo.gender,
      },
      method: "PUT",
    });
    wx.setStorageSync(cache.USER_INFO, res);
  }
  static async getUserSign() {
    return await Http.request({
      url: 'v1/user/sign'
    })

  }
}

export default User;
