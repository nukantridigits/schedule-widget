import Vue from 'vue'
import * as Mutation from './mutation-types'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {getScheduleNextWeekUrl} from "../../../utils/api";
import {axiosConfig} from "../../../variables";

Vue.use(VueAxios, axios);
Vue.config.devtools = true;

export default {
	async getScheduleNextWeek({commit}, payload) {
		axios.get(getScheduleNextWeekUrl(payload), axiosConfig)
			.then((response) => {
				commit(Mutation.SET_SCHEDULE_NEXT_WEEK, {date: response.data})
				return true
			}, (err) => {
				console.log(err)
				return false
			})
	},
	calendarRerender({commit}) {
		commit(Mutation.CALENDAR_RERENDER)
	},
	setStart({commit}, payload) {
		commit(Mutation.SET_START, {start: payload})
	},
	setEnd({commit}, payload) {
		commit(Mutation.SET_END, {end: payload})
	},
	setActiveDayIndex({commit}, payload) {
		commit(Mutation.SET_ACTIVE_DAY_INDEX, {index: payload});
	},
	setFirstWeekDaysList({commit}, payload) {
		commit(Mutation.SET_FIRST_WEEK_DAYS_LIST, {list: payload});
	},
	setNextWeekDaysList({commit}, payload) {
		commit(Mutation.SET_NEXT_WEEK_DAYS_LIST, {list: payload});
	},
	setActiveEventCheckFreeSlots({commit}, payload) {
		commit(Mutation.SET_ACTIVE_EVENT_CHECK_FREE_SLOTS, payload);
	},
	setFirstWeek({commit}, payload) {
		commit(Mutation.SET_FIRST_WEEK, payload);
	},
}

