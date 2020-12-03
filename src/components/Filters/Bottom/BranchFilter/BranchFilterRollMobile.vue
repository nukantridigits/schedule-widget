<template>
		<div
			:class="['slider_wrapper_mobile']"
			v-if="filterOptions"
			ref="branchFilterRollMobile"
		>
					<Button
						@click.native="buttonClickHandler"
						class="branch_filter_roll_item"
						color="white"
						size="s"
						:nowrap="true"
						:data-value="branch.value"
						v-for="branch in filterOptions.branches"
						:key="branch.value + branch.label"
					>
						{{branch.label}}
					</Button>
		</div>
</template>

<script>
import {storeToComputed} from "../../../mixins/storeToComputed";
import {branchFilterMixin} from "./branchFilterMixin";
import Button from "../../../Button";

export default {
	name: "BranchFilterRollMobile",
	mixins: [storeToComputed, branchFilterMixin],
	components: {
		Button,
	},
}
</script>
