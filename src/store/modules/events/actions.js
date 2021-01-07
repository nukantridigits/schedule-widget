import Vue from 'vue'
import * as Mutation from './mutation-types'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {getActiveEventUrl, getEventsUrl, getPhoneMaskUrl} from "../../../utils/api";
import {eventBus} from "../../../main";
import {axiosConfig} from "../../../variables";
import * as forms from '../../../utils/forms'

Vue.use(VueAxios, axios);
Vue.config.devtools = true;

export default {
	async fetchEvents({commit}, payload) {
		commit(Mutation.SET_EVENTS_IS_FETCHING);
		commit('ui/SHOW_EVENTS_PRELOADER', null, { root: true })

		axios.get(getEventsUrl(payload), axiosConfig)
			.then((response) => {
				commit(Mutation.SET_EVENTS, {data: response.data})
				commit(Mutation.SET_EVENTS_IS_FETCHED);
				commit(Mutation.INCREASE_EVENTS_COUNTER);
				commit('ui/HIDE_EVENTS_PRELOADER', null, { root: true })
				eventBus.$emit('showCalendar');
			}, (err) => {
				console.log(err)
				commit('ui/HIDE_EVENTS_PRELOADER', null, { root: true })

				return false
			})
	},
	async fetchActiveEvent({commit}, payload) {
		commit('ui/DISABLE_MODAL', null, { root: true })
		commit('ui/SHOW_MODAL_PRELOADER', null, { root: true })

		axios.get(getActiveEventUrl(payload), axiosConfig)
			.then((response) => {
				commit(Mutation.SET_ACTIVE_EVENT, {data: response.data})
				commit('calendar/SET_ACTIVE_EVENT_CHECK_FREE_SLOTS', true, { root: true })
				commit('ui/HIDE_MODAL_PRELOADER', null, { root: true })
				commit('ui/DISPLAY_MODAL', null, { root: true })
				return true
			}, (err) => {
				console.log(err)
				commit('ui/HIDE_MODAL_PRELOADER', null, { root: true })
				return false
			})
	},
	async fetchPhoneMask({commit}, payload) {
		axios.get(getPhoneMaskUrl(payload), axiosConfig)
			.then((response) => {
				//подготавливаем маску и плэйсхолдер для телефона
				const data = response.data;
				const phoneMask = forms.getPhoneMask(forms.MASK_TYPE_PHONE, data);
				commit(Mutation.SET_PHONE_MASK, phoneMask);
				const phoneMaskPlaceholder = forms.getPhoneMask(forms.MASK_TYPE_PLACEHOLDER, data);
				commit(Mutation.SET_PHONE_MASK_PLACEHOLDER, phoneMaskPlaceholder)
				return true
			}, (err) => {
				console.log(err)
				return false
			})
	},
	clearEvents({commit}) {
		commit(Mutation.CLEAR_EVENTS);
		commit('calendar/CALENDAR_RERENDER', null, { root: true })
	},
}
