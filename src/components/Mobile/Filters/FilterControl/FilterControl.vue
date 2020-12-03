<template>
	<div class="filter_control">
		<LinkText class="resetBtn" size="s" @click.native="resetFilters">
			Сбросить
		</LinkText>
		<LinkText class="selectAllBtn" size="s" @click.native="selectAllFilters">
			Выбрать все
		</LinkText>
	</div>
</template>

<script>
import LinkText from "../../../../LinkText";
import {eventBus} from "../../../../main";
export default {
	name: "FilterControl",
	components: {LinkText},
	methods: {
		resetFilters: function () {
			eventBus.$emit('resetFilters', this.alias);
		},
		selectAllFilters: function () {
			eventBus.$emit('selectAllFilters', this.alias);
		},
	},
	props: {
		alias: {
			type: String,
			default: ''
		}
	},
}
</script>
