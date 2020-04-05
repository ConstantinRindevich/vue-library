import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart as faSolidHeart, faShare, faTimes, faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store/store';

library.add(faSolidHeart)
library.add(faShare)
library.add(faTimes)
library.add(faSearch)
library.add(faArrowLeft)
library.add(faRegularHeart)
 
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
