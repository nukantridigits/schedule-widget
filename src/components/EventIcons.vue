<template>
	<div :class="['event_icons', showIconDescription ? 'with_description' : '']">
		<template v-if="!event.cancel && (event.transfer.length === 0 || event.transfer === '')">
			<template v-if="event.need_register">
				<IconBase icon-name="pencil" title="По записи" :showIconDescription="showIconDescription">
					<IconPencil/>
				</IconBase>
			</template>
			<template v-if="event.age === 'kids'">
				<IconBase
						icon-name="hatching-chick"
						width="18"
						height="19"
						viewBox="0 0 20 21"
						title="Для детей"
						:showIconDescription="showIconDescription"
				>
					<IconHatchingChick/>
				</IconBase>
			</template>
			<template v-if="event.need_pay === 1">
				<IconBase icon-name="dollars" title="Платная" :showIconDescription="showIconDescription">
					<IconDollars/>
				</IconBase>
			</template>
		</template>
		<template v-if="event.cancel">
			<IconBase icon-name="stop" title="Занятие отменено" :showIconDescription="showIconDescription">
				<IconStop/>
			</IconBase>
		</template>
		<template v-if="(event.transfer && event.transfer.length !== 0)">
			<IconBase
					icon-name="transfer"
					width="22"
					height="22"
					viewBox="0 0 18 18"
					title="Перенос занятия"
					:showIconDescription="showIconDescription"
			>
				<IconTransfer/>
			</IconBase>
		</template>
	</div>
</template>

<script>
import IconBase from "./icons/IconBase";
import IconPencil from './icons/IconPencil';
import IconDollars from './icons/IconDollars';
import IconStop from './icons/IconStop';
import IconHatchingChick from './icons/IconHatchingChick';
import IconTransfer from './icons/IconTransfer';

export default {
	name: "EventIcons",
	components: {
		IconBase, IconPencil, IconDollars, IconHatchingChick, IconStop, IconTransfer
	},
	props: {
		event: {
			type: Object,
			default: function () {
				return {}
			}
		},
		showIconDescription: {
			type: Boolean,
			default: false
		}
	}
}
</script>
