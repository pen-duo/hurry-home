const {
  default: Service
} = require("../../modal/service")
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    service: null,
    serviceId: null
  },
  onLoad: function (options) {
    console.log(options);
    this.data.serviceId = options.service_id
    this._getService()
  },
  async _getService() {
    const service = await Service.getServiceById(this.data.serviceId)
    this.setData({
      service
    })
  }
})