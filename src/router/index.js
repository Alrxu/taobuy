// 导入vue和vue-router  因为vue-router依赖vue

import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
axios.defaults.baseURL = 'http://47.106.148.205:8899/'
axios.defaults.withCredentials = true  // 让axios携带cookies
Vue.prototype.$axios = axios
// 使用vueRouter
Vue.use(VueRouter)

//导入组件
// import goodslist from '../components/goods/goodslist.vue'
// import goodsinfo from '../components/goods/goodsinfo.vue'
// import shopCart from '../components/shopCart/shopCart.vue'
// import order from '../components/order/order.vue'
// import login from '../components/account/login.vue'
// import payorder from '../components/pay/payorder.vue'
// import paySuccess from '../components/pay/paysuccess.vue'
// import vipCenter from '../components/vip/vipCenter.vue'
// import myOrder from '../components/vip/myOrder.vue'
// import orderInfo from '../components/vip/orderInfo.vue'

const goodslist = () => import(/* webpackChunkName: "goodslist" */ '../components/goods/goodslist.vue')
const goodsinfo = () => import(/* webpackChunkName: "goodsinfo" */ '../components/goods/goodsinfo.vue')
const shopCart = () => import(/* webpackChunkName: "shopCart" */ '../components/shopCart/shopCart.vue')
const order = () => import(/* webpackChunkName: "order" */ '../components/order/order.vue')
const login = () => import(/* webpackChunkName: "login" */ '../components/account/login.vue')
const payorder = () => import(/* webpackChunkName: "payorder" */ '../components/pay/payorder.vue')
const paySuccess = () => import(/* webpackChunkName: "paySuccess" */ '../components/pay/paysuccess.vue')
const vipCenter = () => import(/* webpackChunkName: "vipCenter" */ '../components/vip/vipCenter.vue')
const myOrder = () => import(/* webpackChunkName: "myOrder" */ '../components/vip/myOrder.vue')
const orderInfo = () => import(/* webpackChunkName: "orderInfo" */ '../components/vip/orderInfo.vue')

// 为组件分配路由
const router = new VueRouter({
    routes:[
        { path:'/goodslist',component: goodslist },
        // 重定向,让页面一打开就显示
        { path:'/',component:goodslist },
        { path:'/goodsinfo/:goodsId',component: goodsinfo },
        { path:'/shopCart',component: shopCart },
        { path:'/continuebuy',component: goodslist },
        { path:'/login',component: login},
        { path:'/acntTotal',component: order,meta: { checkoutLogin: true } },
        { path:'/payorder',component: payorder,meta: { checkoutLogin: true } },
        { path:'/paySuccess',component: paySuccess,meta: { checkoutLogin: true } },
        { path:'/vipCenter',component: vipCenter,meta: { checkoutLogin: true } },
        { path:'/myOrder',component: myOrder,meta: { checkoutLogin: true } },
        { path:'/orderInfo',component: orderInfo,meta: { checkoutLogin: true } },

    ]
})

router.beforeEach((to, from, next) => {// 只要不是去登录页面的路径,就在本地将该路径存储下来
    if(to.path!=='/login'){
        localStorage.setItem('wtVisit',to.fullPath)
    }
    if(to.meta.checkoutLogin){
        // 表示需要登录验证
        // 发送请求,验证是否登录
        axios.get('site/account/islogin').then(response=>{
            if(response.data.code =='logined'){
                //表示登录过
                next()
            }else{
                // 没有登录过就跳转到登录页面
                router.push({path:'/login'})
            }
        })
    }else{
        // 表示不需要登录验证
        next()
    }
})

// 导出router
export default router
