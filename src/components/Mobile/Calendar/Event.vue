<template>
	<div :class="['event_wrapper', event.extendedProps.isOver ? 'is_over' : '']" @click="this.openModal">
		<div class="event_stripe" :style="{ backgroundColor: event.extendedProps.border_color}"></div>
		<div class="event_content">
			<div class="event_content_left">
				<div class="event_time">
					<div class="event_time_from">{{event.extendedProps.display_start | formatEventDate}}</div>
					<div class="event_time_to">{{event.extendedProps.display_end | formatEventDate}}</div>
				</div>
				<div class="event_content_info">
					<div class="event_title">{{ event.title }}</div>
					<div class="event_place">{{ event.extendedProps.place }}</div>
					<div class="event_free_slots">
						<template v-if="(event.extendedProps.max_register - event.extendedProps.count_register !== 0) && !event.extendedProps.stop_registration">
							<div class="message">
								Свободных мест: <span class="count badge">{{ event.extendedProps.max_register - event.extendedProps.count_register }}</span>
							</div>
						</template>
						<template v-else>
							<div class="free_slots_error">Запись окончена</div>
						</template>
					</div>
					<EventTrainer :trainer="event.extendedProps.trainer" v-if="event && event.extendedProps.trainer" :domain="domain" />
				</div>
			</div>
			<EventIcons :event="event.extendedProps"/>
		</div>
	</div>
</template>

<script>
import Event from "../../Event";

import EventTrainer from "../../EventModal/EventTrainer";
export default {
	name: "Event",
	props: {
		domain: {
			type: String,
			default: ''
		}
	},
	components: {EventTrainer},
	extends: Event
}
</script>
