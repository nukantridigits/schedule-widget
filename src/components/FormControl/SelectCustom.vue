<template>
	<div class="select_custom">
		<v-select
			:class="['filter', this.className]"
			:options="this.options"
			:keys="this.keys"
			:clearable="this.config.clearable"
			:searchable="this.config.searchable"
			@input="this.onSelectChanged"
			:placeholder="this.placeholder"
			:components="{OpenIndicator}"
		/>
	</div>
</template>

<script>
const DEFAULT_CONFIG = {
	clearable: false,
	searchable: false,
}
export default {
	name: "SelectCustom",
	props: {
		className: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		options: {
			type: Array,
			default: function () {
				return []
			}
		},
		keys: {
			type: Object,
			default: function () {
				return {}
			}
		},
		config: {
			type: Object,
			default: function () {
				return DEFAULT_CONFIG;
			}
		},
	},
	data() {
		return {
			OpenIndicator: {
				render: createElement => createElement('span', {class: [{'toggle': true}, 'custom_open_indicator']}),
			},
		}
	},
	methods: {
		onSelectChanged: function (payload) {
			this.$emit('on-select-changed', {value: payload})
		},
	},
}
</script>
