import {
	CHANGE_TITLE,
	GET_DATA
} from './mutation-types'

const mutations = {
	//标题
	[CHANGE_TITLE](state, { title,type }) {
		state.headerTitle = title;
		state.titleType = type;
	},
	// ajax获取到用户数据
	[GET_DATA](state, data){
    // 将ajax获取到的值赋予state
    state.data = data
    // ajax状态更改为结束
    state.isAjax = true
  }
}

export default mutations;
