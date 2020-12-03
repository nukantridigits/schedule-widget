import actions from './actions'
import mutations from './mutations'

const calendar = {
	state:{
		activeDayIndex: null,// номер выбранного дня (только моб)
		firstWeekDaysList: {},// список дней 1ой недели (только моб)
		nextWeekDaysList: {},// список дней следующей недели(только моб)
		workingHours: ['06:00', '23:00'], // время работы клуба
		start: null, // понедельник выбранной недели
		end: null, // воскресение выбранной недели
		calendarComponentKey: 0, // ключ для компонента Календарь
		scheduleNextWeek: {}, // дата последнего ивента календаря
		activeEventCheckFreeSlots: false, // сигнал для календаря о перепроверке кол-ва слотов у активного ивента
		firstWeek: null // выбрана первая неделя (только десктоп)
	},
	getters:{
		activeDayIndex: state => state.activeDayIndex,
		firstWeekDaysList: state => state.firstWeekDaysList,
		nextWeekDaysList: state => state.nextWeekDaysList,
		workingHours: state => state.workingHours,
		start: state => state.start,
		end: state => state.end,
		calendarComponentKey: state => state.calendarComponentKey,
		scheduleNextWeek: state => state.scheduleNextWeek,
		activeEventCheckFreeSlots: state => state.activeEventCheckFreeSlots,
		firstWeek: state => state.firstWeek,
	},
	mutations: mutations,
	actions: actions,
	namespaced: true,
}

export default calendar;
