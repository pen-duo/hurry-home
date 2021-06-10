import Service from "../../modal/service"
import Category from "../../modal/category"
import regeneratorRuntime from "../../lib/runtime/runtime"
const service = new Service()
import {
  throttle
} from "../../utils/utils"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      value: "所有服务",
      id: 1,
    }, {
      value: "在提供",
      id: 2,
    }, {
      value: "正在找",
      id: 3,
    }],
    categoryList: [],
    serviceList: [],
    tabIndex: 0,
    categoryId: 0,
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this._getServiceList()
    await this._getCategoryList()
    this.setData({
      loading: false
    })

  },
  async _getServiceList() {
    const serviceList = await service.reset().getServiceList(this.data.categoryId, this.data.tabIndex)
    this.setData({
      serviceList
    })
  },
  async _getCategoryList() {
    const categoryList = await Category.getCategoryListWithAll()
    this.setData({
      categoryList
    })
  },
  handleTabChange(e) {
    const {
      index
    } = e.detail
    this.data.tabIndex = index
    this._getServiceList()
  },
  handleCategoryChange: throttle(function (e) {
    if (this.data.categoryId === e.currentTarget.dataset.id) {
      return
    }
    this.data.categoryId = e.currentTarget.dataset.id
    this._getServiceList()
  }),
  // 下拉刷新
  async onPullDownRefresh() {
    console.log(2);
    this._getServiceList()
    wx.stopPullDownRefresh()

  },
  // 上拉触底
  async onReachBottom() {
    if (!service.hasMoreData) {
      return
    }
    const serviceList = await service.getServiceList(this.data.categoryId, this.data.tabIndex)
    this.setData({
      serviceList
    })
  }
})