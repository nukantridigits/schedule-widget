import moment from "moment";
const DATE_FORMAT = 'YYYY-MM-DD'

export const getFirstDayOfCurrentWeek = () => {
	return moment().startOf('isoWeek').format(DATE_FORMAT)
}

export const getToday = () => {
	return moment().format(DATE_FORMAT)
}

export const getLastDayOfCurrentWeek = () => {
	return moment().endOf('isoWeek').format(DATE_FORMAT)
}

export const MONTH_RU = {
	'January' : 'января',
	'February' : 'февраля',
	'March': 'марта',
	'April' : 'апреля',
	'May' : 'мая',
	'June' : 'июня',
	'July' : 'июля',
	'August' : 'августа',
	'September': 'сентября',
	'October': 'октября',
	'November': 'ноября',
	'December': 'декабря',
}

export const DAYS_RU = {
	'Monday' : 'понедельник',
	'Tuesday' : 'вторник',
	'Wednesday': 'среда',
	'Thursday' : 'четверг',
	'Friday' : 'пятница',
	'Saturday' : 'суббота',
	'Sunday' : 'воскресенье',
}

export const DAYS_RU_SHORT = {
	'Monday': 'пн',
	'Tuesday': 'вт',
	'Wednesday': 'ср',
	'Thursday': 'чт',
	'Friday': 'пт',
	'Saturday': 'сб',
	'Sunday': 'вс',
}





