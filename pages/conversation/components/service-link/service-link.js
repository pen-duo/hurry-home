Component({
    /**
     * 组件的属性列表
     */
    properties: {
        flow: String,
        service: String
    },
    lifetimes: {
        attached() {
            this.setData({
                _service: JSON.parse(this.data.service)
            })
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        _service: null,
        flowEnum: {
            IN: "in",
            OUT: "out"
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleSendLink() {
            this.triggerEvent("send", { service: this.data._service })
        },
        handleSelect() {
            this.triggerEvent("select", { service: this.data._service })
        }
    }
})