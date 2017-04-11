import {
	CHANGE_TITLE
} from './mutation-types'

const mutations = {
	//标题
	[CHANGE_TITLE](state, { title,type }) {
		state.headerTitle = title;
		state.titleType = type;
	}
}

export default mutations;
