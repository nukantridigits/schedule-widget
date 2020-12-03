import * as Mutation from "./mutation-types";
import axios from "axios";
import {getFilterOptionsUrl,getClubFilterOptionsUrl} from "../../../utils/api";
import {axiosConfig} from "../../../variables";

export default {
	async getClubFilterOptions ({commit}, payload) {
		axios.get(getClubFilterOptionsUrl(payload), axiosConfig)
			.then((response) => {
					commit(Mutation.SET_CLUB_FILTER_OPTIONS, response.data)
				return true
			}, (err) => {
				console.log(err)
				return false
			})
	},
	async getFilterOptions({commit}, payload) {
		commit(Mutation.CLEAR_BRANCH_FILTER_OPTIONS)
		commit(Mutation.SET_FILTERS_IS_FETCHING);
		axios.get(getFilterOptionsUrl(payload), axiosConfig)
			.then((response) => {
					commit(Mutation.SET_FILTER_OPTIONS, {data: response.data})
					commit(Mutation.SET_FILTERS_IS_FETCHED)
				return true
			}, (err) => {
				console.log(err)
				return false
			})
	},
	setClubFilter ({commit}, payload) {
		commit(Mutation.SET_CLUB_FILTER, {club: payload})
	},
	setTrainerFilter ({commit}, payload) {
		commit(Mutation.SET_TRAINER_FILTER, {trainer: payload})
	},
	setScheduleTemplateFilter({commit}, payload) {
		commit(Mutation.SET_SCHEDULE_TEMPLATE_FILTER, {scheduleTemplate: payload})
	},
	setPlaceFilter({commit}, payload) {
		commit(Mutation.SET_PLACE_FILTER, {place: payload})
	},
	setBranchFilter({commit}, payload) {
		commit(Mutation.SET_BRANCH_FILTER, {branch: payload})
	},
	clearBranchFilter({commit}) {
		commit(Mutation.CLEAR_BRANCH_FILTER)
	},
	setOnlineFilter({commit}, payload) {
		commit(Mutation.SET_ONLINE_FILTER, {online: payload})
	},
	setRegistrationFilter({commit}, payload) {
		commit(Mutation.SET_REGISTRATION_FILTER, {registration: payload})
	},
	setPayFilter({commit}, payload) {
		commit(Mutation.SET_PAY_FILTER, {pay: payload})
	},
	clearFilters({commit}) {
		commit(Mutation.CLEAR_FILTERS)
	},
	setSelectedFilterSection({commit}, payload) {
		commit(Mutation.SET_SELECTED_FILTER_SECTION, {section: payload});
	},
}
