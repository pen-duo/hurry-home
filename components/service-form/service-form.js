import serviceType from "../../enum/service-type"
import Category from "../../modal/category"
import { getDataSet, getEventParams } from "../../utils/utils"
import regeneratorRuntime from "../../lib/runtime/runtime"

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
    typePickerIndex: null,
    formData: {
      type: null,
      title: "",
      category_id: null,
      cover_image_id: null,
      description: "",
      designated_place: false,
      begin_date: "",
      end_date: "",
      price: ""
    },
    categoryList: [],
    categoryPickerIndex: null
  },
  lifetimes: {
    attached() {
      this._init()
    }
  },
  methods: {
    async _init() {
      const typePickerIndex = this.data.typeList.findIndex(item => this.data.form.type === item.id)
      const categoryList = await Category.getCategoryList()
      const categoryPickerIndex = categoryList.findIndex(item => this.data.form.category_id === item.id)
      this.setData({
        typePickerIndex: typePickerIndex !== -1 ? typePickerIndex : null,
        formData: {
          type: this.data.form.type,
          title: this.data.form.title,
          category_id: this.data.form.category_id,
          cover_image_id: this.data.form.cover_image_id,
          description: this.data.form.description,
          designated_place: this.data.form.designated_place,
          begin_date: this.data.form.begin_date,
          end_date: this.data.form.end_date,
          price: this.data.form.price
        },
        categoryPickerIndex: categoryPickerIndex !== -1 ? categoryPickerIndex : null,
        categoryList,
      })
    },
    submit() {
      console.log(this.data.formData);
    },
    handleTypeChange(e) {
      const index = getEventParams(e, "value")
      this.setData({
        typePickerIndex: index,
        ['formData.type']: this.data.typeList[index].id
      })
    },
    handleInput(e) {
      const value = getEventParams(e, "value")
      const field = getDataSet(e, "field")
      this.setData({
        [`formData.${field}`]: value
      })
    },
    handleCategoryChange(e) {
      const index = getEventParams(e, "value")
      this.setData({
        categoryPickerIndex: index,
        ["formData.category_id"]: this.data.categoryList[index].id
      })
    },
    handleSwitchChange(e) {
      const res = getEventParams(e, "value")
      this.setData({
        ["formData.designated_place"]: res
      })
    },
    handleBeginDateChange(e) {
      const beginDate = getEventParams(e, "value")
      this.setData({
        ["formData.begin_date"]: beginDate
      })
    },
    handleEndDateChange(e) {
      const endDate = getEventParams(e, "value")
      this.setData({
        ["formData.end_date"]: endDate
      })
    },
  }
})
