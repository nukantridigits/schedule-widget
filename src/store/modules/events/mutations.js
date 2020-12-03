import * as Mutation from './mutation-types';

export default {
	[Mutation.SET_EVENTS_IS_FETCHING](state) {
		state.eventsIsFetched = false;
	},
	[Mutation.SET_EVENTS_IS_FETCHED](state) {
		state.eventsIsFetched = true;
	},
	[Mutation.SET_EVENTS](state, events) {
		state.events = events.data;
	},
	[Mutation.CLEAR_EVENTS](state) {
		state.events = [];
	},
	//сохраняем активный ивент (по которому кликнули)
	[Mutation.SET_ACTIVE_EVENT](state, activeEvent) {
		const activeEventData = activeEvent.data;
		const count = activeEventData.max_register - activeEventData.count_register;
		state.activeEvent = activeEvent;
		state.activeEventFreeSlots = count;
	},
	[Mutation.CLEAR_ACTIVE_EVENT](state) {
		state.activeEvent = {};
		state.activeEventFreeSlots = null;
		state.isBooked = false;
		state.bookingError = '';
	},
	[Mutation.SET_ACTIVE_EVENT_FREE_SLOTS](state, count) {
		state.activeEventFreeSlots = count;
	},
	[Mutation.SET_IS_BOOKED](state, status) {
		state.isBooked = status;
	},
	[Mutation.SET_BOOKING_ERROR](state, message) {
		state.bookingError = message;
	},
	[Mutation.SET_PHONE_MASK](state, phoneMask) {
		state.phoneMask = phoneMask;
	},
	[Mutation.SET_PHONE_MASK_PLACEHOLDER](state, phoneMaskPlaceholder) {
		state.phoneMaskPlaceholder = phoneMaskPlaceholder;
	},
	[Mutation.INCREASE_EVENTS_COUNTER](state) {
		state.fetchEventsCounter = state.fetchEventsCounter + 1;
	},
}
