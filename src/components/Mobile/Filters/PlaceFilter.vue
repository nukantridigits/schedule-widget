<template>
	<div class="place_filter filter_wrapper">
		<div class="checkbox_list">
			<vue-checkbox-group v-model="selectedPlaces">
				<vue-checkbox
						v-for="option in this.filterOptions.places"
						:key="option.value + '-' + option.label"
						:value="option.value"
				>
					{{option.label}}
				</vue-checkbox>
			</vue-checkbox-group>
		</div>
		<FilterControl :alias="this.filtersSectionList.place.alias"/>
	</div>
</template>

<script>
import {storeToComputed} from "../../mixins/storeToComputed";
import FilterControl from "./FilterControl/FilterControl";
import {eventBus} from "../../../main";

export default {
	name: "PlaceFilter",
	components: {FilterControl},
	mixins: [storeToComputed],
	created() {
		eventBus.$on('resetFilters', (alias) => {
			if (alias === this.filtersSectionList.place.alias) {
				this.selectedPlaces = [];
			}
		});

		eventBus.$on('selectAllFilters', (alias) => {
			if (alias === this.filtersSectionList.place.alias) {
				let selectAllOptions = [];
				this.filterOptions.places.forEach((option) => {
					selectAllOptions.push(option.value);
				});

				this.selectedPlaces = selectAllOptions;
			}
		});
	},
	data() {
		return {
			selectedPlaces: this.$store.state.filters.filter.placeFilter
		}
	},
	methods: {
		setSelectedPlaces: function () {
			this.$store.dispatch(
				'filters/setPlaceFilter', this.selectedPlaces
			);
		},
	},
	watch: {
		'selectedPlaces': {
			handler: function () {
				this.setSelectedPlaces();
			},
		},
	},
}
</script>
