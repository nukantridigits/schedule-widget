<template>
		<div class="filter_option filters_menu_item" @click="goToSection(filterItem.alias)">
			<template v-if="filterItem.alias !== this.filtersSectionList.club.alias">
				<div class="filters_menu_item_label" >
					{{filterItem.label}}
				</div>
				<div class="filters_menu_item_status" v-if="getStatus(filterItem.alias)">
					<CircleIcon />
				</div>
			</template>
			<template v-else>
				<div class="filters_menu_item_label">
					{{getCurrentClubLabel()}}
				</div>
				<IconBase class="slider_nav_btn slider_nav_btn_next"
					v-if="this.isHavingSeveralClubs"
					icon-name="chevron-right"
					width="9"
					height="14"
					viewBox="0 0 11 18"
					title="Вперед"
					:no-divider="true"
				>
					<IconChevronRight/>
				</IconBase>
			</template>
		</div>
</template>
<script>
import {storeToComputed} from "../../../mixins/storeToComputed";
import CircleIcon from "./CircleIcon";
import lodash from 'lodash';
import IconBase from "../../../icons/IconBase";
import IconChevronRight from "../../../icons/IconChevronRight";

export default {
	name: "FiltersMenuItem",
	components: {IconBase, IconChevronRight, CircleIcon},
	mixins: [storeToComputed],
	props: {
		filterItem: {
			type: Object,
			default: function () {
				return {}
			}
		}
	},
	methods: {
		getCurrentClubLabel: function() {
			let result = '';
			const currentClubId = this.filter.clubFilter;
			const club = lodash.findKey(this.filterOptions.clubs, ['value', currentClubId]);
			result = this.filterOptions.clubs[club]['label'];

			return result;
		},
		goToSection: function (alias) {
			if (alias &&
				((alias === this.filtersSectionList.club.alias && this.isHavingSeveralClubs)
					|| (alias !== this.filtersSectionList.club.alias)))
				this.$store.dispatch('filters/setSelectedFilterSection', alias);
		},
		getStatus: function (alias) {
			const filtersList = this.filtersSectionList;
			let trainerFilterLength = this.filter.trainerFilter.length;
			let scheduleTemplateFilterLength = this.filter.scheduleTemplateFilter.length;
			let placeFilterLength = this.filter.placeFilter.length;

			switch (alias) {
				case filtersList.club.alias:
					return false;
				case filtersList.trainer.alias:
					if (trainerFilterLength && trainerFilterLength !== this.filterOptions.trainers.length) {
						return true;
					}
					break;
				case filtersList.training.alias:
					if (scheduleTemplateFilterLength && scheduleTemplateFilterLength !== this.filterOptions.scheduleTemplates.length) {
						return true;
					}
					break;
				case filtersList.place.alias:
					if (placeFilterLength && placeFilterLength !== this.filterOptions.places.length) {
						return true;
					}
					break;
			}

			return false;
		}
	}
}
</script>
