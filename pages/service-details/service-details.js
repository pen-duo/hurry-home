const {
  default: Service
} = require("../../modal/service")
import regeneratorRuntime from "../../lib/runtime/runtime"
import Rating from "../../modal/rating";
import User from "../../modal/user";
import {
  getEventParams
} from "../../utils/utils"
import serviceAction from "../../enum/service-action"
import serviceStatus from "../../enum/service-status"

const rating = new Rating()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    service: null,
    serviceId: null,
    isPublisher: true,
    ratingList: [],
  },
  onLoad: async function (options) {
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
    const ratingList = await rating.reset().getServiceRatingList(this.data.serviceId)
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
  },
  async handleUpdateStatus(e) {
    const action = getEventParams(e, "action")
    const content = this._generateModalContent(action)
    console.log(content);
    const res = await wx.showModal({
      title: '注意',
      content,
      showCancel: true
    });
    if (!res.confirm) {
      return
    }
    await Service.updateServiceStatus(this.data.serviceId, action)
    await this._getService()
  },
  handleEdit() {

  },
  handleChat() {

  },
  handleOrder() {},
  _generateModalContent(action) {
    let content
    switch (action) {
      case serviceAction.PAUSE:
        content = `暂停后服务状态变为待发布
                   可在个人中心操作重新发布上线
                   是否确认暂停发布该服务？`
        break;
      case serviceAction.PUBLISH:
        content = `发布后即可在广场页面被浏览到,是否确认发布`
        break;
      case serviceAction.CANCEL:
        content = `取消后不可恢复,需要重新发布并提交审核;
                   已关联该服务的订单且订单状态正在进行中的,仍需正常履约;
                   是否确定取消该服务？`
        break;
    }
    return content
  }
})