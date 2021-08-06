import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { timStore } from '../../../../store/tim'

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store: timStore,
    fields: ["messageList"],
    actions: ["getMessageList", "setTargetUserId"]
  },
  lifetimes: {
    attached() {  
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

  },
  methods: {

  }
})
