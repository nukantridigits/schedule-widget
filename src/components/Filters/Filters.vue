<template>
	<div class="filters">
		<FiltersTop />
		<FiltersBottom />
	</div>
</template>

<script>
import FiltersTop from "./FiltersTop";
import FiltersBottom from "./FiltersBottom";

export default {
	name: "Filters",
	components: {FiltersBottom, FiltersTop},
}
</script>
