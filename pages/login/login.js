import regeneratorRuntime from "../../lib/runtime/runtime"
import User from "../../modal/user";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  async handleLogin() {
    const res = await wx.getUserProfile({
      desc: "完善用户信息"
    })
    wx.showLoading({
      title: '正在授权',
    });
    await User.login()
    await User.updateUserInfo(res.userInfo)
    wx.hideLoading();
    wx.navigateBack({});


  }
})