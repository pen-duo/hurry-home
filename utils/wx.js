function wxToPromise(method, options = {}) {
    return new Promise((resolve, reject) => {
        options.success = resolve
        options.fail = err => {
            reject(err)
        }
        wx[method](options)
    })
}

const setTabBarBadge = async function (unreadCount) {
    try {
        if (unreadCount > 0) {
            await wx.setTabBarBadge({
                index: 2,
                text: unreadCount.toString()
            })
        } else {
            await wx.removeTabBarBadge({
                index: 2
            })
        }
        wx.setStorageSync('unread-count', 0)
    } catch (e) {
        wx.setStorageSync('unread-count', unreadCount)
        console.log(e)
    }
}

export { wxToPromise, setTabBarBadge }
