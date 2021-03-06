import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'

// 引入 actions.js 的所有导出
import * as moreActions from './actions'

Vue.use(Vuex)

const state = {
  user: ls.getItem('user'),

  //添加 auth  来保存用户当前的状态
  auth: ls.getItem('auth'),

  //文章
  articles: ls.getItem('articles')
}

const mutations = {
  UPDATE_USER(state, user) {
    state.user = user
    ls.setItem('user', user)
  },
  UPDATE_AUTH(state, auth) {
    state.auth = auth
    ls.setItem('auth',auth)
  },
  // 更改所有文章的事件类型
  UPDATE_ARTICLES(state, articles) {
    state.articles = articles
    ls.setItem('articles', articles)
  }
}

const actions = {
  login({commit}, user) {

    //console.log(commit,user);
    if (user) commit('UPDATE_USER', user)
    //更新当前用户状态为已经登录
    commit('UPDATE_AUTH',true)
    router.push('/')
  },
  logout({commit}){
    commit('UPDATE_AUTH',false)
    router.push({ name: 'Home', params: { logout: true } })    
  },
   // 更新个人信息
   updateUser({ state, commit }, user) {
    const stateUser = state.user

    if (stateUser && typeof stateUser === 'object') {
      user = { ...stateUser, ...user }
    }
    commit('UPDATE_USER', user)
  },
  ...moreActions
}

// 添加 getters
const getters = {
  getArticleById: (state) => (id) => {
    let articles = state.articles

    if (Array.isArray(articles)) {
      articles = articles.filter(article => parseInt(id) === parseInt(article.articleId))
      return articles.length ? articles[0] : null
    } else {
      return null
    }
  }
}



const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

export default store
