// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    titles: {
      type: Array,
      value: []
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTabIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemClick(e) {
      const {
        index
      } = e.currentTarget.dataset
      if (index === this.data.currentTabIndex) {
        return
      }
      this.setData({
        currentTabIndex: index
      })
      this.triggerEvent("tabItemChange", {
        index
      })
    },
    handleTouchMove(e) {
      const {
        direction
      } = e

      const currentTabIndex = this.data.currentTabIndex
      const targetTabIndex = direction + currentTabIndex
      if (targetTabIndex < 0 || targetTabIndex > this.data.titles.length - 1) {
        return
      }
      const customEvent = {
        currentTarget: {
          dataset: {
            index: targetTabIndex
          }
        }
      }
      this.handleItemClick(customEvent)
    }
  }
})