import serviceType from "../../enum/service-type"
import { getEventParams } from "../../utils/utils"

Component({
  properties: {
    form: Object
  },
  data: {
    typeList: [
      {
        id: serviceType.SEEK,
        name: "提供服务"
      }, {
        id: serviceType.SEEK,
        name: "找服务"
      }
    ],
    typePickerIndex: null
  },
  lifetimes: {
    attached() {
      this._init()
    }
  },
  methods: {
    _init() {
      const index = this.data.typeList.findIndex(item => this.form.type === item.id)
      this.setData({
        typePickerIndex: index !== -1 ? index : null
      })
    },
    handleTypeChange(e) {
      const index = getEventParams(e, "value")
      this.setData({
        typePickerIndex: index
      })
    }
  }
})
