<template>
	<div
		id="fitbase-widget"
		ref="fitbaseWidget"
		:class="{
			touch: isTouchDevice,
			mob: isMobilePhone,
			mob_m: isMediumMobilePhone,
			desktop: !isTouchDevice,
			desktop_m: !isTouchDevice && !isSmallDesktop,
			desktop_sm: isSmallDesktop,
			dark: theme === this.DARK_THEME
		}"
		v-if="firstScreenIsDispatched"
	>
		<Mobile v-if="isTouchDevice"/>
		<Desktop v-else/>
	</div>
</template>

<script>
import {storeToComputed} from "./components/mixins/storeToComputed";
import {SanFrancisco} from "./components/fonts";
import Desktop from './Desktop';
import Mobile from './Mobile';
import Vuex from 'vuex';
import store from './store';
import Vue from 'vue';
import {LIGHT_THEME, DARK_THEME} from "./components/constants";
import {desktopNormalWidth, desktopWidth, tabWidth, mediumPhoneWidth} from "./variables";
import {getFirstDayOfCurrentWeek, getLastDayOfCurrentWeek, getToday} from "./utils/dates";
import {eventBus} from "./main";
import {DIRECTION_BACKWARD} from "./components/Mobile/CalendarHeader/constants";

Vue.use(Vuex)

export default {
	store: new Vuex.Store(store),
	name: "FitbaseWidget",
	mixins: [storeToComputed],
	components: {
		Desktop,
		Mobile,
	},
	data() {
		return {
			// была ли  хотя бы раз произведена оценка ширины контейнера, если нет -- то можно забирать опции для фильтров
			firstScreenIsDispatched: false,
		}
	},
	created() {
		this.DARK_THEME = DARK_THEME;

		eventBus.$on('setClubFilter', () => {
			if (this.isTouchDevice) {
				eventBus.$emit('resetAllMenuFilters');
				this.swipeToFirstWeek();
			} else {
				eventBus.$emit('goToday');
			}

			this.getFilters();

			//в разных клубах разный расклад по наличию ивентов на 1ой и 2ой неделе
			this.getScheduleNextWeek();

			if (!this.isTouchDevice) {
				this.setFirstWeekIsActive();
			}
		});

		eventBus.$on('clearFilters', () => {
			//(Кнопка "Сбросить" -- только десктоп)
			if (!this.isTouchDevice) {
				this.$store.dispatch('filters/clearFilters');
				this.getFilters();
				this.getScheduleNextWeek();
				this.setFirstWeekIsActive();
			}
		});
		eventBus.$on('resetAllMenuFilters', () => {
			//(Кнопка "Сбросить все" -- только моб)
			if (this.isTouchDevice) {
				this.swipeToFirstWeek();
				this.getFilters();
			}
		});

		const shadowRoot = document.getElementsByTagName('fitbase-widget')[0];
		//подготовка домена для запросов API и типа цветовой схемы
		const domainName = shadowRoot.getAttribute('domain') !== null ? shadowRoot.getAttribute('domain') : '';
		const theme = shadowRoot.getAttribute('theme') !== null ? shadowRoot.getAttribute('theme') : LIGHT_THEME;
		this.$store.dispatch('ui/setTheme', theme);
		this.$store.dispatch('ui/setDomain', domainName);

		//получаем опции для фильтра клубов
		this.$store.dispatch('filters/getClubFilterOptions', {apiUrl: domainName});
		//есть ли на следующей неделе занятия и дата последнего занятия за текущую и следующую недели
		this.getScheduleNextWeek();
		//маска для телефона (модальная форма регистрации)
		this.$store.dispatch('events/fetchPhoneMask', {apiUrl: domainName});

		//установка шрифтов
		SanFrancisco.forEach((font) => {
			const fontFaceStyle = document.createElement('style');
			fontFaceStyle.textContent = font;
			shadowRoot.appendChild(fontFaceStyle);
		});

		setTimeout(this.screenDispatcher,0)
		//при изменении ширины экрана - по необходимости, переключаем компонент Mobile/Desktop
		window.addEventListener("resize", this.onWindowResizeHandler);
		this.setFirstWeekIsActive();
	},
	methods: {
		swipeToFirstWeek: function() {
			if (!this.firstWeek && this.scheduleNextWeek.isHavingSchedulesNextWeek) {
				eventBus.$emit('swipeAnimate', DIRECTION_BACKWARD);
			}
		},
		//делаем первую неделю активной (исп-ся для условной отрисовки навигации по неделям десктоп-календаря)
		setFirstWeekIsActive: function() {
			this.$store.dispatch('calendar/setFirstWeek', true)
		},
		getScheduleNextWeek: function() {
			this.$store.dispatch('calendar/getScheduleNextWeek', {
				apiUrl: this.domain,
				clubId: this.filter.clubFilter
			});
		},
		getFilters: function () {
			this.$store.dispatch('filters/getFilterOptions', {
				dateStart: this.start,
				viewName: this.isTouchDevice ? 'day' : 'week',
				clubId: this.filter.clubFilter,
				apiUrl: this.domain
			});
		},
		screenDispatcher: function () {
			//анализируем ширину экрана/тип устройства
			let isMobilePhone = false;
			let isMediumMobilePhone = false;

			const container = document.getElementsByTagName('fitbase-widget')[0].parentNode;
			const containerWidth = container.getBoundingClientRect().width;

			const currentIsTouch = this.isTouchDevice;
			const isTouch = containerWidth < desktopWidth;

			if (currentIsTouch !== isTouch && this.firstScreenIsDispatched === true) {
				//забираем фильтры при смене ширины контейнера'
				this.getFilters();
			}

			if (isTouch) {
				if (containerWidth < tabWidth) {
					isMobilePhone = true;
					if (containerWidth >= mediumPhoneWidth) {
						isMediumMobilePhone = true;
					}
				}
			}

			const isSmallDesktop = !isTouch && containerWidth < desktopNormalWidth;

			this.$store.dispatch('ui/setIsTouchDevice', isTouch);
			this.$store.dispatch('ui/setIsMobilePhone', isMobilePhone);
			this.$store.dispatch('ui/setIsMediumMobilePhone', isMediumMobilePhone);
			this.$store.dispatch('ui/setIsSmallDesktop', isSmallDesktop);

			if (!this.firstScreenIsDispatched) {
				if (isTouch) {
					const today = getToday();
					this.$store.dispatch('calendar/setStart', today);
					this.$store.dispatch('calendar/setEnd', today);
				} else {
					this.$store.dispatch('calendar/setStart', getFirstDayOfCurrentWeek());
					this.$store.dispatch('calendar/setEnd', getLastDayOfCurrentWeek());
				}
				//////////////////////////////////////////////

				this.getFilters();
				this.firstScreenIsDispatched = true;
			}
		},
		onWindowResizeHandler: function () {
			this.screenDispatcher();
		}
	},
	destroyed() {
		window.removeEventListener("resize", this.onWindowResizeHandler);
	},
}
</script>

<style lang="scss">
	@import "./assets/scss/mixins&vars";
	@import "./assets/scss/vue-select";
	@import "./assets/scss/components";
	@import "./assets/scss/fc.min";
	@import "./assets/scss/app";
</style>
