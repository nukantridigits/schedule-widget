<template>
	<div :class="[{'is_booked': isBooked},'registration_form', event.stop_registration || event.cancel || (event.transfer && event.transfer.length !== 0) ? 'short' : '' ]">
		<FormSuccessBg v-if="this.isBooked"/>
		<template v-if="(event.max_register - event.count_register !== 0) && !event.stop_registration && !event.cancel && (event.transfer && event.transfer.length === 0) && !isBooked">
			<div class="registration_form_request">
				<div class="registration_form_left">
					<div class="caption">Требуется предварительная запись</div>
					<div class="slots">
						Осталось: {{activeEventFreeSlots}} {{placesText}}
					</div>
				</div>
				<div class="registration_form_right">
					<EventModalPhoneForm  @sendRegisrationRequest="sendRegisrationRequest"/>
				</div>
			</div>
		</template>
		<div class="registration_form_is_booked" v-else-if="isBooked">
			<div class="registration_form_is_booked_content">
				<div class="caption lg">Вы записаны!</div>
				<Button color="blue" size="m" @click.native="closeModal">
					Вернуться к расписанию
				</Button>
			</div>
		</div>
		<template v-else-if="event.stop_registration || event.cancel || (event.transfer && event.transfer.length !== 0) || (activeEventFreeSlots === 0 && !isBooked)">
			<div class="caption closed">Запись окончена</div>
		</template>
	</div>
</template>

<script>
import EventModalPhoneForm from "./EventModalPhoneForm";
import Button from "../Button";
import {getWordDeclention} from "../../utils/text";
import {storeToComputed} from "../mixins/storeToComputed";
import FormSuccessBg from "../Images/FormSuccessBg";

export default {
	name: "EventModalRegistrationPanel",
	mixins: [storeToComputed],
	components: {
		EventModalPhoneForm,
		Button,
		FormSuccessBg
	},
	computed: {
		placesText() {
			return getWordDeclention(this.activeEventFreeSlots,['место', 'места', 'мест']);
		},
	},
	methods: {
		closeModal: function () {
			this.$emit('closeModal');
		},
		sendRegisrationRequest:function ({phoneNumber}) {
			let event = this.event;
			let eventId = event.event_id;
			let clubId = event.club_id;
			this.$store.dispatch('registration/registrationRequest', {eventId, phoneNumber, clubId, apiUrl: this.domain});
		}
	},
	props: {
		event: {
			type: Object,
			default: function () {
				return {}
			}
		}
	},
}
</script>
