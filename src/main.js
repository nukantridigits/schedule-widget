import Vue from 'vue';
import FitbaseWidget from "./FitbaseWidget";
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import vSelect from 'vue-select';
import VFC from 'vfc';
import wrap from '@vue/web-component-wrapper';
import 'document-register-element';
import Vue2TouchEvents from 'vue2-touch-events'

Vue.config.productionTip = false;
export const eventBus = new Vue();

Vue.use(VFC);
Vue.use(Vue2TouchEvents)
Vue.use(VueLodash, { name: 'custom' , lodash: lodash });
Vue.component('v-select', vSelect);

const WebComponent = wrap(Vue, FitbaseWidget);
window.customElements.define('fitbase-widget', WebComponent);
