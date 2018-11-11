// 导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


// 按需导入
import { addGoodsLocal,getTotal,updateLocal,deleteLocal } from '../common/localStorage.js'

const store = new Vuex.Store({
    state: {
      buyCount: 0
    },
    mutations: {
        // goods 载荷
        addGoods (state,goods) {
            // state.buyCount += goods.count
            // 调用本地存储传过来的函数,并把 vuex存的数据通过实参传到本地存储
            // 接收本地返回来的返回值是 总数量
            state.buyCount = addGoodsLocal(goods)
        },
        updataGoods(state,goods) {
            state.buyCount = updateLocal(goods)
        },
        deleteGoods(state,goodsId){
            state.buyCount = deleteLocal(goodsId)
        }
    },
    //getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计
    getters:{
        getBuyCount(state){
            return state.buyCount === 0?getTotal():state.buyCount
        }
    }
})

export default store