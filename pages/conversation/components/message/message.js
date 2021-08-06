import { formatTime } from "../../../../utils/date"
import TIM from "tim-wx-sdk-ws"
import { getDataSet, getEventParam } from "../../../../utils/utils"
Component({
    properties: {
        message: Object
    },
    observers: {
        "message": function(message) {
            console.log(message);
            message.time = formatTime(message.time)
            this.setData({
                _message: message
            })
        }
    },
    data: {
        TIM,
        flowEnum: {
            IN: 'in',
            OUT: "out"
        }
    },

    methods: {
        handleSend(e) {
            const service = getEventParam(e, "service")
            this.triggerEvent("send", { service })
        },
        handleSelect(e) {
            const service = getEventParam(e, "service")
            this.triggerEvent("select", { service })
        },
        async handlePreview(e) {
            const url = getDataSet(e, "image")
            await wx.previewImage({
                urls: [url],
                current: url
            })
        }
    }
})