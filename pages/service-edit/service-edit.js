import regeneratorRuntime from "../../lib/runtime/runtime"
import Service from "../../modal/service"
import { getEventParams } from "../../utils/utils"
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
    const service = JSON.parse(options.service)
    console.log(service);
    this._init(service)
  },

  _init(service) {
    const formData = {
      type: service.type,
      title: service.title,
      category_id: service.category_id,
      cover_image: service.cover_image,
      description: service.description,
      designated_place: service.designated_place,
      begin_date: service.begin_date,
      end_date: service.end_date,
      price: service.price
    }
    this.setData({
      formData,
      serviceId: service.id
    })
  },
  async handleSubmit(e) {
    const res = await wx.showModal({
      title: "提示",
      content: "是否确认修改该服务?提交后会重新进入审核状态 ",
      showCancel: true
    })

    if (!res.confirm) {
      return
    }

    wx.showLoading({ title: "正在审核...", mask: true })
    try {
      await Service.editService(this.data.serviceId, e.detail.formData)
      wx.redirectTo({
        url: `/pages/publisher-success/publisher-success?type=${e.detail.formData.type}`
      })
    } catch (e) {
      console.log(e);
    }
    wx.hideLoading()
  }
})