import Vue from 'vue'
import * as Mutation from './mutation-types'
Vue.config.devtools = true;

export default {
	setAppInitialized({commit}) {
		commit(Mutation.SET_APP_INITIALIZED)
	},
	showModal({commit}) {
		commit(Mutation.DISPLAY_MODAL);
	},
	hideModal({commit}) {
		commit(Mutation.HIDE_MODAL);
		commit(Mutation.DISABLE_MODAL);
		commit('events/CLEAR_ACTIVE_EVENT', null, { root: true }) // очищаем активную тренировку
	},
	setDomain({commit}, payload) {
		commit(Mutation.SET_DOMAIN, payload)
	},
	setTheme({commit}, payload) {
		commit(Mutation.SET_THEME, payload)
	},
	setIsSmallDesktop({commit}, payload) {
		commit(Mutation.SET_IS_SMALL_DESKTOP, payload)
	},
	setIsTouchDevice({commit}, payload) {
		commit(Mutation.SET_IS_TOUCH_DEVICE, payload)
	},
	setIsMobilePhone({commit}, payload) {
		commit(Mutation.SET_IS_MOBILE_PHONE, payload)
	},
	setIsMediumMobilePhone({commit}, payload) {
		commit(Mutation.SET_IS_MEDIUM_MOBILE_PHONE, payload)
	},
}
