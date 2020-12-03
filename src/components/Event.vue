<template>
	<div :class="['event_wrapper', event.extendedProps.isOver ? 'is_over' : '']" @click="this.openModal">
		<div class="event_stripe" :style="{ backgroundColor: event.extendedProps.border_color}"></div>
		<div class="event_content">
			<div class="event_top">
				<div class="event_time">
					<div class="event_time_from">{{event.extendedProps.display_start | formatEventDate}}</div>
					<div class="event_time_divider">-</div>
					<div class="event_time_to">{{event.extendedProps.display_end | formatEventDate}}</div>
				</div>
				<EventIcons :event="event.extendedProps" class="desktop"/>
			</div>
			<div class="event_title">{{ event.title }}</div>
			<div class="event_place">{{ event.extendedProps.place }}</div>
			<div class="event_free_slots">
				<template v-if="this.isHavingFreeSlots()">
					<div class="message">
						Свободных мест: <span class="count badge">{{ event.extendedProps.max_register - event.extendedProps.count_register }}</span>
					</div>
				</template>
				<template v-else>
					<div class="free_slots_error">Запись окончена</div>
				</template>
			</div>
			<EventIcons :event="event.extendedProps" class="desktop_small"/>
			<div :class="['event_trainer', event.extendedProps.trainer.replacement ? 'linethrough' : '']">{{
				event.extendedProps.trainer.shortFio }}
			</div>
		</div>
	</div>
</template>

<script>
import EventIcons from "./EventIcons";

export default {
	name: "Event",
	components: {
		EventIcons
	},
	props: {
		event: {
			type: Object,
			default: function () {
				return {}
			}
		},
	},
	methods: {
		openModal: function () {
			let props = this._props.event.extendedProps;
			if (!props.isOver) {
				this.$emit('openBookingModal', {eventId: props.event_id});
			}
		},
		isHavingFreeSlots() {
			return (this.event.extendedProps.max_register - this.event.extendedProps.count_register !== 0)
				&& !this.event.extendedProps.stop_registration;
		}
	},
	filters: {
		formatEventDate: function (value) {
			return value.slice(-8, -3)
		}
	},
}
</script>
