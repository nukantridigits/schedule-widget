import * as Mutation from './mutation-types'

export default {
	[Mutation.SET_START](state, payload) {
		state.start = payload.start;
	},
	[Mutation.SET_END](state, payload) {
		state.end = payload.end;
	},
	[Mutation.CALENDAR_RERENDER](state) {
		let calendarKey = state.calendarComponentKey;
		state.calendarComponentKey = calendarKey + 1;
	},
	[Mutation.SET_SCHEDULE_NEXT_WEEK](state, payload) {
		state.scheduleNextWeek = payload.date;
	},
	[Mutation.SET_ACTIVE_DAY_INDEX](state, payload) {
		state.activeDayIndex = payload.index;
	},
	[Mutation.SET_FIRST_WEEK_DAYS_LIST](state, payload) {
		state.firstWeekDaysList = payload.list;
	},
	[Mutation.SET_NEXT_WEEK_DAYS_LIST](state, payload) {
		state.nextWeekDaysList = payload.list;
	},
	[Mutation.SET_ACTIVE_EVENT_CHECK_FREE_SLOTS](state, payload) {
		state.activeEventCheckFreeSlots = payload;
	},
	[Mutation.SET_FIRST_WEEK](state, payload) {
		state.firstWeek = payload;
	},
}
