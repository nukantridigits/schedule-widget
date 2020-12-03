<template>
	<button :class="getButtonClassList()" :type="type">
		<slot></slot>
	</button>
</template>
<script>
export default {
	name: "Button",
	props: {
		color: {
			type: String,
			default: 'blue'
		},
		size: {
			type: String,
			default: 'm'
		},
		type: {
			type: String,
			default: 'button'
		},
		nowrap: {
			type: Boolean,
			default: false
		},
	},
	methods: {
		getButtonClassList: function () {
			let classList = `btn btn-${this.color} btn-${this.size}`;
			if (this.nowrap) {
				classList += ` btn-nowrap`
			}

			return classList;
		}
	}
}
</script>
