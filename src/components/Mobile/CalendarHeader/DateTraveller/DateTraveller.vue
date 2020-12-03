<template>
	<div class="date_traveller" v-if="Object.keys(firstWeekDaysList).length !== 0 && Object.keys(nextWeekDaysList).length !== 0">
		<IconBase class="date_traveller_btn date_traveller_btn_prev"
			v-if="this.activeDayIndex > this.DAYS_IN_WEEK_COUNT"
			@click.native="backward"
			icon-name="chevron-left"
			width="11"
			height="18"
			viewBox="0 0 11 18"
			title="Назад"
			:no-divider="true"
		>
			<IconChevronLeft/>
		</IconBase>
		<DayItem :day="activeDay" v-if="Object.keys(activeDay).length !== 0"/>
		<IconBase class="date_traveller_btn date_traveller_btn_next"
			v-if="this.activeDayIndex <= this.DAYS_IN_WEEK_COUNT && this.scheduleNextWeek.isHavingSchedulesNextWeek"
			@click.native="forward"
			icon-name="chevron-right"
			width="11"
			height="18"
			viewBox="0 0 11 18"
			title="Вперед"
			:no-divider="true"
		>
			<IconChevronRight/>
		</IconBase>
	</div>
</template>

<script>

import moment from "moment";
import {storeToComputed} from "../../../mixins/storeToComputed";
import {DAYS_RU, MONTH_RU} from "../../../../utils/dates";
import IconBase from "../../../icons/IconBase";
import IconChevronLeft from "../../../icons/IconChevronLeft";
import IconChevronRight from "../../../icons/IconChevronRight";
import DayItem from './DayItem'
import {eventBus} from "../../../../main";
import * as constants from "../constants";

export default {
	name: "DateTraveller",
	components: {
		DayItem,
		IconBase,
		IconChevronLeft,
		IconChevronRight
	},
	mixins: [storeToComputed],
	data() {
		return {
			daysList: {},
		}
	},
	computed: {
		activeDay() {
			const activeDayIndex = this.activeDayIndex;
			return activeDayIndex > constants.DAYS_IN_WEEK_COUNT ?
				this.nextWeekDaysList[activeDayIndex] :
				this.firstWeekDaysList[activeDayIndex];
		},
	},
	created() {
		this.DAYS_IN_WEEK_COUNT = constants.DAYS_IN_WEEK_COUNT;
		eventBus.$on('setActiveDay', (dayId) => {
			this.setDayListActiveByDay(dayId);
		});
		eventBus.$on('dateTravellerBackward', () => {
			this.backward();
		});
		eventBus.$on('dateTravellerForward', () => {
			this.forward();
		});

		this.setDaysList();
	},
	methods: {
		setDayListActiveByDay: function (dayId) {
			//актуализируем состояние списка дней
			const dayList = this.daysList;
			const daysArray = this.getArrayFromObject(dayList);
			daysArray.forEach((day) => {
				this.daysList[day.id]['active'] = day.id === dayId
			});
		},
		setDayListActiveByDate: function (date) {
			//актуализируем состояние списка дней
			const dayList = this.daysList;
			const daysArray = this.getArrayFromObject(dayList);
			daysArray.forEach((day) => {
				this.daysList[day.id]['active'] = day.date === date
			});
		},
		getArrayFromObject: function (object) {
			let array = [];
			const keys = Object.keys(object);
			for (const key of keys) {
				array.push(object[key])
			}
			return array;
		},
		goToDate: function (newDate) {
			this.setDayListActiveByDate(newDate);
			eventBus.$emit('gotToDate', {date: newDate});
		},
		backward: function () {
			this.$store.dispatch('calendar/setActiveDayIndex', constants.FIRST_MONDAY_INDEX);
			this.goToDate(this.daysList[constants.FIRST_MONDAY_INDEX]['date']);
			eventBus.$emit('swipeAnimate', constants.DIRECTION_BACKWARD);
		},
		forward: function () {
			this.$store.dispatch('calendar/setActiveDayIndex', constants.NEXT_MONDAY_INDEX);
			this.goToDate(this.daysList[constants.NEXT_MONDAY_INDEX]['date']);
			eventBus.$emit('swipeAnimate', constants.DIRECTION_FORWARD);
		},
		setDaysList: function () {
			moment.updateLocale("en", {
				week: {
					dow: 1,
				}
			});

			const today = moment();
			const todayNumber = today.format('D');
			const todayLabel = DAYS_RU[today.format('dddd')];
			const todayMonth = MONTH_RU[today.format('MMMM')];

			const dateStart = moment().startOf('week');
			const dateEnd = moment(this.scheduleNextWeek.date);

			let counter = 1;
			while (dateEnd.diff(dateStart, 'days') >= 0) {
				let date = dateStart.format('YYYY-MM-DD');
				let number = dateStart.format('D');
				let month = MONTH_RU[dateStart.format('MMMM')]
				let dayLabel = DAYS_RU[dateStart.format('dddd')];
				let isToday = (todayNumber === number) && (todayLabel === dayLabel) &&
					(todayMonth === month);

				if (isToday) {
					this.$store.dispatch('calendar/setActiveDayIndex', counter);
				}

				this.daysList[counter] = {
					'id': counter,
					'date': date,
					'number': number,
					'month': month,
					'dayLabel': dayLabel,
					'active': isToday,
					'today': isToday
				};

				dateStart.add(1, 'days')
				counter++;
			}

			counter = null;
		},
	}
}
</script>
