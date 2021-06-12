import serviceStatus from "../../../../enum/service-status"
import serviceAction from "../../../../enum/service-action"
import behaviors from "../behavior"
import {
  getDataSet
} from "../../../../utils/utils"
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [behaviors],
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    serviceStatusEnum: serviceStatus,
    serviceActionEnum: serviceAction,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleUpdateStatus(e) {
      const action = getDataSet(e, "action")
      this.triggerEvent("update", {
        action
      })
    },
    handleEditService(e) {
      this.triggerEvent("edit")
    }
  }
})