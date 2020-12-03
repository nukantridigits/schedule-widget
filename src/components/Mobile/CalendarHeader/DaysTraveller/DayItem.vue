<template>
	<div
		:class="['day_item', {today: day.today}, {active: day.active}]"
		:day="day"
		:data-date="day.date"
		:data-day-id="day.id"
	>
	<div class="day_item_number">
			{{day.number}}
		</div>
		<div class="day_item_label">
			{{day.labelShort}}
		</div>
	</div>
</template>

<script>
export default {
	name: "DayItem",
	props: {
		day: {
			type: Object,
			default: function () {
				return {}
			}
		}
	},
}
</script>
