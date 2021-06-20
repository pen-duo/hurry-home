import regeneratorRuntime from "../../lib/runtime/runtime";
import User from "../../modal/user";

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  async handleLogin() {
    const res = await wx.getUserProfile({
      desc: "完善用户信息",
    });
    wx.showLoading({
      title: "正在授权",
      mask: true,
    });
    try {
      await User.login();
      await User.updateUserInfo(res.userInfo);
      wx.navigateBack();
    } catch (e) {
      wx.showModal({
        title: "登录失败 请稍后重试",
      });
      console.log(e);
    }
    wx.hideLoading();
  },
});