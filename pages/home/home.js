import Service from "../../modal/service"
import Category from "../../modal/category"
import regeneratorRuntime from "../../lib/runtime/runtime"
const service = new Service()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      value: "所有服务",
      id: 1,
      isActive: true
    }, {
      value: "在提供",
      id: 2,
      isActive: false
    }, {
      value: "正在找",
      id: 3,
      isActive: false
    }],
    categoryList: [],
    serviceList: [],
    tabIndex: 0,
    categoryId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getServiceList()
    this._getCategoryList()

  },
  async _getServiceList() {
    const serviceList = await service.reset().getServiceList(this.data.categoryId, this.data.tabIndex)
    console.log(serviceList);
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
    console.log(e);
    const {
      index: tabIndex
    } = e.detail
    this.data.tabIndex = tabIndex
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => i === tabIndex ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
    this._getServiceList()
  },
  handleCategoryChange(e) {
    if (this.data.categoryId === e.currentTarget.dataset.id) {
      return
    }
    const {
      id: categoryId
    } = e.currentTarget.dataset
    this.data.categoryId = categoryId
    this._getServiceList()
  },
  // 下拉刷新
  async onPullDownRefresh() {
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