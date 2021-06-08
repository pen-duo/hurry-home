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
    serviceList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getServiceList()
    this._getCategoryList()

  },
 async _getServiceList() {
   const serviceList = await service.getServiceList(1, 10)
   console.log(serviceList);
   this.setData({
     serviceList:serviceList.data
   })
  },
  async _getCategoryList() {
    const categoryList = await Category.getCategoryListWithAll()
    this.setData({
      categoryList
    })
  },
  handleItemChange(e) {
    const {
      index
    } = e.detail
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  handleCategoryChange(e) {
    const {
      id
    } = e.currentTarget.dataset
  }
})