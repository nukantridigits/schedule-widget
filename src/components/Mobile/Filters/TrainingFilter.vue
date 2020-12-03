<template>
	<div class="training_filter filter_wrapper">
		<div class="checkbox_list">
			<vue-checkbox-group v-model="selectedTrainings">
				<vue-checkbox
						v-for="option in this.filterOptions.scheduleTemplates"
						:key="option.value + '-' + option.label"
						:value="option.value"
				>
					{{option.label}}
				</vue-checkbox>
			</vue-checkbox-group>
		</div>
		<FilterControl :alias="this.filtersSectionList.training.alias"/>
	</div>
</template>

<script>
import {storeToComputed} from "../../mixins/storeToComputed";
import {eventBus} from "../../../main";
import FilterControl from "./FilterControl/FilterControl";
export default {
	name: "TrainingFilter",
	components: {FilterControl},
	mixins: [storeToComputed],
	created() {
		eventBus.$on('resetFilters', (alias) => {
			if (alias === this.filtersSectionList.training.alias) {
				this.selectedTrainings = [];
			}
		});

		eventBus.$on('selectAllFilters', (alias) => {
			if (alias === this.filtersSectionList.training.alias) {
				let selectAllOptions = [];
				this.filterOptions.scheduleTemplates.forEach((option) => {
					selectAllOptions.push(option.value);
				});

				this.selectedTrainings = selectAllOptions;
			}
		});
	},
	data() {
		return {
			selectedTrainings: this.$store.state.filters.filter.scheduleTemplateFilter
		}
	},
	methods: {
		setSelectedTrainings: function () {
			this.$store.dispatch(
				'filters/setScheduleTemplateFilter', this.selectedTrainings
			);
		},
	},
	watch: {
		'selectedTrainings': {
			handler: function () {
				this.setSelectedTrainings();
			},
		},
	},
}
</script>
