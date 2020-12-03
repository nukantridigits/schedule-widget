<template>
	<div class="event_trainer" ref="eventTrainer">
		<div class="event_trainer_avatar">
			<img :src="`${domain}${trainer.avatar}`" alt="Тренер"/>
		</div>
			<div class="event_trainer_right">
				<div class="event_trainer_right_top">
					<div class="event_trainer_surname">
						{{trainer.surname}}
					</div>
					<div class="event_trainer_name">
						{{trainer.name}}
					</div>
				</div>
				<div class="event_trainer_replacement" v-if="trainer.replacement">
					{{trainer.replacement}}
				</div>
			</div>
	</div>
</template>

<script>
export default {
	name: "EventModalTrainer",
	props: {
		trainer: {
			type: Object,
			default: function () {
				return {}
			}
		},
		domain: {
			type: String,
			default: ''
		}
	},
}
</script>
