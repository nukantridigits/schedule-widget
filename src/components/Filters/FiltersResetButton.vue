<template>
	<div class="filters_reset_button">
		<LinkText @click.native="clearFilters" :color="color">
			Сбросить
		</LinkText>
	</div>
</template>

<script>
import {eventBus} from "../../main";
import {storeToComputed} from "../mixins/storeToComputed";
import LinkText from "../../LinkText";
import {DARK_THEME} from "../constants";

export default {
	name: "FiltersResetButton",
	mixins: [storeToComputed],
	created() {
		this.DARK_THEME = DARK_THEME;
	},
	computed: {
		color() {
			return  this.theme === DARK_THEME ? 'white' : 'blue'
		}
	},
	components: {
		LinkText
	},
	methods: {
		clearFilters: function () {
			eventBus.$emit('clearFilters');
		},
	}
}
</script>
