import * as Mutation from "./mutation-types";

export default {
	[Mutation.SET_FILTERS_IS_FETCHING](state) {
		state.filtersIsFetched = false;
	},
	[Mutation.SET_FILTERS_IS_FETCHED](state) {
		state.filtersIsFetched = true;
	},
	[Mutation.SET_SELECTED_FILTER_SECTION](state, payload) {
		state.selectedFilterSection = payload.section;
	},
	[Mutation.SET_CLUB_FILTER_OPTIONS](state, payload) {
		state.filterOptions.clubs = payload;
		state.isHavingSeveralClubs = payload.length > 1
	},
	[Mutation.SET_FILTER_OPTIONS](state, filterOptions) {
		const clubs = state.filterOptions.clubs;
		state.filterOptions = filterOptions.data;
		state.filterOptions.clubs = clubs;
	},
	[Mutation.CLEAR_FILTERS](state) {
		let filterKey = state.filterComponentKey;
		state.filterComponentKey = filterKey + 1;
		let branchFilterComponentKey = state.branchFilterComponentKey;
		state.branchFilterComponentKey = branchFilterComponentKey + 1;
		state.filter = {
			'clubFilter': 1,
			'placeFilter': [],
			'scheduleTemplateFilter': [],
			'trainerFilter': [],
			'branchFilter': [],
			'onlineFilter': false,
			'registrationFilter': false,
			'payFilter': false,
		};
	},
	[Mutation.SET_CLUB_FILTER](state, payload) {
		let branchFilterComponentKey = state.branchFilterComponentKey;
		state.branchFilterComponentKey = branchFilterComponentKey + 1;
		state.filter = {
			'clubFilter': payload.club,
			'trainerFilter': [],
			'scheduleTemplateFilter': [],
			'placeFilter': [],
			'branchFilter': [],
			'onlineFilter': false,
			'registrationFilter': false,
			'payFilter': false,
		}
	},
	[Mutation.SET_TRAINER_FILTER](state, payload) {
		let scheduleTemplateFilter = state.filter.scheduleTemplateFilter.length ? state.filter.scheduleTemplateFilter : [];
		let placeFilter = state.filter.placeFilter.length ? state.filter.placeFilter : [];
		let branchFilter = state.filter.branchFilter.length ? state.filter.branchFilter : [];
		let onlineFilter = state.filter.onlineFilter;
		let registrationFilter = state.filter.registrationFilter;
		let payFilter = state.filter.payFilter;
		state.filter = {
			'clubFilter': state.filter.clubFilter,
			'trainerFilter': payload.trainer,
			'scheduleTemplateFilter': scheduleTemplateFilter,
			'placeFilter': placeFilter,
			'branchFilter': branchFilter,
			'onlineFilter': onlineFilter,
			'registrationFilter': registrationFilter,
			'payFilter': payFilter,
		}
	},
	[Mutation.SET_SCHEDULE_TEMPLATE_FILTER](state, payload) {
		let trainerFilter = state.filter.trainerFilter.length ? state.filter.trainerFilter : [];
		let placeFilter = state.filter.placeFilter.length ? state.filter.placeFilter : [];
		let branchFilter = state.filter.branchFilter.length ? state.filter.branchFilter : [];
		let onlineFilter = state.filter.onlineFilter;
		let registrationFilter = state.filter.registrationFilter;
		let payFilter = state.filter.payFilter;
		state.filter = {
			'clubFilter': state.filter.clubFilter,
			'trainerFilter': trainerFilter,
			'scheduleTemplateFilter': payload.scheduleTemplate,
			'placeFilter': placeFilter,
			'branchFilter': branchFilter,
			'onlineFilter': onlineFilter,
			'registrationFilter': registrationFilter,
			'payFilter': payFilter,
		}
	},
	[Mutation.SET_PLACE_FILTER](state, payload) {
		let trainerFilter = state.filter.trainerFilter.length ? state.filter.trainerFilter : [];
		let scheduleTemplateFilter = state.filter.scheduleTemplateFilter.length ? state.filter.scheduleTemplateFilter : [];
		let branchFilter = state.filter.branchFilter.length ? state.filter.branchFilter : [];
		let onlineFilter = state.filter.onlineFilter;
		let registrationFilter = state.filter.registrationFilter;
		let payFilter = state.filter.payFilter;
		state.filter = {
			'clubFilter': state.filter.clubFilter,
			'trainerFilter': trainerFilter,
			'scheduleTemplateFilter': scheduleTemplateFilter,
			'placeFilter': payload.place,
			'branchFilter': branchFilter,
			'onlineFilter': onlineFilter,
			'registrationFilter': registrationFilter,
			'payFilter': payFilter,
		}
	},
	[Mutation.SET_BRANCH_FILTER](state, payload) {
		let trainerFilter = state.filter.trainerFilter.length ? state.filter.trainerFilter : [];
		let scheduleTemplateFilter = state.filter.scheduleTemplateFilter.length ? state.filter.scheduleTemplateFilter : [];
		let placeFilter = state.filter.placeFilter.length ? state.filter.placeFilter : [];
		let onlineFilter = state.filter.onlineFilter;
		let registrationFilter = state.filter.registrationFilter;
		let payFilter = state.filter.payFilter;
		state.filter = {
			'clubFilter': state.filter.clubFilter,
			'trainerFilter': trainerFilter,
			'scheduleTemplateFilter': scheduleTemplateFilter,
			'placeFilter': placeFilter,
			'branchFilter': payload.branch,
			'onlineFilter': onlineFilter,
			'registrationFilter': registrationFilter,
			'payFilter': payFilter,
		}
	},
	[Mutation.CLEAR_BRANCH_FILTER](state) {
		state.filter.branchFilter = [];
	},
	[Mutation.CLEAR_BRANCH_FILTER_OPTIONS](state) {
		state.filterOptions.branches = [];
	},
	[Mutation.SET_ONLINE_FILTER](state, payload) {
		let trainerFilter = state.filter.trainerFilter.length ? state.filter.trainerFilter : [];
		let scheduleTemplateFilter = state.filter.scheduleTemplateFilter.length ? state.filter.scheduleTemplateFilter : [];
		let placeFilter = state.filter.placeFilter.length ? state.filter.placeFilter : [];
		let branchFilter = state.filter.branchFilter.length ? state.filter.branchFilter : [];
		let registrationFilter = state.filter.registrationFilter;
		let payFilter = state.filter.payFilter;

		state.filter = {
			'clubFilter': state.filter.clubFilter,
			'trainerFilter': trainerFilter,
			'scheduleTemplateFilter': scheduleTemplateFilter,
			'placeFilter': placeFilter,
			'branchFilter': branchFilter,
			'registrationFilter': registrationFilter,
			'onlineFilter': payload.online,
			'payFilter': payFilter
		}
	},
	[Mutation.SET_REGISTRATION_FILTER](state, payload) {
		let trainerFilter = state.filter.trainerFilter.length ? state.filter.trainerFilter : [];
		let scheduleTemplateFilter = state.filter.scheduleTemplateFilter.length ? state.filter.scheduleTemplateFilter : [];
		let placeFilter = state.filter.placeFilter.length ? state.filter.placeFilter : [];
		let branchFilter = state.filter.branchFilter.length ? state.filter.branchFilter : [];
		let payFilter = state.filter.payFilter;
		let onlineFilter = state.filter.onlineFilter;

		state.filter = {
			'clubFilter': state.filter.clubFilter,
			'trainerFilter': trainerFilter,
			'scheduleTemplateFilter': scheduleTemplateFilter,
			'placeFilter': placeFilter,
			'branchFilter': branchFilter,
			'registrationFilter': payload.registration,
			'onlineFilter': onlineFilter,
			'payFilter': payFilter
		}
	},
	[Mutation.SET_PAY_FILTER](state, payload) {
		let trainerFilter = state.filter.trainerFilter.length ? state.filter.trainerFilter : [];
		let scheduleTemplateFilter = state.filter.scheduleTemplateFilter.length ? state.filter.scheduleTemplateFilter : [];
		let placeFilter = state.filter.placeFilter.length ? state.filter.placeFilter : [];
		let branchFilter = state.filter.branchFilter.length ? state.filter.branchFilter : [];
		let registrationFilter = state.filter.registrationFilter;
		let onlineFilter = state.filter.onlineFilter;

		state.filter = {
			'clubFilter': state.filter.clubFilter,
			'trainerFilter': trainerFilter,
			'scheduleTemplateFilter': scheduleTemplateFilter,
			'placeFilter': placeFilter,
			'branchFilter': branchFilter,
			'registrationFilter': registrationFilter,
			'onlineFilter': onlineFilter,
			'payFilter': payload.pay
		}
	},
}
