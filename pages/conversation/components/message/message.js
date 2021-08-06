import { formatTime } from "../../../../utils/date"
import TIM from "tim-wx-sdk-ws"
// pages/conversation/components/message/message.js
Component({
  properties: {
    message: Object
  },
  observers: {
    "message": function (message) {
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

  }
})
