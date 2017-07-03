import {
	CHANGE_TITLE,
	GET_DATA,
	SHOW_SIDEBAR,
  SHOW_ADD,
  SHOW_PERSONINFO,
  GET_ACTIVEID,
  SHOW_DIALOG
} from './mutation-types'

const mutations = {
	//标题
	[CHANGE_TITLE](state, { title,type }) {
		state.headerTitle = title;
		state.titleType = type;
	},
	// ajax获取到用户数据
	[GET_DATA](state, data) {
  // 将ajax获取到的值赋予state
    state.data = data
  // ajax状态更改为结束
    state.isAjax = true
  }, 
  // 显示侧边个人侧边栏
  [SHOW_SIDEBAR](state, {flag} = {}) {
  // 判断侧边栏是否打开，打开点击就收起，反之亦然
  	state.sidebar.open = !state.sidebar.open
  // docked 是否固定 drawer，设为 true，将不会显示遮盖层，也不会触发 close 事件
  	state.sidebar.docked = !flag
  },
  // 显示右上角添加
  [SHOW_ADD](state) {
    state.add = !state.add
  },
  // 显示个人主页
  [SHOW_PERSONINFO](state) {
    state.personinfo = !state.personinfo
  },
  // 获取当前个人信息页面的_id
  [GET_ACTIVEID](state, { activeId }) {
    state.activeId = activeId
  },
  // 判断展示对话框
  [SHOW_DIALOG](state) {
    // 判断当前动作是否是在打开对话，如果是在打开对话，那么进行判断当前当前进行对话的好友是否存在消息队列
    // 如果当前活跃的好友不存在消息队列（被删除的）那么就恢复此好友的消息队列，如果存在，那么无动作
    if (!state.dialog) {
      // 空数组用来判断也是true，所以后面加个[0]
      let message = state.messageList.filter(x => x._id === state.activeId)[0]
      if (!message) {
        let oldMessage = state.messageListFB.filter(x => x._id === state.activeId)[0]
        state.messageList.splice(oldMessage._id - 1, 0, oldMessage)
      }
    }
    state.dialog = !state.dialog
  }
}

export default mutations;
