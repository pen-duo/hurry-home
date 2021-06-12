import serviceType from "../../../../enum/service-type"
import behaviors from "../behavior"
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [behaviors],
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    serviceTypeEnum: serviceType
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChat(e) {
      this.triggerEvent("chat")
    },
    handleOrder() {
      this.triggerEvent("order")
    }
  }
})