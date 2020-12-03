<template>
	<div class="days_traveller_week">
		<DayItem v-for="day in daysList" :key="day.number" :day="day" @click.native="goToDate"/>
	</div>
</template>

<script>
import DayItem from "./DayItem";
import {eventBus} from "../../../../main";

export default {
	name: "Week",
	components: {DayItem},
	props: {
		daysList: {
			type: Object,
			default: function () {
				return {}
			}
		}
	},
	methods: {
		goToDate: function (event) {
			eventBus.$emit('goToNewDate', event);
		}
	}
}
</script>
