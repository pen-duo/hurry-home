import Tim from "../../modal/tim"

// pages/conversation/conversation.js
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
    const userId = 43
    Tim.getInstance().login()
    Tim.getInstance().getMessageList(userId)
  },

})