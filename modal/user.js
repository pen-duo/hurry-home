class User {
  static getUserInfoByLocal() {
    return wx.getStorage({
      key: 'user-info',
    });

  }
}

export default User