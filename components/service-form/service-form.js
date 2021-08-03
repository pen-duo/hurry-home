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
    categoryPickerIndex: null,
    rules: [
      {
        name: 'type',
        rules: { required: true, message: '请指定服务类型' },
      },
      {
        name: 'title',
        rules: [
          { required: true, message: '服务标题内容不能为空' },
          { minlength: 5, message: '服务描述内容不能少于 5 个字' },
        ],
      },
      {
        name: 'category_id',
        rules: { required: true, message: '未指定服务所属分类' },
      },
      {
        name: 'cover_image_id',
        rules: { required: true, message: '请上传封面图' },
      },
      {
        name: 'description',
        rules: [
          { required: true, message: '服务描述不能为空' },
          { minlength: 20, message: '服务描述内容不能少于 20 个字' },
        ],
      },
      {
        name: 'begin_date',
        rules: [
          { required: true, message: '请指定服务有效日期开始时间' },
        ],
      },
      {
        name: 'end_date',
        rules: [
          { required: true, message: '请指定服务有效日期结束时间' },
          {
            validator: function (rule, value, param, models) {
              if (moment(value).isSame(models.begin_date) || moment(value).isAfter(models.begin_date)) {
                return null
              }
              return '结束时间必须大于开始时间'
            }
          }
        ],

      },
      {
        name: 'price',
        rules: [
          { required: true, message: '请指定服务价格' },
          {
            validator: function (rule, value, param, models) {
              const pattern = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/
              const isNum = pattern.test(value);

              if (isNum) {
                return null
              }
              return '价格必须是数字'
            }
          },
          { min: 1, message: '天下没有免费的午餐' },
        ],
      },
    ],
  },
  observers: {
    form: function (newValue) {
      if (!newValue) {
        return
      }
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
        files: this.data.form.cover_image ? [this.data.form.cover_image] : [],
        formData: {
          type: this.data.form.type,
          title: this.data.form.title,
          category_id: this.data.form.category_id,
          cover_image_id: this.data.form.cover_image ? this.data.form.cover_image.id : null,
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
      this.triggerEvent("submit", { formData: this.data.formData })
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
    handleUploadSuccess(e) {
      const id = e.detail.files[0].id
      this.setData({
        ['formData.cover_image_id']: id
      })
    }
  }
})
