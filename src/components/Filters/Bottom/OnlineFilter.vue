<template>
	<Checkbox
		v-model="isOnline"
		:size="this.size"
		:default="this.isOnline"
		filter="online"
	>
		<div class="checkbox_label">
			Онлайн
		</div>
	</Checkbox>
</template>

<script>
import Checkbox from "../../FormControl/Checkbox";
import {eventBus} from "../../../main";
import {storeToComputed} from "../../mixins/storeToComputed";
export default {
	name: "OnlineFilter",
	components: {Checkbox},
	mixins: [storeToComputed],
	created() {
		eventBus.$on('resetAllMenuFilters', () => {
			this.isOnline = false;
		});
		eventBus.$on('setClubFilter', () => {
			this.isOnline = false;
		});
	},
	data() {
		return {
			isOnline: this.$store.state.filters.filter.onlineFilter
		}
	},
	props: {
		size: {
			type: String,
			default: 'm'
		}
	},
	methods: {
		setOnlineFilter: function () {
			this.$store.dispatch(
				'filters/setOnlineFilter', this.isOnline
			);
		},
	},
	watch: {
		'isOnline': {
			handler: function () {
				this.setOnlineFilter();
			},
		},
	},
}
</script>
