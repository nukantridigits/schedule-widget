<template>
	<div class="event_times">
		<div class="event_times_top">
			<div class="date">{{getDateFormatted(this.date)}}</div>
		</div>
		<div class="event_times_bottom">
			<div class="time_from">{{time.start | formatScheduleTime}}</div>
			<div class="time_divider">-</div>
			<div class="time_to">{{time.end | formatScheduleTime}}</div>
			<div class="duration">{{time.duration}} мин</div>
		</div>
	</div>
</template>

<script>
import {dateTime} from "../mixins/dateTime";

export default {
	name: "EventModalTimes",
	mixins: [dateTime],
	props: {
		time: {
			type: Object,
			default: function () {
				return {}
			}
		},
		date: {
			type: Object,
			default: function () {
				return {}
			}
		}
	},
}
</script>

