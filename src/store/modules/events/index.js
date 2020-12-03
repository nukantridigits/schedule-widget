import actions from './actions'
import mutations from './mutations'

const events = {
	state:{
		events: [], // список текущих ивентов
		fetchEventsCounter: 0,
		activeEvent: {}, // занятие по которому кликнули (из ещё не прошедших)
		activeEventFreeSlots: null,
		isBooked: false,
		bookingError: '',
		eventsIsFetched: false,
		phoneMask: '',
		phoneMaskPlaceholder: '',
	},
	getters:{
		events: state => state.events,
		fetchEventsCounter: state => state.fetchEventsCounter,
		activeEvent: state => state.activeEvent,
		activeEventFreeSlots: state => state.activeEventFreeSlots,
		isBooked: state => state.isBooked,
		bookingError: state => state.bookingError,
		eventsIsFetched: state => state.eventsIsFetched,
		phoneMask: state => state.phoneMask,
		phoneMaskPlaceholder: state => state.phoneMaskPlaceholder,
	},
	mutations: mutations,
	actions: actions,
	namespaced: true,
}

export default events;
