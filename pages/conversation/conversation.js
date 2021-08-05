import Tim from "../../modal/tim"
import TIM from "tim-wx-sdk-ws"
import { async } from "../../lib/runtime/runtime"

import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { timStore } from '../../store/tim'
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
    this.storeBindings = createStoreBindings(this, {
      store: timStore,
      fields: ['sdkReady'],
    })
  },
  onUnload: function (options) {
    this.storeBindings.destroyStoreBindings()
  },
})