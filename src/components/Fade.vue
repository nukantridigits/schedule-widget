<template>
	<div class="fade">
		<slot></slot>
	</div>
</template>

<script>
import {storeToComputed} from "./mixins/storeToComputed";

export default {
	name: "Fade",
	mixins: [storeToComputed],
}
</script>
