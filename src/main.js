import Vue from 'vue'
import App from './App.vue'
// 导入样式
import '../src/statics/site/css/style.css'
// 导入组件
import router from './router/index.js'
// 导入过滤器
import '../src/filters/index.js'

// 导入轮播图组件
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
//按需导入ElementUI
import {
    Button,
    Pagination,
    Input,
    InputNumber,
    Switch,
    Form,
    FormItem,
    Radio,
    RadioGroup,
    MessageBox,
    Message,
    Carousel,
    CarouselItem,
    Row,
    Col
} from 'element-ui'


Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

// 导入懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
    loading:require('./statics/site/images/01.gif')
})


// 导入store
import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store, // 挂载store
}).$mount('#app')
