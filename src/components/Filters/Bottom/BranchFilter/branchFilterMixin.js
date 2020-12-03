import {eventBus} from "../../../../main";

export const branchFilterMixin = {
	data() {
		return {
			branchFilterState: [],
		}
	},
	mounted() {
		eventBus.$on('setClubFilter', () => {
			this.clearBranchFilterState();
		});

		if (this.isTouchDevice) {
			eventBus.$on('resetAllMenuFilters', () => {
				this.clearBranchFilterState();
			});
		}
	},
	methods: {
		clearBranchFilterState: function() {
			if (this.isTouchDevice) {
				const branchFilterRollMobile = this.$refs.branchFilterRollMobile;
				if (branchFilterRollMobile) {
					const buttons = branchFilterRollMobile.querySelectorAll('.selected');
					if (buttons.length) {
						[...buttons].forEach((btn) => {
							btn.classList.remove('selected');
						})
					}
				}
			}

			this.branchFilterState = [];
		},
		setBranchFilter: function () {
			const {branchFilterState} = this;
			this.$store.dispatch(
				'filters/setBranchFilter', branchFilterState.length === 0 ? '' : branchFilterState
			);
		},
		buttonClickHandler: function (event) {
			const el = event.target;
			const value = el.dataset.value;

			el.classList.toggle('selected');

			if (el.classList.contains('selected')) {
				this.branchFilterState.push(value);
			} else {
				let branchFilterState = this.branchFilterState;
				this.branchFilterState = branchFilterState.filter((val) => val !== value);
			}

			this.setBranchFilter();
		}
	}
}
