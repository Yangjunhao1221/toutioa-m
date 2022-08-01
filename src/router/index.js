import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',//打开默认
        redirect: '/layout'
    },
    {
        path: '/layout',
        component: () => import('@/views/layout'),//路由懒加载
        redirect: '/layout/home',
        children: [
            {
                path: 'home',//跳转时要加父路由的路径
                name: 'homeIndex',
                component: () => import('@/views/home')//路由懒加载
            },
            {
                path: 'qa',
                name: 'qaIndex',
                component: () => import('@/views/qa')//路由懒加载
            },
            {
                path: 'my',
                name: 'myIndex',
                component: () => import('@/views/my')//路由懒加载
            },
            {
                path: 'video',
                name: 'videoIndex',
                component: () => import('@/views/video')//路由懒加载
            },
        ]
    },
    {
        path: '/login',
        name: 'LoginIndex',
        component: () => import('@/views/Login')//路由懒加载
    },
    {
        path: '/search',
        name: 'SearchIndex',
        component: () => import('@/views/Search')//路由懒加载
    },
    {
        path: '/article/:articleId',//动态路由
        name: 'articleIndex',
        component: () => import('@/views/article'),//路由懒加载
        props: true,
    },


]
const router = new VueRouter({
    routes
})
export default router