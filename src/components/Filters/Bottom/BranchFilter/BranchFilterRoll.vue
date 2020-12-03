<template>
	<div :class="['slider_wrapper', {'transparent': this.filterOptions.branches.length < 2}]" v-if="this.filterOptions" ref="sliderWrapper">
		<div class="scroll_fader"/>
		<div class="slider_nav hidden" ref="sliderNav">
			<div class="gradient gradient_left slider_nav_btn slider_nav_btn_prev hidden">
				<IconBase
					@click.native="scroll(DIRECTION_BACKWARD)"
					icon-name="chevron-left"
					width="11"
					height="18"
					viewBox="0 0 11 18"
					title="Назад"
					:no-divider="true"
					ref="prev"
				>
					<IconChevronLeft/>
				</IconBase>
			</div>
			<div class="gradient gradient_right slider_nav_btn slider_nav_btn_next">
				<IconBase
						@click.native="scroll(DIRECTION_FORWARD)"
						icon-name="chevron-right"
						width="11"
						height="18"
						viewBox="0 0 11 18"
						title="Вперед"
						:no-divider="true"
						ref="next"
				>
					<IconChevronRight/>
				</IconBase>
			</div>
		</div>
		<div class="slides" ref="slides" v-observer:subtree.childList="onSlidesMutation">
			<div class="slide"
				v-for="branch in this.filterOptions.branches"
				:key="branch.value + branch.label"
			>
				<Button
						@click.native="buttonClickHandler"
						class="branch_filter_roll_item"
						color="white"
						size="s"
						:data-value="branch.value"
				>
					{{branch.label}}
				</Button>
			</div>
		</div>
	</div>
</template>

<script>

import {storeToComputed} from "../../../mixins/storeToComputed";
import Button from "../../../Button";
import {branchFilterMixin} from "./branchFilterMixin";
import IconBase from "../../../icons/IconBase";
import IconChevronLeft from "../../../icons/IconChevronLeft";
import IconChevronRight from "../../../icons/IconChevronRight";
import { observer } from 'vue-mutation-observer'

const DIRECTION_FORWARD = 'forward'; //отличается от стандартных на проекте(особенность сторонней либы со свайпом)
const DIRECTION_BACKWARD = 'backward'; //отличается от стандартных на проекте(особенность сторонней либы со свайпом)
const SCROLL_STEP = 250;
export default {
	name: "BranchFilterRoll",
	mixins: [storeToComputed, branchFilterMixin],
	components: {
		Button, IconBase, IconChevronLeft, IconChevronRight
	},
	directives: { observer },
	created() {
		this.DIRECTION_FORWARD = DIRECTION_FORWARD;
		this.DIRECTION_BACKWARD = DIRECTION_BACKWARD;
	},
	methods: {
		onSlidesMutation: function (mutations) {
			const usefulMutations = mutations.filter((mutation) => {
				return mutation.addedNodes.length > 0
			});

			if (this.filterOptions.branches.length === usefulMutations.length) {
				const container = this.$refs.slides;
				const sliderNav = this.$refs.sliderNav;
				if (container.scrollWidth > container.clientWidth) {
					sliderNav.style.display = 'block';
				} else {
					sliderNav.style.display = 'none';
				}
			}
		},
		scroll: function (direction) {
			const container = this.$refs.slides;
			const prevBtn = this.$refs.prev.$el.closest('.gradient');
			const nextBtn = this.$refs.next.$el.closest('.gradient');

			let scrollLeft = container.scrollLeft;
			let containerWidth = container.scrollWidth - container.clientWidth;
			const scrollTo = (container, left) => {
				return container.scrollTo({
					top: 0,
					left: left,
					behavior: "smooth"
				});
			}

			if (direction === DIRECTION_FORWARD) {
				this.show(prevBtn);
				if ((scrollLeft + SCROLL_STEP) >= containerWidth || (containerWidth - (scrollLeft + SCROLL_STEP) < 100)) {
					scrollTo(container, containerWidth);
					this.hide(nextBtn);
				} else {
					scrollTo(container, scrollLeft + SCROLL_STEP);
					this.show(nextBtn);
				}
			} else {
				this.show(nextBtn);
				if (((scrollLeft - SCROLL_STEP) <= 100)) {
					scrollTo(container, 0);
					this.hide(prevBtn);
				} else {
					scrollTo(container, scrollLeft - SCROLL_STEP);
				}
			}
		},
		show: (el) => {
			el.classList.remove('hidden')
		},
		hide: (el) => {
			el.classList.add('hidden')
		},
	}
}
</script>
