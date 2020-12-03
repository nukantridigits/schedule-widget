<template>
	<Checkbox
		v-model="isNeedPay"
		:size="this.size"
		:default="this.isNeedPay"
		filter="pay"
	>
		<div class="checkbox_label">
			<div class="checkbox_label_icon">
				<IconBase
					icon-name="dollars"
					title="Платные"
					:showIconDescription="true"
					:show-icon="this.showIcon"
					:no-divider="this.noDivider"
				>
					<IconDollars v-if="showIcon"/>
				</IconBase>
			</div>
		</div>
	</Checkbox>
</template>

<script>
import Checkbox from "../../FormControl/Checkbox";
import IconBase from "../../icons/IconBase";
import IconDollars from "../../icons/IconDollars";
import {eventBus} from "../../../main";
import {storeToComputed} from "../../mixins/storeToComputed";
export default {
	name: "PayFilter",
	components: {IconBase, IconDollars, Checkbox},
	mixins: [storeToComputed],
	created() {
		eventBus.$on('resetAllMenuFilters', () => {
			this.isNeedPay = false;
		});
		eventBus.$on('setClubFilter', () => {
			this.isNeedPay = false;
		});
	},
	data() {
		return {
			isNeedPay: this.$store.state.filters.filter.payFilter
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
		setPayFilter: function () {
			this.$store.dispatch(
				'filters/setPayFilter', this.isNeedPay
			);
		},
	},
	watch: {
		'isNeedPay': {
			handler: function () {
				this.setPayFilter();
			},
		},
	},
}
</script>
