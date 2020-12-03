import axios from "axios";
import {getRegistrationRequestUrl} from "../../../utils/api";
import {axiosConfig} from "../../../variables";

const REGISTRATION_STATUS_SUCCESS = 'success';
export default {
	//принимаем результаты отправки телефонного номера на регистрацию
	async registrationRequest({commit}, payload) {
		commit('ui/SHOW_MODAL_PRELOADER', null, { root: true })
		axios.get(getRegistrationRequestUrl(payload), axiosConfig)
			.then((response) => {
				const {status, count, message} = response.data;
				if (status === REGISTRATION_STATUS_SUCCESS) {
					commit('events/SET_IS_BOOKED', true, { root: true })
				} else {
					commit('events/SET_IS_BOOKED', false, { root: true })
					commit('events/SET_BOOKING_ERROR', message, { root: true })
				}
				commit('events/SET_ACTIVE_EVENT_FREE_SLOTS', count, { root: true })
				commit('calendar/SET_ACTIVE_EVENT_CHECK_FREE_SLOTS', true, { root: true })
				commit('ui/HIDE_MODAL_PRELOADER', null, { root: true })
				return true
			}, (err) => {
				console.log(err)
				commit('ui/HIDE_MODAL_PRELOADER', null, { root: true })
				return false
			})
	},
}
