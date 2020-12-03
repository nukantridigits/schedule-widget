<template>
	<div id="mobile_app"
		:class="[
			this.showModal ? 'modal_is_opened' : 'modal_is_closed',
			this.events.length === 0 ? 'screen_fixed' : ''
		]">
		<Preloader v-if="this.showModalPreloader" :position="POSITION_WINDOW"/>
		<Fade @click.native="closeModal" v-if="this.showModal || this.showFilters">
			<Filters v-if="this.showFilters && !this.showModal" />
			<Modal @click.native="modalClickHandler" v-if="this.showModal && this.canShowModal && this.activeEvent && this.activeEvent.data" :event="this.activeEvent.data"/>
		</Fade>
		<Header />
		<div class="wrapper">
			<Preloader v-if="this.showEventsPreloader" :position="POSITION_CALENDAR"/>
			<CalendarHeader/>
			<Calendar :key="this.calendarComponentKey" domain="domain"/>
		</div>
	</div>
</template>

<script>
import Header from "./components/Mobile/Header/Header";
import Preloader from "./components/Preloader";
import Modal from "./components/Mobile/Modal";
import Fade from "./components/Fade";
import Calendar from "./components/Mobile/Calendar/Calendar";
import Filters from "./components/Mobile/Filters/Filters";
import Desktop from "./Desktop";
import {eventBus} from "./main";
import CalendarHeader from "./components/Mobile/CalendarHeader/CalendarHeader";
import {POSITION_WINDOW, POSITION_CALENDAR} from "./variables";

export default {
	name: "Mobile",
	components: {
		CalendarHeader, Fade, Modal, Preloader, Header,	Filters,
		Calendar
	},
	extends: Desktop,
	data() {
		return {
			showFilters: false
		}
	},
	created() {
		this.POSITION_WINDOW = POSITION_WINDOW;
		this.POSITION_CALENDAR = POSITION_CALENDAR;

		eventBus.$on('showFilters', (direction) => {
			const shadowRoot = document.getElementsByTagName('fitbase-widget')[0];
			const body = shadowRoot.closest('body');

			if (direction) {
				body.style.cssText = "height: 100vh; overflow-y: hidden; position:fixed";
			} else {
				body.style.cssText = "height: auto; overflow-y: scroll; position: static";
			}

			this.showFilters = direction;
		});
	},
}
</script>
