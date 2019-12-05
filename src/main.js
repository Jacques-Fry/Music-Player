import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import APlayer from '@moefe/vue-aplayer';
import toast from 'components/common/toast'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

//安装插件
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});

Vue.use(toast)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
