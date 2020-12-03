<template>
	<form>
		<div class="input_wrapper">
			<masked-input
					v-model="phoneNumber"
					:mask="phoneMask"
					:placeholder="phoneMaskPlaceholder"
			/>
			<div class="error_msg" v-if="bookingError">
				{{bookingError}}
			</div>
		</div>
		<Button color="blue" size="m" @click.native="sendPhone" :disabled="!isValidated">
			Записаться
		</Button>
	</form>
</template>

<script>
import MaskedInput from 'vue-masked-input'
import Button from "../Button";
import {storeToComputed} from "../mixins/storeToComputed";
import {OPEN_BRACKET_CHAR} from "../../utils/forms";

export default {
	name: "EventModalPhoneForm",
	mixins: [storeToComputed],
	components: {
		MaskedInput,
		Button
	},
	computed: {
		isValidated() {
			let phoneNumber = this.phoneStringsFormat(this.phoneNumber);
			let phoneMask = this.phoneStringsFormat(this.phoneMask);

			return phoneNumber.length === phoneMask.length;
		},
	},
	data() {
		return {
			phoneNumber: '',
			maskConfig: {
				masked: true,
				type: "phone"
			}
		}
	},
	methods: {
		phoneStringsFormat: function (str) {
			let newStr = str.replace(/\s+/g, '');
			let openBracketPos = newStr.indexOf(OPEN_BRACKET_CHAR)
			return newStr.slice(openBracketPos);
		},
		sendPhone: function () {
			this.$emit('sendRegisrationRequest', {phoneNumber: this.phoneStringsFormat(this.phoneNumber)});
			this.phoneNumber = '';
		},
	},
}
</script>
