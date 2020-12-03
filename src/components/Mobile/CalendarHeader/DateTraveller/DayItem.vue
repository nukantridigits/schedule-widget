<template>
	<div class="day_item">
		{{day.number}} {{day.month}}, {{day.label}}
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
