import actions from './actions'
import mutations from './mutations'

const registration = {
	state:{},
	getters:{},
	mutations: mutations,
	actions: actions,
	namespaced: true,
}

export default registration;
