<template>
	<div :class="['link_text', `link_text_${this.color}`, `link_text_${this.size}`]">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "LinkText",
	props: {
		color: {
			type: String,
			default: 'blue'
		},
		size: {
			type: String,
			default: 'm'
		}
	},
}
</script>
