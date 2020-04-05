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


var br = navigator.userAgent;
if (br.indexOf("Chrome") > 0 && br.indexOf("OPR") < 1) {
  br = br.substr(br.indexOf("Chrome") + 7, br.indexOf("Safari") - br.indexOf("Chrome") - 7);
  if (br.split('.')[0] !== '80') {
    alert('Работа и внешний вид приложения проверялась только в браузере Google Chrome версии 80')
  }
}
else {
  alert('Работа и внешний вид приложения проверялась только в браузере Google Chrome')
}