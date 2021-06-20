import regeneratorRuntime from "../lib/runtime/runtime";
import APIConfig from "../config/api";
import exceptionMessage from "../config/exception";
import cache from "../enum/cache";
class Http {
  static async request({ url, data, method = "Get" }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: APIConfig.baseUrl + url,
        data,
        method,
        header: {
          token: wx.getStorageSync(cache.TOKEN),
        },
        success(res) {
          if (res.statusCode < 400) {
            resolve(res.data.data);
            return;
          }
          if (res.statusCode === 401) {
            return;
          }
          Http._showError(res.data.error_code, res.data.message);
          const error = Http._generateMessage(res.data.message);
          throw Error(error);
        },
      });
    });
  }
  static _showError(errorCode, message) {
    let title = "";
    const errorMessage = exceptionMessage[errorCode];
    title = errorMessage || message || "未知异常";

    title = HTTP._generateMessage(title);

    // wx.showToast({
    //   title,
    //   icon: "none",
    //   duration: 3000
    // })
  }
  static _generateMessage(message) {
    return typeof message === "object"
      ? Object.values(message).join(";")
      : message;
  }
}

export default Http;
