<template>
		<div :class="['filters_top',{sm: isHavingSeveralClubs}]">
			<SelectCustom v-if="filterOptions.clubs && filterOptions.clubs.length > 0 && isHavingSeveralClubs"
					className="club"
					:options="filterOptions.clubs"
					@on-select-changed="setClubFilter"
					:placeholder="filterOptions.clubs[0].label"
			/>
			<SelectCustom v-if="optionsIsReady"
					className="trainer"
					:options="filterOptions.trainers"
					@on-select-changed="setTrainerFilter"
					:placeholder="placeholders.trainer"
					ref="trainerFilter"
			/>
			<SelectCustom v-if="optionsIsReady"
					className="scheduleTemplate"
					:options="filterOptions.scheduleTemplates"
					@on-select-changed="setScheduleTemplateFilter"
					:placeholder="placeholders.scheduleTemplate"
					ref="scheduleTemplateFilter"
			/>
			<SelectCustom v-if="optionsIsReady"
					className="place"
					:options="filterOptions.places"
					@on-select-changed="setPlaceFilter"
					:placeholder="placeholders.place"
					ref="placeFilter"
			/>
			<div class="checkbox_group" v-show="!isHavingSeveralClubs">
				<OnlineFilter/>
				<RegistrationFilter/>
				<PayFilter/>
			</div>
		</div>
</template>

<script>
import SelectCustom from "../FormControl/SelectCustom";
import {storeToComputed} from "../mixins/storeToComputed";
import OnlineFilter from "./Bottom/OnlineFilter";
import RegistrationFilter from "./Bottom/RegistrationFilter";
import PayFilter from "./Bottom/PayFilter";
import {eventBus} from "../../main";

const CLUB_PLACEHOLDER = 'Клуб';
const TRAINER_PLACEHOLDER = 'Тренер';
const SCHEDULE_TEMPLATE_PLACEHOLDER = 'Занятие';
const PLACE_PLACEHOLDER = 'Зал';

export default {
	name: "FiltersTop",
	components: {
		SelectCustom,
		PayFilter,
		RegistrationFilter,
		OnlineFilter
	},
	mixins: [storeToComputed],
	data() {
		return {
			isFiltered: false,
			selectConfig: {
				clearable: false,
				searchable: false,
			},
			placeholders: {
				club: CLUB_PLACEHOLDER,
				trainer: TRAINER_PLACEHOLDER,
				scheduleTemplate: SCHEDULE_TEMPLATE_PLACEHOLDER,
				place: PLACE_PLACEHOLDER
			}
		}
	},
	methods: {
		getNewFilterValue: function(filterValue) {
			let newValue = [];
			let val = filterValue.value;
			if (val !== 0) {
				newValue.push(val);
			}

			return newValue;
		},
		setClubFilter: function ({value}) {
			this.$store.dispatch('filters/setClubFilter', value.value);
			eventBus.$emit('setClubFilter');

			this.$store.dispatch('filters/clearBranchFilter');

			this.setSelectDefaultPlaceholder('trainerFilter', this.placeholders.trainer)
			this.setSelectDefaultPlaceholder('scheduleTemplateFilter', this.placeholders.scheduleTemplate)
			this.setSelectDefaultPlaceholder('placeFilter', this.placeholders.place)
		},
		setTrainerFilter: function ({value}) {
			this.$store.dispatch(
				'filters/setTrainerFilter', this.getNewFilterValue(value)
			);
		},
		setScheduleTemplateFilter: function ({value}) {
			this.$store.dispatch(
				'filters/setScheduleTemplateFilter', this.getNewFilterValue(value)
			);
		},
		setPlaceFilter: function ({value}) {
			this.$store.dispatch(
				'filters/setPlaceFilter', this.getNewFilterValue(value)
			);
		},
		setSelectDefaultPlaceholder: function (refName, placeholder) {
			const ref = this.$refs[refName];
			if (ref) {
				const refEl = ref.$el;
				const vsSelected = refEl.querySelector('.vs__selected');
				if (vsSelected) {
					vsSelected.textContent = placeholder;
				}
			}
		}
	}
}
</script>
