<template>
	<div class="filters_menu_checkbox_group">
		<OnlineFilter class="label_only" size="s" />
		<RegistrationFilter class="label_only" size="s" :show-icon="false" :no-divider="true" />
		<PayFilter class="label_only" size="s" :show-icon="false" :no-divider="true" />
	</div>
</template>

<script>
import OnlineFilter from "../../../Filters/Bottom/OnlineFilter";
import RegistrationFilter from "../../../Filters/Bottom/RegistrationFilter";
import PayFilter from "../../../Filters/Bottom/PayFilter";

export default {
	name: "FiltersMenuCheckboxGroup",
	components: {
		PayFilter,
		RegistrationFilter,
		OnlineFilter,
	},
}
</script>
