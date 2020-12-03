<template>
	<div class="no_events_msg_wrapper"
		v-show="this.events.length === 0 && this.fetchEventsCounter > 0 && this.eventsIsFetched"
	>
		<div class="no_events_msg">
			Записей на это время не найдено 🤷‍♀️
		</div>
	</div>
</template>

<script>
import {storeToComputed} from "./mixins/storeToComputed";

export default {
	name: "NoEventsMessage",
	mixins: [storeToComputed],
}
</script>
