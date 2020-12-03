<template>
	<div class="branch_filter" v-show="this.filterOptions && Object.keys(this.filterOptions).length > 0">
		<div class="branch_filter_wrapper" v-if="isTouchDevice">
			<BranchFilterRollMobile v-if="this.filterOptions.branches.length > 1"/>
		</div>
		<div class="branch_filter_desktop" v-else>
			<div class="branch_filter_plug" v-if="this.showBranchFilterPlug()"></div>
			<BranchFilterRoll/>
		</div>
	</div>
</template>

<script>
import BranchFilterRoll from "./BranchFilterRoll";
import BranchFilterRollMobile from "./BranchFilterRollMobile";
import {storeToComputed} from "../../../mixins/storeToComputed";

export default {
	name: "BranchFilter",
	mixins: [storeToComputed],
	components: {
		BranchFilterRoll, BranchFilterRollMobile
	},
	methods: {
		showBranchFilterPlug: function () {
			return [0,1].includes(this.filterOptions.branches.length)
		}
	}
}
</script>
