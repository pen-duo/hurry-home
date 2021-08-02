import APIConfig from "../config/api"
import regeneratorRuntime from "../../lib/runtime/runtime"
import Http from "./http"

class FileUploader extends Http {
    static async upload(filePath, key = "file") {
        let res
        try {
            res = wx.uploadFile({
                url: APIConfig.baseUrl + "/v1/file",
                filePath,
                name: key
            })
        } catch (e) {
            FileUploader._showError(-1)
            throw Error(e.errMsg)
        }
        const serverData = JSON.parse(res.data)
        if (res.statusCode !== 201) {
            FileUploader._showError(res.data.error_code, res.data.message)
            throw Error(res.data.message)
        }


        return res.data.data

    }
}
export default FileUploader