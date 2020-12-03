<template>
	<div :class="getCheckboxClassList()">
	<label>
		<input
			type="checkbox"
			:value="this.default"
			:ref="'checkbox_' + this.filter"
			@change="$emit('input', $event.target.checked)"
		/>
		<span></span>
	</label>
	<slot></slot>
	</div>
</template>
<script>
import {eventBus} from "../../main";

export default {
	name: 'Checkbox',
	created() {
		eventBus.$on('resetAllMenuFilters', () => {
			this.setChecked(false);
		});
		eventBus.$on('setClubFilter', () => {
			this.setDefault();
		});
	},
	async mounted() {
		this.setChecked(this.default);
	},
	props: {
		size: {
			type: String,
			default: 'm'
		},
		default: {
			type: Boolean,
			default: false
		},
		filter: {
			type: String,
			default: ''
		}
	},
	methods: {
		setDefault: function () {
			let refName = 'checkbox_' + this.filter;
			if (this.$refs[refName]) {
				this.$refs[refName].checked = false;
				this.$refs[refName].value = false;
			}
		},
		setChecked: function (value) {
			let refName = 'checkbox_' + this.filter;
			if (this.$refs[refName]) {
				this.$refs[refName].checked = value;
			}
		},
		getCheckboxClassList:function () {
			let result = 'checkbox_wrapper';
			if (this.size === 's') {
				result += ' checkbox_wrapper_small';
			}

			return result;
		}
	}
};
</script>
