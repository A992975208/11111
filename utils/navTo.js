const togo = function (url, data) {
    url += param(data)

    uni.navigateTo({
        url, animationType: "pop-in", animationDuration: 500
    })
}
//传递一个对象
export function param(data) {
    let url = ''
    for (let k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += '&' + k + '=' +  encodeURIComponent(value)
    }
    return url ? url.substring(1) : ''
}

export {togo}
