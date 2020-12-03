<template>
	<Checkbox
		v-model="isNeedRegistration"
		:size="this.size"
		:default="this.isNeedRegistration"
		filter="registration"
	>
		<div class="checkbox_label">
			<div class="checkbox_label_icon">
				<IconBase
					icon-name="pencil"
					title="По записи"
					:showIconDescription="true"
					:show-icon="this.showIcon"
					:no-divider="this.noDivider"
				>
					<IconPencil />
				</IconBase>
			</div>
		</div>
	</Checkbox>
</template>

<script>
import Checkbox from "../../FormControl/Checkbox";
import IconBase from "../../icons/IconBase";
import IconPencil from "../../icons/IconPencil"
import {eventBus} from "../../../main";
import {storeToComputed} from "../../mixins/storeToComputed";

export default {
	name: "RegistrationFilter",
	components: {IconBase, IconPencil, Checkbox},
	mixins: [storeToComputed],
	created() {
		eventBus.$on('resetAllMenuFilters', () => {
			this.isNeedRegistration = false;
		});
		eventBus.$on('setClubFilter', () => {
			this.isNeedRegistration = false;
		});
	},
	data() {
		return {
			isNeedRegistration: this.$store.state.filters.filter.registrationFilter
		}
	},
	props: {
		showIcon: {
			type: Boolean,
			default: true
		},
		noDivider: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: 'm'
		}
	},
	methods: {
		setRegistrationFilter: function () {
			this.$store.dispatch(
				'filters/setRegistrationFilter', this.isNeedRegistration
			);
		},
	},
	watch: {
		'isNeedRegistration': {
			handler: function () {
				this.setRegistrationFilter();
			},
		},
	},
}
</script>
