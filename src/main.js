// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import semantic from 'semantic-ui-css'
import '../node_modules/semantic-ui-css/semantic.min.css'
import './styles/me.css'
import './styles/icon.css'
import './styles/github.css'
import './styles/atelier-dune-dark.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/animate.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false
Vue.use(semantic)
Vue.use(ElementUI)
Vue.use(NProgress)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to,from,next) => {
  NProgress.start()
  if(to.meta.title){
    document.title = to.meta.title
  }

  next()
})

router.afterEach(() => {
  window.scrollTo(0,0)
  NProgress.done()
})
