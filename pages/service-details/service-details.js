const {
  default: Service
} = require("../../modal/service")
import regeneratorRuntime from "../../lib/runtime/runtime"
import Rating from "../../modal/rating";
import User from "../../modal/user";

const rating = new Rating()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    service: null,
    serviceId: null,
    isPublisher: false,
    ratingList: []
  },
  onLoad: async function (options) {
    console.log(options);
    this.data.serviceId = options.service_id
    await this._getService()
    await this._getServiceRatingList()
    this._checkRole()
  },
  async _getService() {
    const service = await Service.getServiceById(this.data.serviceId)
    this.setData({
      service
    })
  },
  async _getServiceRatingList() {
    const ratingList = await rating.getServiceRatingList(this.data.serviceId)
    this.setData({
      ratingList
    })
  },
  _checkRole() {
    const userInfo = User.getUserInfoByLocal()
    if (userInfo && userInfo.id === this.data.service.publisher.id) {
      this.setData({
        isPublisher: true
      })
    }
  }
})