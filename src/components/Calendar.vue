<template>
	<div class="calendar">
		<CalendarHeader ref="calendarNav"/>
		<ClockIconCalendar/>
		<FullCalendar v-if="filter"
				class="full-calendar"
				:options="config"
				ref="calendar"
		>
			<template #eventContent="{ event }">
				<event :event="event" @openBookingModal="openBookingModal"/>
			</template>
		</FullCalendar>
		<NoEventsMessage/>
	</div>
</template>

<script>
import {storeToComputed} from "./mixins/storeToComputed";
import {getDayHeaderContent} from "./mixins/dayHeaderContent";
import {eventBus} from "../main";
import CalendarHeader from "./CalendarHeader";
import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid'
import ruLocale from '@fullcalendar/core/locales/ru'
import moment from 'moment'
import Event from "./Event";
import {mapActions} from "vuex";
import ClockIconCalendar from "./ClockIconCalendar";
import {filtersMobile} from "./mixins/filtersMobile";
import NoEventsMessage from "./NoEventsMessage";
import {DARK_THEME} from "./constants";
import {DIRECTION_BACKWARD, DIRECTION_FORWARD} from "./Mobile/CalendarHeader/constants";

const DATE_FORMAT = 'YYYY-MM-DD'

export default {
	name: "Calendar",
	mixins: [storeToComputed, getDayHeaderContent, filtersMobile],
	components: {
		NoEventsMessage,
		ClockIconCalendar,
		Event,
		FullCalendar,
		CalendarHeader
	},
	data() {
		return {
			activeDate: null,
			positionedEvents: 0,
			itemsOnSlot: {},
			maxItemsOnRow: {},
			timeGridSlotsIsCleaned: false
		}
	},
	computed: {
		config() {
			return {
				...this.configOptions,
				...this.eventHandlers,
			}
		},
		configOptions() {
			return {
				events: this.events,
				eventOrder: 'startTimestamp',
				locale: ruLocale,
				slotEventOverlap: false,
				slotMinTime: '06:00:00',
				slotMaxTime: '23:00:00',
				allDaySlot: false,
				initialDate: this.start,
				dayHeaderContent: this.getDayHeader,
				slotMinWidth: '80',
				slotLabelFormat: {
					hour: '2-digit',
					minute: '2-digit',
					meridiem: 'short'
				},
				slotLabelInterval: "01:00:00",
				slotDuration: "01:00:00",
				nowIndicator: false,
				initialView: 'timeGridWeek',
				plugins: [timeGridPlugin],
				headerToolbar: {
					left: 'prev',
					center: false,
					right: 'next'
				},
			}
		},
		eventHandlers() {
			return {
				datesSet: this.onUpdateDates,
				eventDidMount: this.onEventDidMount,
				viewDidMount : this.onViewDidMount,
			}
		}
	},
	methods: {
		...mapActions([
			'fetchEvents', 'fetchActiveEvent',
		]),
		onViewDidMount: function() {
			if(!this.isTouchDevice) {
				this.appendCalendarNavToFcToolbar();
			}
		},
		setTimeEdges: function (activeDate) {
			// сохраняем текущие даты;
			const isTouch = this.isTouchDevice;
			const vm = this;
			let date = !activeDate ?  moment() : moment(activeDate);
			let start = isTouch ? date.clone().format(DATE_FORMAT) :
				date.clone().startOf('week').format(DATE_FORMAT);
			let end = isTouch ? date.clone().format(DATE_FORMAT) :
				date.clone().endOf('week').format(DATE_FORMAT);
			vm.$store.dispatch('calendar/setStart', start);
			vm.$store.dispatch('calendar/setEnd', end);
		},
		openBookingModal: function({eventId}) {
			this.fetchActiveEvent(eventId);
			this.$store.dispatch('ui/showModal');
		},
		onCloseBookingModal: function() {
			this.fetchEvents();
		},
		getCalendar: function () {
			return this.$refs.calendar.getApi();
		},
		initTimegridSlots: function() {
			const calendarEl = this.$refs.calendar.$el;
			const timeSlots = calendarEl.querySelectorAll('.fc-timegrid-slot-lane');
			if (timeSlots) {
				[...timeSlots].forEach((item) => {
					let tr = item.closest('tr');
					tr.style.setProperty('position', 'static', 'important');
					tr.style.setProperty('opacity', '0', 'important');
					tr.style.setProperty('height', 'auto', 'important');
				});
			}

			this.timeGridSlotsIsCleaned = true;
		},
		onUpdateDates: function () {
			const calendar = this.getCalendar();
			const isTouch = this.isTouchDevice;

			//прячем цифры слева
			this.displayTimegridSlotLabels(false);

			moment.updateLocale("en", {
				week: {
					dow: 1,
				}
			});

			this.setTimeEdges(calendar.getDate());
			this.fetchEvents();

			if (isTouch) {
				eventBus.$emit('updateDates');
			}
		},
		fetchActiveEvent: function(eventId) {
			this.$store.dispatch('events/fetchActiveEvent', {eventId, apiUrl: this.domain});
		},
		fetchEvents: function () {
			const {start, end, filter} = this;
			this.$store.dispatch('events/fetchEvents', {start, end, filter, apiUrl: this.domain});
		},
		onEventDidMount: function (info) {
			// рендер каждого из ивентов:
			const calendarEl = this.$refs.calendar.$el;
			const extendedProps = info.event._def.extendedProps;

			if (this.isTouchDevice) {
				info.el.dataset.eventId = extendedProps.event_id;
			} else {
				this.positionedEvents++;


				const eventStart = extendedProps.display_start;
				const el = info.el.closest('.fc-timegrid-event-harness');
				if (el) {
					el.classList.add('hide');
				}

				let momentObject = moment(eventStart);
				let roundDown = momentObject.startOf('hour');
				let start = roundDown.format("ddd MMM DD YYYY HH:mm:ss");
				start += " GMT+0000";

				if (!(start in this.itemsOnSlot)) {
					this.itemsOnSlot[start] = 0;
				} else {
					this.itemsOnSlot[start]++;
				}
				const marginTop = this.isSmallDesktop ? 188 : 168;
				el.style.setProperty('margin-top', this.itemsOnSlot[start] * marginTop + 'px', 'important');
				if (el) {
					el.classList.add('slot-attributes');
					el.dataset.eventId = extendedProps.event_id;
				}

				const reformatSkeleton = () => {
					if (this.timeGridSlotsIsCleaned) {
						for (let start in this.itemsOnSlot) {
							let time = start.slice(16, -9);
							if (!(time in this.maxItemsOnRow)) {
								this.maxItemsOnRow[time] = this.itemsOnSlot[start];
							} else {
								if (this.itemsOnSlot[start] > this.maxItemsOnRow[time]) {
									this.maxItemsOnRow[time] = this.itemsOnSlot[start];
								}
							}
						}

						const timegridSlots = calendarEl.querySelectorAll('.fc-timegrid-slot-lane');
						if (timegridSlots) {
							const height = this.isSmallDesktop ? 185 : 165;
							[...timegridSlots].forEach((item) => {
								let time = item.dataset.time;
								let tr = item.closest('tr');
								let borderBottomStyle = this.theme === DARK_THEME ? '1px solid #1f2127' : '3px solid #f8f8f8';
								if (time in this.maxItemsOnRow) {
									if (this.maxItemsOnRow[time] >= 0) {

										tr.style.setProperty('height', (this.maxItemsOnRow[time] * height + height + 5) + 'px', 'important');
										tr.style.setProperty('border-bottom', borderBottomStyle, 'important');
										tr.style.setProperty('color', 'black');
										tr.style.setProperty('opacity', '1', 'important');
									} else {
										tr.style.setProperty('height', '0', 'important');
										tr.style.setProperty('border', 'none', 'important');
										tr.style.setProperty('color', 'rgba(128,128,128,.15)');
										tr.style.setProperty('opacity', 0);
										tr.style.setProperty('position', 'absolute');
										tr.style.setProperty('left', '-90000px');
									}
								} else {
									tr.style.setProperty('height', '0', 'important');
									tr.style.setProperty('border', 'none', 'important');
									tr.style.setProperty('color', 'rgba(128,128,128,.15)');
									tr.style.setProperty('opacity', 0);
									tr.style.setProperty('position', 'absolute');
									tr.style.setProperty('left', '-90000px');
								}
							});
						}

						const events = calendarEl.querySelectorAll('.fc-timegrid-event-harness');
						if (events) {
							[...events].forEach((item) => {
								if(this.isSmallDesktop) {
									let containerWidth = calendarEl.getBoundingClientRect().width;
									let eventWidth = containerWidth * 154 / 1140;
									item.style.setProperty('width', eventWidth + 'px', 'important');
								}
								item.classList.remove('hide');
							});

							this.displayTimegridSlotLabels(true);
						}

						let fullCalendar = this.getCalendar();
						let ratio = fullCalendar.getOption('aspectRatio');
						fullCalendar.setOption('aspectRatio', ratio);

						this.positionedEvents = 0;
						this.itemsOnSlot = {};
						this.maxItemsOnRow = {};
						this.timeGridSlotsIsCleaned = false;
					}
				}

				//последний ивент отрендерен
				if (this.positionedEvents === this.events.length) {
					this.appendCalendarNavToFcToolbar();
					this.initTimegridSlots();
					reformatSkeleton();
				}
			}
		},
		displayTimegridSlotLabels: function (show = false) {
			//прячем/показываем часы https://prnt.sc/v4pysr
			const calendarEl = this.$refs.calendar.$el;
			let timeGridSlotLabels = calendarEl.querySelectorAll('.fc-scroller-harness .fc-timegrid-slots .fc-timegrid-slot.fc-timegrid-slot-label');
			if (timeGridSlotLabels.length) {
				[...timeGridSlotLabels].forEach((label) => {
					if (show === true) {
						label.classList.add('show');
					} else {
						label.classList.remove('show');
					}
				})
			}
		},
		setActiveEventFreeSlotsCount: function(eventId) {
			const calendarEl = this.$refs.calendar.$el;
			const eventEl = calendarEl.querySelector(`[data-event-id="${eventId}"]`);
			const countEl = eventEl.querySelector('.count');
			countEl.textContent = this.activeEventFreeSlots;
		},
		setActiveEventNoSlots:function (eventId) {
			const calendarEl = this.$refs.calendar.$el;
			const eventEl = calendarEl.querySelector(`[data-event-id="${eventId}"]`);
			const messageEl = eventEl.querySelector('.message');
			if (messageEl) {
				const eventFreeSlotsEl = eventEl.querySelector('.event_free_slots');
				const div = document.createElement('div');
				div.className = 'free_slots_error';
				div.innerHTML = `<div class="free_slots_error">Запись окончена</div>`;

				messageEl.remove();
				eventFreeSlotsEl.append(div);
			}
		},
		goToday: function () {
			const calendar = this.getCalendar();
			calendar.today();
		},
		calendarGoTo: function (direction) {
			let firstWeek;

			const calendar = this.getCalendar();
			if (direction === DIRECTION_BACKWARD) {
				firstWeek = true;
				calendar.prev();
			} else if(direction === DIRECTION_FORWARD) {
				firstWeek = false;
				calendar.next();
			}

			this.$store.dispatch('calendar/setFirstWeek', firstWeek)
		},
		appendCalendarNavToFcToolbar: function () {
			//перемещаем навигацию по неделям в тулбар календаря
			const calendarEl = this.$refs.calendar.$el;
			const calendarNav = this.$refs.calendarNav.$el;
			const headerToolbar = calendarEl.querySelector('.fc-header-toolbar');

			if (headerToolbar && calendarNav) {
				if (!calendarNav.closest('.fc-header-toolbar')) {
					headerToolbar.appendChild(calendarNav);
				}
			}
		}
	},
	created() {
		eventBus.$on('calendarGoTo', (direction)=> {
			this.calendarGoTo(direction);
		});

		eventBus.$on('clearFilters', ()=> {
			if (!this.isTouchDevice) {
				this.setTimeEdges();
			}
		});

		eventBus.$on('goToday', () => {
			this.goToday();
		});

		eventBus.$on('resetAllMenuFilters', () => {
			//сбросить все фильтры -- переход на сегодняшний день (только моб)
			if (this.isTouchDevice) {
				this.goToday();
			}
		});

		eventBus.$on('showCalendar', ()=> {
			const calendarWrapper = this.$refs.calendarWrapper;

			if (calendarWrapper) {
				calendarWrapper.classList.remove('hide');
			}

			if (!this.isTouchDevice) {
				let filters = document.getElementsByClassName('filters')[0];
				if (filters) {
					filters.classList.remove('hide');
				}
			}
		});
	},
	watch: {
		'filter': {
			handler: function () {
				this.$store.dispatch('events/clearEvents');
			},
		},
		'activeEventCheckFreeSlots': {
			//чтобы не перезагружать ивенты и календарь,при успешной регистрации - меняем кол-во свободных мест вручную
			handler: function (newVal) {
				if (newVal) {
					const {event_id: eventId} = this.activeEvent.data;
					if (Number(this.activeEventFreeSlots) !== 0) {
						this.setActiveEventFreeSlotsCount(eventId);
					} else {
						this.setActiveEventNoSlots(eventId);
					}
				}

				this.$store.dispatch('calendar/setActiveEventCheckFreeSlots', false);
			},
		},
	},
}
</script>
