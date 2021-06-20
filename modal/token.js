import APIConfig from "../config/api";
import Http from "../utils/http";
import regeneratorRuntime from "../lib/runtime/runtime";

class Token {
  static async getToken() {
    const res = await Http.request({
      url: "v1/token",
      data: {
        i_code: APIConfig.iCode,
        order_no: APIConfig.orderNo,
      },
      method: "POST",
    });
    return res.token;
  }
}
export default Token;
