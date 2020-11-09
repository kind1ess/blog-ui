import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home'),
      meta:{
        title:'kindless的博客'
      }
    },
    {
      path: '/blog/:id',
      name: 'blog',
      component: () => import('../views/blog'),
      // meta:{
      //   title:'博客详情'
      // }
    },
    {
      path: '/types',
      name: 'types',
      component: () => import('../views/types'),
      meta:{
        title:'分类'
      }
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('../views/tags'),
      title:'标签'
    },
    {
      path: '/archieves',
      name: 'archieves',
      component: () => import('../views/archieves'),
      meta:{
        title:'归档'
      }
    },
    {
      path: '/aboutme',
      name: 'aboutme',
      component: () => import('../views/aboutme'),
      meta:{
        title:'关于我'
      }
    },
    {
      path:'*',
      component: () => import('../views/404')
    }
  ]
})
