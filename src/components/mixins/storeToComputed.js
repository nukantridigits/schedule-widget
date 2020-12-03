import {mapGetters} from "vuex";

export const storeToComputed = {
	methods: {},
	computed: {
		...mapGetters('calendar', [
			'activeDayIndex',
			'firstWeek',
			'firstWeekDaysList',
			'nextWeekDaysList',
			'calendarComponentKey',
			'scheduleNextWeek',
			'workingHours',
			'start',
			'end',
			'activeEventCheckFreeSlots',
		]),
		...mapGetters('ui', [
			'init',
			'domain',
			'showModal',
			'canShowModal',
			'showEventsPreloader',
			'showModalPreloader',
			'theme',
			'isSmallDesktop',
			'isTouchDevice',
			'isMobilePhone',
			'isMediumMobilePhone'
		]),
		...mapGetters('events', [
			'events',
			'fetchEventsCounter',
			'activeEvent',
			'activeEventFreeSlots',
			'isBooked',
			'bookingError',
			'eventsIsFetched',
			'phoneMask',
			'phoneMaskPlaceholder'
		]),
		...mapGetters('filters', [
			'filterOptions',
			'filter',
			'filtersIsFetched',
			'selectedFilterSection',
			'filtersSectionList',
			'filterComponentKey',
			'branchFilterComponentKey',
			'isHavingSeveralClubs'
		]),
		optionsIsReady() {
			return !!(this.filterOptions &&	this.filterOptions.trainers &&
				this.filterOptions.scheduleTemplates &&	this.filterOptions.places);
		},
	},
}
