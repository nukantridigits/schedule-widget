<template>
	<div class="club_filter filter_wrapper">
		<vue-radio
			v-for="club in this.filterOptions.clubs"
			v-model="selectedClub"
			:value="club.value"
			:key="`${club.value}-${club.label}`"
			@change="onClubChanged"
		>
			{{club.label}}
		</vue-radio>
	</div>
</template>

<script>
import {storeToComputed} from "../../mixins/storeToComputed";
import {eventBus} from "../../../main";
export default {
	name: "ClubFilter",
	mixins: [storeToComputed],
	data: function() {
		return {
			selectedClub: this.$store.state.filters.filter.clubFilter
		};
	},
	methods: {
		onClubChanged:function (value) {
			this.$store.dispatch(
				'filters/setClubFilter', value
			);
			eventBus.$emit('setClubFilter');
		}
	}
}
</script>
