import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

// 初始化一些常用数据，也就是state（状态）
let state = {
	// 导航栏标题
  headerTitle: '',
  // 导航栏标题类型
  titleType: 0
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})