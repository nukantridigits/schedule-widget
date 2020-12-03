<template>
	<transition name="modal">
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
						<EventTrainer :trainer="event.trainer" :domain="domain"/>
						<EventModalTimes :time="event.time" :date="event.date"/>
						<EventIcons :event="event" :show-icon-description="true" v-if="(event.transfer && event.transfer.length === 0)"/>
						<EventTransfer :transfer="event.transfer" v-else />
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
	</transition>
</template>

<script>
import IconBase from "./icons/IconBase";
import IconClose from "./icons/IconClose";
import EventIcons from "./EventIcons";
import EventTransfer from "./EventModal/EventTransfer"
import EventTrainer from "./EventModal/EventTrainer";
import EventModalTimes from "./EventModal/EventModalTimes";
import EventModalRegistrationPanel from "./EventModal/EventModalRegistrationPanel";
import {eventBus} from "../main";
import {storeToComputed} from "./mixins/storeToComputed";

export default {
	name: "Modal",
	mixins: [storeToComputed],
	components: {
		EventModalRegistrationPanel,
		IconBase,
		IconClose,
		EventTransfer,
		EventIcons,
		EventTrainer,
		EventModalTimes,
	},
	created() {
		eventBus.$on('closeModal', ()=> {
			this.closeModal();
		});
	},
	methods: {
		closeModal: function () {
			this.$store.dispatch('ui/hideModal');
		},
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
