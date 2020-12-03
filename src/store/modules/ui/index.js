import actions from './actions'
import mutations from './mutations'

const ui = {
	state:{
		init: false, // инициализация приложения
		domain: '',
		showModal: false,
		canShowModal: false,
		showEventsPreloader: false,
		showModalPreloader: false,
		checkFreeSlots: false,
		theme: true,
		isSmallDesktop: false,
		isTouchDevice: false,
		isMobilePhone: false,
		isMediumMobilePhone: false
	},
	getters:{
		init: state => state.init,
		domain: state => state.domain,
		showModal: state => state.showModal,
		canShowModal: state => state.canShowModal,
		showEventsPreloader: state => state.showEventsPreloader,
		showModalPreloader: state => state.showModalPreloader,
		theme: state => state.theme,
		isSmallDesktop: state => state.isSmallDesktop,
		isTouchDevice: state => state.isTouchDevice,
		isMobilePhone: state => state.isMobilePhone,
		isMediumMobilePhone: state => state.isMediumMobilePhone,
	},
	mutations: mutations,
	actions: actions,
	namespaced: true,
}

export default ui;
