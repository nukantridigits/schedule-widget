<template>
	<IconBase @click.native="closeFilters"
		icon-name="close"
		width="26"
		height="26"
		viewBox="0 0 30 30"
		title="Закрыть"
		:no-divider="true"
	>
		<IconClose/>
	</IconBase>
</template>

<script>
import {storeToComputed} from "../../../mixins/storeToComputed";
import {eventBus} from "../../../../main";
import IconBase from "../../../icons/IconBase";
import IconClose from "../../../icons/IconClose"

export default {
	name: "FiltersHeaderCloseButton",
	mixins: [storeToComputed],
	components: {
		IconBase, IconClose
	},
	methods: {
		closeFilters: function () {
			eventBus.$emit('showFilters', false);
			this.$store.dispatch('filters/setSelectedFilterSection', '');
		},
	}
}
</script>
