<template>
	<div id="desktop_app" :class="this.showModal ? 'modal_is_opened' : 'modal_is_closed'">
		<Preloader v-if="this.showModalPreloader" :position="POSITION_WINDOW"/>
		<IconSprites/>
		<Fade @click.native="closeModal" v-if="showModal">
			<Modal @click.native="modalClickHandler" v-show="this.showModal && this.canShowModal && this.activeEvent && this.activeEvent.data" :event="this.activeEvent.data"/>
		</Fade>
		<div class="wrapper">
			<Preloader v-if="this.showEventsPreloader" :position="POSITION_CALENDAR"/>
			<Filters :key="this.filterComponentKey"/>
			<Calendar :key="this.calendarComponentKey"/>
		</div>
	</div>
</template>

<script>
import {storeToComputed} from "./components/mixins/storeToComputed";
import Modal from "./components/Modal";
import Fade from "./components/Fade";
import Preloader from "./components/Preloader";
import Filters from "./components/Filters/Filters";
import Calendar from "./components/Calendar";
import {eventBus} from "./main";
import IconSprites from "./components/IconSprites";
import {POSITION_WINDOW, POSITION_CALENDAR} from "./variables";

export default {
	name: "Desktop",
	mixins: [storeToComputed],
	components: {
		IconSprites,
		Fade,
		Preloader,
		Calendar,
		Filters,
		Modal
	},
	created() {
		this.POSITION_WINDOW = POSITION_WINDOW;
		this.POSITION_CALENDAR = POSITION_CALENDAR;

		this.$store.dispatch('ui/setAppInitialized');
	},
	methods: {
		closeModal: function() {
			eventBus.$emit('closeModal');
		},
		modalClickHandler: function(e) {
			e.stopPropagation();
			return false;
		}
	}
}
</script>

