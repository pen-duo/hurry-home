import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { timStore } from '../../../../store/tim'
import { getEventParams } from '../../../../utils/utils'
import TIM from "tim-wx-sdk-ws"
Component({
    behaviors: [storeBindingsBehavior],
    storeBindings: {
        store: timStore,
        fields: ["messageList", "intoView"],
        actions: ["getMessageList", "setTargetUserId"]
    },
    lifetimes: {
        attached() {
            this.setScrollHeight()
                // 测试先用user1
            this.setTargetUserId("user1")
                // this.setTargetUserId(this.data.targetUserId)
            this.getMessageList()
        }
    },
    properties: {
        targetUserId: String,
        service: Object
    },
    data: {
        text: null
    },
    methods: {
        handleSendLink(e) {
            const service = getEventParams(e, "service")
            this.triggerEvent("sendmessage", {
                type: TIM.TYPES.MSG_CUSTOM,
                content: service
            })
        },
        handleSelect(e) {
            const service = getEventParams(e, "service")
            wx.navigator({
                url: `/pages/service-detail/service-detail?service_id=$${service._id}`
            })
        },
        async handleSendImage(e) {
            const chooseImage = await wx.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
            });
            this.triggerEvent("sendmessage", {
                type: TIM.TYPES.MSG_IMAGE,
                content: chooseImage
            })
        },
        handleInput(e) {
            const text = getEventParams(e, "value")
            this.data.text = text
        },
        handleSend() {
            const text = this.data.text.trim()
            if (text === "") {
                return
            }
            this.triggerEvent("sendmessage", {
                type: TIM.TYPES.MSG_TEXT,
                content: text
            })
            this.setData({
                text: ""
            })
        },
        async setScrollHeight() {
            const systemInfo = await wx.getSystemInfo();
            const scrollHeight = systemInfo.windowHeight - (systemInfo.screenHeight - systemInfo.safeArea.bottom) - 95
            this.setData({
                scrollHeight
            })

        }
    }
})