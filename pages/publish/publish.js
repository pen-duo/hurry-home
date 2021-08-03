import regeneratorRuntime from "../../lib/runtime/runtime"
import Service from "../../modal/service"
import { getEventParams } from "../../utils/utils"
Page({
  data: {
    formData: {
      type: null,
      title: "",
      category_id: null,
      cover_image: null,
      description: "",
      designated_place: false,
      begin_date: "",
      end_date: "",
      price: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  async handleSubmit(e) {
    const res = await wx.showModal({
      title: "提示",
      content: "是否确认申请发布该服务",
      showCancel: true
    })

    if (!res.confirm) {
      return
    }

    wx.showLoading({ title: "正在发布...", mask: true })
    try {
      await Service.publishService(e.detail.formData)
    } catch (e) {
      console.log(e);
    }
    wx.hideLoading()
    this._resetForm()
    wx.navigateTo({
      url: `/pages/publisher-success/publisher-success?type=${e.detail.formData.type}`
    })
  },
  _resetForm() {
    const formData = {
      type: null,
      title: "",
      category_id: null,
      cover_image: null,
      description: "",
      designated_place: false,
      begin_date: "",
      end_date: "",
      price: ""
    }
    this.setData({
      formData
    })
  }
})