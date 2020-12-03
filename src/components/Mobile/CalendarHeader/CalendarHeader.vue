<template>
	<div class="calendar_header">
		<template v-if="this.scheduleNextWeek && this.scheduleNextWeek.date">
			<DateTraveller/>
			<DaysTraveller/>
		</template>
		<BranchFilter/>
	</div>
</template>

<script>
import DaysTraveller from "./DaysTraveller/DaysTraveller";
import BranchFilter from "../../Filters/Bottom/BranchFilter/BranchFilter";
import DateTraveller from "./DateTraveller/DateTraveller";
import {storeToComputed} from "../../mixins/storeToComputed";

export default {
	name: "CalendarHeader",
	components: {
		DateTraveller, DaysTraveller, BranchFilter
	},
	mixins: [storeToComputed],
}
</script>
