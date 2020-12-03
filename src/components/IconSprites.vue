<template>
	<div class="icons_sprites">
		<IconBase icon-name="pencil" title="По записи" :showIconDescription="false">
			<IconPencil/>
		</IconBase>
		<IconBase
				icon-name="hatching-chick"
				width="18"
				height="19"
				viewBox="0 0 20 21"
				title="Для детей"
				:showIconDescription="false"
		>
			<IconHatchingChick/>
		</IconBase>
		<IconBase icon-name="dollars" title="Платная" :showIconDescription="false">
			<IconDollars/>
		</IconBase>
		<IconBase icon-name="stop" title="Занятие отменено" :showIconDescription="false">
			<IconStop/>
		</IconBase>
		<IconBase
				icon-name="transfer"
				width="22"
				height="22"
				viewBox="0 0 18 18"
				title="Перенос занятия"
				:showIconDescription="false"
		>
			<IconTransfer/>
		</IconBase>
	</div>
</template>

<script>
import IconBase from "../components/icons/IconBase";
import IconPencil from "../components/icons/IconPencil";
import IconHatchingChick from "../components/icons/IconHatchingChick";
import IconDollars from "../components/icons/IconDollars";
import IconStop from "../components/icons/IconStop";
import IconTransfer from "../components/icons/IconTransfer";

export default {
	name: "IconSprites",
	components: {
		IconBase,
		IconPencil,
		IconHatchingChick,
		IconDollars,
		IconStop,
		IconTransfer
	}
}
</script>
