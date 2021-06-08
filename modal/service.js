import Http from "../utils/http"
import regeneratorRuntime from "../lib/runtime/runtime"
class Service {
  async getServiceList(page, count, category_id = null, type = null) {
    return await Http.request({
      url: "/v1/service/list",
      data: {
        page,
        count
      }
    })
  }
}

export default Service