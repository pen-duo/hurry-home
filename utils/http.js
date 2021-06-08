import regeneratorRuntime from "../lib/runtime/runtime"
import APIConfig from "../config/api"
import exceptionMessage from "../config/exception"
class Http {
  static async request({
    url,
    data,
    method = "Get"
  }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: APIConfig.baseUrl + url,
        data,
        method,
        success(res) {
          if (res.statusCode < 400) {
            resolve(res.data.data)
          }
          if (res.statusCode === 401) {
            return
          }
          Http._showError(res.data.error_code, res.data.message)
        }
      })
    })
  }
  static _showError(errorCode, message) {
    let title = ''
    const errorMessage = exceptionMessage[errorCode]
    title = errorMessage || message || "未知异常"

    title = typeof title === "object" ? Object.values(title).join(";") : title

    // wx.showToast({
    //   title,
    //   icon: "none",
    //   duration: 3000
    // })
  }
}

export default Http