import * as Mutation from './mutation-types';

export default {
	[Mutation.SET_APP_INITIALIZED](state) {
		state.init = true;
	},
	[Mutation.DISABLE_MODAL](state) {
		state.canShowModal = false;
	},
	//показать прелоадер загрузки ивентов
	[Mutation.SHOW_EVENTS_PRELOADER](state) {
		state.showEventsPreloader = true;
	},
	[Mutation.HIDE_EVENTS_PRELOADER](state) {
		state.showEventsPreloader = false;
	},
	//прелоадер активного ивента
	[Mutation.SHOW_MODAL_PRELOADER](state) {
		state.showModalPreloader = true;
	},
	[Mutation.HIDE_MODAL_PRELOADER](state) {
		state.showModalPreloader = false;
	},
	[Mutation.DISPLAY_MODAL](state) {
		state.showModal = true;
		state.canShowModal = true;
	},
	[Mutation.HIDE_MODAL](state) {
		state.showModal = false;
	},
	[Mutation.SET_DOMAIN](state, payload) {
		state.domain = payload;
	},
	[Mutation.SET_THEME](state, payload) {
		state.theme = payload;
	},
	[Mutation.SET_IS_SMALL_DESKTOP](state, payload) {
		state.isSmallDesktop = payload;
	},
	[Mutation.SET_IS_TOUCH_DEVICE](state, payload) {
		state.isTouchDevice = payload;
	},
	[Mutation.SET_IS_MOBILE_PHONE](state, payload) {
		state.isMobilePhone = payload;
	},
	[Mutation.SET_IS_MEDIUM_MOBILE_PHONE](state, payload) {
		state.isMediumMobilePhone = payload;
	},
}
