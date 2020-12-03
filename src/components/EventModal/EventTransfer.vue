<template>
	<div class="event_transfer">
		<div class="event_transfer_top">
			<IconBase
					icon-name="transfer"
					width="22"
					height="22"
					viewBox="0 0 18 18"
					title="Перенос занятия на"
					:showIconDescription="true"
			>
				<IconTransfer/>
			</IconBase>
		</div>
		<div class="event_transfer_bottom">
			<div class="event_transfer_bottom_date" v-if="transfer && transfer.date && Object.keys(transfer.date).length !== 0">{{getDateFormatted(transfer.date)}}</div>
			<div class="event_transfer_bottom_time">
				<div class="event_transfer_bottom_time_from" v-if="transfer && transfer.time && typeof (transfer.time.start) !== undefined && transfer.time.start !== null">
					{{transfer.time.start | formatScheduleTime}}
				</div>
				<div class="event_transfer_bottom_time_divider">-</div>
				<div class="event_transfer_bottom_time_to" v-if="transfer && transfer.time && typeof (transfer.time.end) !== undefined && transfer.time.end !== null">
					{{transfer.time.end | formatScheduleTime}}
				</div>
			</div>

		</div>
	</div>
</template>

<script>

import IconBase from "../icons/IconBase";
import IconTransfer from "../icons/IconTransfer";
import {dateTime} from "../mixins/dateTime";

export default {
	name: "EventTransfer",
	mixins: [dateTime],
	components: {
		IconBase,
		IconTransfer
	},
	props: {
		transfer: {
			type: Object,
			default: function () {
				return {}
			}
		}
	},
}
</script>


