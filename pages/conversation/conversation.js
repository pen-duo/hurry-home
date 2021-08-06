import Tim from "../../modal/tim"
import TIM from "tim-wx-sdk-ws"
import { async } from "../../lib/runtime/runtime"

import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { timStore } from '../../store/tim'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetUserId: null,
    service: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.storeBindings = createStoreBindings(this, {
      store: timStore,
      fields: ['sdkReady'],
    })
    this.setData({
      targetUserId: options.targetUserId,
      service: options.service
    })
  },
  handleLogin() {
    wx.navigateTo({
      url: "/pages/login/login"
    })
  },
  onUnload: function (options) {
    this.storeBindings.destroyStoreBindings()
  },
})