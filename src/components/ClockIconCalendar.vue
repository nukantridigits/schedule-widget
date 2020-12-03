<template>
	<div class="clock_icon">
		<IconBase width="37" height="30" icon-name="stopwatch" view-box="0 0 37 38">
			<IconStopwatch/>
		</IconBase>
	</div>
</template>

<script>
import IconBase from "./icons/IconBase";
import IconStopwatch from "./icons/IconStopwatch";

export default {
	name: "ClockIconCalendar",
	components: {
		IconBase,
		IconStopwatch,
	},
}
</script>
