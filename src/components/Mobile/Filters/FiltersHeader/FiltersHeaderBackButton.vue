<template>
	<IconBase @click.native="backToFiltersMenu"
			icon-name="arrow-left"
			width="16"
			height="16"
			class="filters_header_back_btn"
			viewBox="0 0 16 16"
			title="Назад"
			:no-divider="true"
			v-if="this.selectedFilterSection !== ''"
	>
		<IconArrowLeft/>
	</IconBase>
</template>

<script>
import {storeToComputed} from "../../../mixins/storeToComputed";
import IconBase from "../../../icons/IconBase";
import IconArrowLeft from "../../../icons/IconArrowLeft";

export default {
	name: "FiltersHeaderBackButton",
	mixins: [storeToComputed],
	components: {
		IconBase,
		IconArrowLeft
	},
	methods: {
		backToFiltersMenu: function () {
			this.$store.dispatch('filters/setSelectedFilterSection', '');
		},
	}
}
</script>
