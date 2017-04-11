import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

import Message from '@/components/Message/Message';
import Friends from '@/components/Friends/Friends';
import Discover from '@/components/Discover/Discover';

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
		path: '/friends',
		name: 'Friends',
		component: Friends
	},{
		path: '/discover',
		name: 'Discover',
		component: Discover
	}]
})