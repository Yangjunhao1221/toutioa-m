//本地存储封装
//存
export const setItem = (key, val) => {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    window.localStorage.setItem(key, val)
}
//取
export const getItem = (key, val) => {
    val = window.localStorage.getItem(key)
    try {
        return JSON.parse(val)
    } catch (error) {
        return val
    }
}
//删
export const removeItem = (key) => {
    window.localStorage.removeItem(key)
}