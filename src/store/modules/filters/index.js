import actions from './actions'
import mutations from './mutations'
import filtersList from "../../../components/Mobile/Filters/constants";

const filters = {
	state: {
		filterOptions: {}, // списки фильтров выбранной недели
		filter: { // активные фильтры на данный момент
			clubFilter: 1,
			placeFilter: [],
			scheduleTemplateFilter: [],
			trainerFilter: [],
			branchFilter: [],
			onlineFilter: false,
			registrationFilter: false,
			payFilter: false,
		},
		isHavingSeveralClubs: null,
		selectedFilterSection: '', // выбранный раздел фильтров (только моб)
		filtersSectionList: filtersList,
		filterComponentKey: 5000, // ключ для компонента Фильтры
		branchFilterComponentKey: 20000,
		filtersIsFetched: false,
	},
	getters: {
		filterOptions: state => state.filterOptions,
		filter: state => state.filter,
		selectedFilterSection: state => state.selectedFilterSection,
		filtersSectionList: state => state.filtersSectionList,
		filterComponentKey: state => state.filterComponentKey,
		branchFilterComponentKey: state => state.branchFilterComponentKey,
		filtersIsFetched: state => state.filtersIsFetched,
		isHavingSeveralClubs: state => state.isHavingSeveralClubs
	},
	mutations: mutations,
	actions: actions,
	namespaced: true,
}

export default filters;
