<template>
	<div class="show_filters_button">
		<div class="show_filters_button_label">Фильтры</div>
		<IconBase
			width="24"
			height="24"
			icon-name="options"
			view-box="0 0 24 24"
			:no-divider="true"
		>
			<IconOptions/>
		</IconBase>
	</div>
</template>

<script>
import IconBase from "../../icons/IconBase";
import IconOptions from "../../icons/IconOptions";

export default {
	name: 'ShowFiltersButton',
	components: {
		IconBase, IconOptions
	},
};
</script>
