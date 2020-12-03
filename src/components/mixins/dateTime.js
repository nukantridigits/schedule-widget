import {DAYS_RU, MONTH_RU} from "../../utils/dates";

export const dateTime = {
	methods: {
		getDateFormatted: function (date) {
			const {dayNumber, month, dayOfWeek} = date;
			return `${dayNumber} ${MONTH_RU[month]}, ${DAYS_RU[dayOfWeek]}`
		},
	},
	filters: {
		formatScheduleTime: function (value) {
			if (typeof value !== 'undefined') {
				return value.slice(0, -3)
			}

			return '';
		}
	},
}
