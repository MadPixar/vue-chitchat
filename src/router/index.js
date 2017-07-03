import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由组件的懒加载。使用 AMD 风格的 require。
const Message = r => require(['@/components/Message/Message'], r)
const Friend = r => require(['@/components/Friend/Friend'], r)
const Discover = r => require(['@/components/Discover/Discover'], r)
const Voip = r => require(['@/components/Voip/Voip'], r)

export default new Router({
	mode: 'history',
	routes: [{
		path: '/',
		redirect: '/message'
	},{
		path: '/message',
		name: 'Message',
		component: Message
	},{
		path: '/voip',
		name: 'Voip',
		component: Voip
	},{
		path: '/friend',
		name: 'Friend',
		component: Friend
	},{
		path: '/discover',
		name: 'Discover',
		component: Discover
	}],
	linkActiveClass: 'current'
})