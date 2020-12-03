<template>
	<div class="days_traveller_wrapper" v-touch:swipe="swipe">
		<div class="days_traveller" ref="daysTraveller">
			<Week
				class="firstWeek active"
				:daysList="this.firstWeekDaysList"
				ref="firstWeek"
			/>
			<Week
				class="secondWeek"
				:daysList="this.nextWeekDaysList"
				v-if="this.scheduleNextWeek.isHavingSchedulesNextWeek"
				ref="secondWeek"
			/>
		</div>
	</div>
</template>
<script>
import moment from "moment";
import {storeToComputed} from "../../../mixins/storeToComputed";
import {DAYS_RU, DAYS_RU_SHORT, MONTH_RU} from "../../../../utils/dates";
import {eventBus} from "../../../../main";
import Week from "./Week";
import * as constants from '../constants';

export default {
	name: "DaysTraveller",
	components: {
		Week,
	},
	mixins: [storeToComputed],
	created() {
		this.setDaysList();

		eventBus.$on('swipeAnimate', (direction) => {
			this.swipeAnimate(direction);
		});

		eventBus.$on('goToNewDate', (event) => {
			this.goToDate(event);
		});

		eventBus.$on('updateDates', () => {
			this.setActive(this.start);
		});

		eventBus.$on('resetAllMenuFilters', () => {
			const container = this.getContainer();
			const today = container.querySelector('.day_item.today');
			const dayId = Number(today.dataset.dayId);
			this.$store.dispatch('calendar/setActiveDayIndex', dayId);
		});
	},
	methods: {
		isOnWeek: function(list) {
			let array = [];
			const keys = Object.keys(list);
			for (const key of keys) {
				array.push(list[key])
			}

			return array.some(day => day.id === this.activeDayIndex);
		},
		getContainer: function () {
			return this.$refs.daysTraveller;
		},
		setDaysList: function () {
			moment.updateLocale("en", {
				week: {
					dow: 1,
				}
			});

			const today = moment();

			const todayData = {
				todayNumber: today.format('D'),
				todayLabelShort: DAYS_RU_SHORT[today.format('dddd')],
				todayLabel: DAYS_RU[today.format('dddd')],
				todayMonth: MONTH_RU[today.format('MMMM')]
			}
			const firstWeekEdges = {
				start: today.clone().startOf('isoWeek'),
				end: today.clone().endOf('isoWeek').subtract(1,'days')
			}
			const nextWeekEdges = {
				start: today.clone().add(1, 'weeks').startOf('isoWeek'),
				end: today.clone().add(1, 'weeks').endOf('isoWeek').subtract(1,'days'),
			}

			this.setWeekDays(constants.FIRST_WEEK, firstWeekEdges, todayData);
			this.setWeekDays(constants.NEXT_WEEK, nextWeekEdges);
		},
		setWeekDays: function (weekAlias = constants.FIRST_WEEK, weekEdges, today = null) {
			const {start, end} = weekEdges;
			let weekDays = {};

			let counter = weekAlias === constants.FIRST_WEEK ? constants.FIRST_MONDAY_INDEX : constants.NEXT_MONDAY_INDEX;
			while (end.diff(start, 'days') >= 0) {
				let isToday = false;
				let date = start.format('YYYY-MM-DD');
				let number = start.format('D');
				let labelShort = DAYS_RU_SHORT[start.format('dddd')];
				let label = DAYS_RU[start.format('dddd')];
				let month = MONTH_RU[start.format('MMMM')];


				if (weekAlias === constants.FIRST_WEEK) {
					const {todayNumber, todayLabelShort, todayLabel, todayMonth} = today;
					isToday = todayNumber === number &&
						todayLabel === label &&
						todayLabelShort === labelShort &&
						todayMonth === month;
				}

				weekDays[counter] = {
					'id': counter,
					'date': date,
					'month': month,
					'number': number,
					'labelShort': labelShort,
					'label': label,
					'active': isToday,
					'today': isToday,
				};

				start.add(1, 'days')
				counter++;
			}

			if (weekAlias === constants.FIRST_WEEK) {
				this.$store.dispatch('calendar/setFirstWeekDaysList', weekDays)
			} else if (weekAlias === constants.NEXT_WEEK) {
				this.$store.dispatch('calendar/setNextWeekDaysList', weekDays)
			}
		},
		setActive: function (date) {
			const container = this.getContainer();
			const active = container.querySelector('.day_item.active');
			if (active) {
				active.classList.remove('active');
			}
			const needleItem = container.querySelector('.day_item[data-date="' + date + '"]');
			if (needleItem) {
				needleItem.classList.add('active');
			}
		},
		goToDate: function (event) {
			const target = event.target;
			const container = this.getContainer();
			const dayItem = target.closest('.day_item');
			if (dayItem && !dayItem.classList.contains('active')) {
				const date = dayItem.dataset.date;
				const active = container.querySelector('.day_item.active');
				if (active) {
					active.classList.remove('active');
				}
				dayItem.classList.add('active');
				const dayId = Number(dayItem.dataset.dayId);
				this.$store.dispatch('calendar/setActiveDayIndex', dayId);
				eventBus.$emit('gotToDate', {date: date});
				eventBus.$emit('setActiveDay', dayId);
			}
		},
		swipe(direction) {
			if (direction === constants.DIRECTION_BACKWARD) {
				if (this.isOnWeek(this.firstWeekDaysList)) {
					return false;
				} else {
					this.swipeAnimate(constants.DIRECTION_BACKWARD);
					eventBus.$emit('dateTravellerBackward');
				}
			} else if (direction === constants.DIRECTION_FORWARD) {
				if (this.isOnWeek(this.nextWeekDaysList) || !this.scheduleNextWeek.isHavingSchedulesNextWeek) {
					return false;
				} else {
					this.swipeAnimate(constants.DIRECTION_FORWARD);
					eventBus.$emit('dateTravellerForward');
				}
			}
		},
		swipeAnimate(direction) {
			const firstWeek = this.$refs.firstWeek.$el;
			const secondWeek = this.$refs.secondWeek.$el;

			if (direction === constants.DIRECTION_BACKWARD) {
				firstWeek.classList.add('active');
				secondWeek.classList.remove('active');
			} else if (direction === constants.DIRECTION_FORWARD) {
				firstWeek.classList.remove('active');
				secondWeek.classList.add('active');
			}
		}
	},
}
</script>
