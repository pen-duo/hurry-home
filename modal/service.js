import Http from "../utils/http"
import regeneratorRuntime from "../lib/runtime/runtime"
import Base from "./base"
class Service extends Base {

  async getServiceList(category_id = null, type = null) {
    if (!this.hasMoreData) {
      return this.data
    }
    const serviceList = await Http.request({
      url: "v1/service/list",
      data: {
        page: this.page,
        count: this.count,
        category_id: category_id || "",
        type: type || ""
      }
    })
    this.data = this.data.concat(serviceList.data)
    this.hasMoreData = !(this.page === serviceList.last_page)
    this.page++
    return this.data
  }
  static getServiceById(serviceId) {
    return Http.request({
      url: `v1/service/${serviceId}`
    })
  }
  static updateServiceStatus(serviceId, action) {
    return Http.request({
      url: `v1/service/${serviceId}`,
      data: {
        action
      },
      method: "POST"
    })
  }
  static publishService(formData) {
    return Http.request({
      url: "/v1/service",
      data: formData,
      method: 'POST'
    })
  }
  static editService(serviceId, formData) {
    return Http.request({
      url: `v1/service/${serviceId}`,
      data: formData,
      method: "PUT"
    })
  }
}

export default Service