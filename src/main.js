import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import VueRouter from 'vue-router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { airports } from './airports/airports_v4.js'
import { countries } from './airports/countries.js'
import { airlines } from './airlines/airlines.js'
import Home from '@/components/Home'
import Airport from '@/components/Airport'
import Airline from '@/components/airlines/Airline'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import CountryFlag from 'vue-country-flag'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'


import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.component('country-flag', CountryFlag)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)

Vue.use(VueAxios, axios)

Vue.use(Autocomplete)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBk26jAjwlqozc1n4GwkzXdnkyEHheqzkY'
  },
})

import VueMeta from 'vue-meta'

Vue.use(VueMeta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-server-rendered',
  tagIDKeyName: 'vmid',
  refreshOnceOnNavigation: true
})

export const router = new VueRouter({
  mode: 'history',
  beforeEach(toRoute, fromRoute, next) {
    window.document.title = router.currentRoute.params.id;

    next();
  },
  routes: [
      { path: "/", component: Home },
      { path: "/:id", component: Airport },
      { path: "/airlines/:airline", component: Airline }
  ]
});

const airlinesPlugin = {
  install() {
    Vue.airlines = airlines
    Vue.prototype.$airlines = airlines
  }
}


const airportsPlugin = {
  install() {
    Vue.airports = airports
    Vue.prototype.$airports = airports
  }
}

const countriesPlugin = {
  install() {
    Vue.countries = countries
    Vue.prototype.$countries = countries
  }
}

Vue.use(airportsPlugin)
Vue.use(countriesPlugin)
Vue.use(airlinesPlugin)

library.add(faPlane)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
