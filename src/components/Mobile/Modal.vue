<template>
	<div class="modal_wrapper">
		<div class="modal_container">
			<div class="modal_header">
				<div class="close_btn" @click="closeModal">
					<icon-base icon-name="close" width="30" height="30" viewBox="0 0 30 30" title="Закрыть">
						<icon-close/>
					</icon-base>
				</div>
				<div class="event_title">
					{{event.title}}
				</div>
				<div class="event_place">
					{{event.place}}
				</div>
			</div>

			<div class="modal_body">
				<div class="modal_body_top">
					<EventIcons :event="event" :show-icon-description="true" v-if="event.transfer.length === 0"/>
					<EventTransfer :transfer="event.transfer" v-else />
					<EventModalTimes :time="event.time" :date="event.date"/>
					<EventTrainer :trainer="event.trainer" :domain="this.domain"/>
				</div>
				<div class="modal_body_bottom">
					<EventModalRegistrationPanel :event="event" @closeModal="closeModal"/>
				</div>
			</div>

			<div class="modal_footer" v-if="event.description">
				<div class="event_description">
					<div class="event_description_caption">
						Описание занятия
					</div>
					<div class="event_description_content" v-html="event.description"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Modal from "../Modal";
import {storeToComputed} from "../mixins/storeToComputed";

export default {
	name: "ModalMobile",
	mixins: [storeToComputed],
	extends: Modal,
}
</script>
