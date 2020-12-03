<template>
	<div :class="this.getClass()">
		<PreloaderAnimated/>
	</div>
</template>

<script>
import PreloaderAnimated from "./Images/PreloaderAnimated";
import {POSITION_WINDOW, POSITION_CALENDAR} from "../variables";

export default {
	name: "Preloader",
	components: {PreloaderAnimated},
	props: {
		position: {
			type: String,
			default: POSITION_WINDOW
		},
	},
	methods: {
		getClass: function () {
			let result = ['preloader_wrapper'];
			if (this.position === POSITION_WINDOW) {
				result.push('screen_center')
			} else if (this.position === POSITION_CALENDAR) {
				result.push('calendar_top')
			}

			return result;
		}
	}
}
</script>

