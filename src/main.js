import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import VueRouter from 'vue-router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { airports } from './airports/airports_v4.js'
import { countries } from './airports/countries.js'
import Home from '@/components/Home'
import Airport from '@/components/Airport'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import CountryFlag from 'vue-country-flag'

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.component('country-flag', CountryFlag)

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
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

export const router = new VueRouter({
  mode: 'history',
  routes: [
      { path: "/", component: Home },
      { path: "/:id", component: Airport }
  ]
});


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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
