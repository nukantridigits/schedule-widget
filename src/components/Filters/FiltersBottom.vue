<template>
	<div :class="['filters_bottom', {sm: isHavingSeveralClubs}]">
		<BranchFilter :key="this.branchFilterComponentKey"/>
		<div class="filters_bottom_right">
			<div class="checkbox_group" v-if="isHavingSeveralClubs">
				<OnlineFilter/>
				<RegistrationFilter/>
				<PayFilter/>
			</div>
			<FiltersResetButton position="right" />
		</div>
	</div>
</template>

<script>
import BranchFilter from "./Bottom/BranchFilter/BranchFilter";
import OnlineFilter from "./Bottom/OnlineFilter";
import RegistrationFilter from "./Bottom/RegistrationFilter";
import PayFilter from "./Bottom/PayFilter";
import FiltersResetButton from "./FiltersResetButton";
import {storeToComputed} from "../mixins/storeToComputed";

export default {
	name: "FiltersBottom",
	mixins: [storeToComputed],
	components: {
		FiltersResetButton,
		PayFilter,
		RegistrationFilter,
		BranchFilter,
		OnlineFilter
	},
}
</script>
