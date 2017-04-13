// actions里存放的是异步操作
// 由于vuex中的state的变更只能由mutations进行操作，所以actions不直接进行数据操作，而是调用mutations方法
// 以下出现的that都是vue实例对象，因为把axios绑定在了Vue原型上，vuex无法调用，所以这里需要传入this

import * as types from './mutation-types';

const actions = {
	// 异步获取基础数据
  // 这里使用了es7的async函数，相当于封装了promis的generator
  getAllData: async ({ commit }, that) => {
    // 声明变量用来存放之后获得的数据
    let self = {};
    let friends = {};
    await that.$http.get('/api/self')
      .then(({ data }) => {
        self = data.data;
      })
    await that.$http.get('/api/friends')
      .then(({ data }) => {
        friends = data.data;
      })
    commit(types.GET_DATA, {
      self, friends
    })
  }
}

export default actions;