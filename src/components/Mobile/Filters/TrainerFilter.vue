<template>
	<div class="trainer_filter filter_wrapper">
		<div class="checkbox_list">
			<vue-checkbox-group v-model="selectedTrainers">
				<vue-checkbox
					v-for="option in this.filterOptions.trainers"
					:key="option.value + '-' + option.label"
					:value="option.value"
				>
					{{option.label}}
				</vue-checkbox>
			</vue-checkbox-group>
		</div>
		<FilterControl :alias="this.filtersSectionList.trainer.alias"/>
	</div>
</template>

<script>
import {storeToComputed} from "../../mixins/storeToComputed";
import {eventBus} from "../../../main";
import FilterControl from "./FilterControl/FilterControl";
export default {
	name: "TrainerFilter",
	components: {FilterControl},
	mixins: [storeToComputed],
	created() {
		eventBus.$on('resetFilters', (alias) => {
			if (alias === this.filtersSectionList.trainer.alias) {
				this.selectedTrainers = [];
			}
		});

		eventBus.$on('selectAllFilters', (alias) => {
			if (alias === this.filtersSectionList.trainer.alias) {
				let selectAllOptions = [];
				this.filterOptions.trainers.forEach((option) => {
					selectAllOptions.push(option.value);
				});

				this.selectedTrainers = selectAllOptions;
			}
		});
	},
	data() {
		return {
			selectedTrainers: this.$store.state.filters.filter.trainerFilter
		}
	},
	methods: {
		setSelectedTrainers: function () {
			this.$store.dispatch(
				'filters/setTrainerFilter', this.selectedTrainers
			);
		},
	},
	watch: {
		'selectedTrainers': {
			handler: function () {
				this.setSelectedTrainers();
			},
		},
	},
}
</script>
