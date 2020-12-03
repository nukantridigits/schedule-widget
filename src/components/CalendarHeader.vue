<template>
	<div class="calendar_header calendar_nav">
		<IconBase class="calendar_nav_btn calendar_nav_btn_prev"
			v-if="!firstWeek"
			@click.native="calendarGoTo(DIRECTION_BACKWARD)"
			icon-name="chevron-left"
			width="11"
			height="18"
			viewBox="0 0 11 18"
			title="Назад"
			:no-divider="true"
		>
			<IconChevronLeft/>
		</IconBase>
		<IconBase class="calendar_nav_btn calendar_nav_btn_next"
			v-if="firstWeek && scheduleNextWeek.isHavingSchedulesNextWeek"
			@click.native="calendarGoTo(DIRECTION_FORWARD)"
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

import * as constants from "./Mobile/CalendarHeader/constants";
import {eventBus} from "../main";
import IconBase from "./icons/IconBase";
import IconChevronLeft from "./icons/IconChevronLeft";
import IconChevronRight from "./icons/IconChevronRight";
import {storeToComputed} from "./mixins/storeToComputed";

export default {
	name: "CalendarHeader",
	components: {IconBase, IconChevronLeft, IconChevronRight},
	mixins: [storeToComputed],
	created() {
		this.DIRECTION_BACKWARD = constants.DIRECTION_BACKWARD
		this.DIRECTION_FORWARD = constants.DIRECTION_FORWARD
	},
	methods: {
		calendarGoTo: function (direction) {
			eventBus.$emit('calendarGoTo', direction);
		}
	}
}
</script>
