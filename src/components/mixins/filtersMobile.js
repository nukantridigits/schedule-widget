export const filtersMobile = {
	methods: {
		cleanSelectedAllFilters:function () {
			let trainerFilterLength = this.filter.trainerFilter.length;
			let scheduleTemplateFilterLength = this.filter.scheduleTemplateFilter.length;
			let placeFilterLength = this.filter.placeFilter.length;

			if (this.filter.trainerFilter && this.filterOptions.trainers && trainerFilterLength === this.filterOptions.trainers.length) {
				this.$store.dispatch(
					'filters/setTrainerFilter', []
				);
			}
			if (this.filter.scheduleTemplateFilter && this.filterOptions.scheduleTemplates && scheduleTemplateFilterLength === this.filterOptions.scheduleTemplates.length) {
				this.$store.dispatch(
					'filters/setScheduleTemplateFilter', []
				);
			}
			if (this.filter.placeFilter && this.filterOptions.places && placeFilterLength === this.filterOptions.places.length) {
				this.$store.dispatch(
					'filters/setPlaceFilter', []
				);
			}
		}
	}
}
