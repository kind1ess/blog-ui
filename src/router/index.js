import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home'
import blog from '../views/blog'
import types from '../views/types'
import tags from '../views/tags'
import archieves from '../views/archieves'
import aboutme from '../views/aboutme'
import _404 from '../views/404'
import search from '../views/search'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta:{
        title:'kindless的博客'
      }
    },
    {
      path: '/blog/:id',
      name: 'blog',
      component: blog
    },
    {
      path: '/types',
      name: 'types',
      component: types,
      meta:{
        title:'分类'
      }
    },
    {
      path: '/tags',
      name: 'tags',
      component: tags,
      title:'标签'
    },
    {
      path: '/archieves',
      name: 'archieves',
      component: archieves,
      meta:{
        title:'归档'
      }
    },
    {
      path: '/aboutme',
      name: 'aboutme',
      component: aboutme,
      meta:{
        title:'关于我'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta: {
        title:'搜索结果'
      }
    },
    {
      path:'*',
      component: _404
    }
  ]
})
