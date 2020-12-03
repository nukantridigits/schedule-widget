<template>
	<div class="filters_header">
		<div class="filters_header_left">
			<FiltersHeaderBackButton/>
			<div class="filters_header_title">
				{{getTitle()}}
			</div>
		</div>
		<FiltersHeaderCloseButton class="close_btn"/>
	</div>
</template>

<script>
import filtersList from '../constants';
import {storeToComputed} from "../../../mixins/storeToComputed";
import {eventBus} from "../../../../main";
import FiltersHeaderBackButton from "./FiltersHeaderBackButton";
import FiltersHeaderCloseButton from "./FiltersHeaderCloseButton";

export default {
	name: "FiltersHeader",
	components: {FiltersHeaderCloseButton, FiltersHeaderBackButton},
	mixins: [storeToComputed],
	props: {
	},
	methods: {
		closeFilters: function() {
			eventBus.$emit('showFilters', false);
			this.clearSection();
		},
		backToFiltersMenu: function() {
			this.clearSection();
		},
		clearSection: function() {
			this.$store.dispatch('filters/setSelectedFilterSection', '');
		},
		getTitle: function () {
			const selectedSection = this.selectedFilterSection;
			if (selectedSection !== '') {
				return filtersList[selectedSection]['label'];
			}

			return 'Фильтры';
		}
	}
}
</script>
