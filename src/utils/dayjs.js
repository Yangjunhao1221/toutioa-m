import dayjs from 'dayjs' // ES 2015
import 'dayjs/locale/zh-cn'//中文包
import Vue from 'vue'
import relativeTime from 'dayjs/plugin/relativeTime'//相对时间插件
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')
//参数1：过滤器名称
//参数2：函数（参数是需要过滤的值）
Vue.filter('relativeTime', val => {
    return dayjs().to(dayjs(val))
})