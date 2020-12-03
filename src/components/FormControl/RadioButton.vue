<template>
	<label class="radio">
		<input
			type="radio"
			:value="value"
			:name="name"
			v-model="radioButtonValue"
			:checked="value === this.$store.state.filters.filter.clubFilter"
		>
		<span>{{ label }}</span>
	</label>
</template>

<script>
import {eventBus} from "../../main";

export default {
	name: "RadioButton",
	props: {
		name: {
			type: String,
			default: ''
		},
		label: {
			type: String,
			default: ''
		},
		value: {
			type: Number,
			default: 1
		},
	},
	computed: {
		radioButtonValue: {
			get: function() {
				return this.value
			},
			set: function() {
				eventBus.$emit('changeClub', {value: this.value});
			}
		}
	}
}
</script>
