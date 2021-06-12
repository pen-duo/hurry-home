// components/service-rating.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rating: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePreview(e) {
      const index = e.currentTarget.dataset.index
      wx.previewImage({
        current: '',
        urls: this.data.rating.illustration,
        current: this.data.rating.illustration[index]
      });

    }
  }
})