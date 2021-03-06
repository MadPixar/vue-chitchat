import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

// 初始化一些常用数据，也就是state（状态）
let state = {
	// 基础数据初始化
	data: { self: {}, friends: [] },
	// ajax请求数据是否结束
  isAjax: false,
	// 导航栏标题
  headerTitle: '',
  // 导航栏标题类型
  titleType: 0,
  // 侧边栏
  sidebar: {
    open: false,
    docked: true
  },
  // 右上角添加
  add: false,
  // 用户主页
  personinfo: false,
  // 当前被选中或者在聊天中的friend的_id
  activeId: 0
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})