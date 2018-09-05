export function request (opt) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: opt.url,
      data: opt.data || {},
      header: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        ...opt.header
      },
      method: opt.method || 'get',
      success (res) {
        if (res.data.code === 200) {
          resolve(res.data.value)
        } else {
          reject(res)
        }
      },
      fail (e) {
        reject(e)
      }
    })
  })
}
