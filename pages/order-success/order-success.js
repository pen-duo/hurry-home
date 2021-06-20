import orderStatus from "../../enum/order-status";
import roleType from "../../enum/role-type";

// pages/order-success/order-success.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  handleCheckOrder() {
    wx.navigateTo({
      url: `/pages/my-order/my-order?role=${roleType.CONSUMER}&status=${orderStatus.UNAPPROVED}`,
    });
  },
  handleNavToHome(){
    wx.switchTab({
      url:"/pages/home/home"
    })
  }
});
